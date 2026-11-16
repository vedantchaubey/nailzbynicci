// apps/backend/src/modules/kyc/kyc.service.ts
import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  KycStatus,
  KycRejectionReason,
  FraudSeverity,
  KYC_RULES,
  computeIdentityFingerprint,
  fuzzyMatchNames,
  KycVerificationSummary,
  KycStartResponse,
  BankVerificationResult,
} from '@ticketpass/shared';
import { IdentityProvider } from './providers/identity-provider.interface.js';
import { MockIdentityProvider } from './providers/mock-identity.provider.js';
import { DigiLockerDirectProvider } from './providers/digilocker-direct.provider.js';
import { AggregatorIdentityProvider } from './providers/aggregator-identity.provider.js';
import { MockBankVerificationProvider } from './providers/bank-verification.provider.js';

@Injectable()
export class KycService {
  private readonly logger = new Logger(KycService.name);
  private readonly identityProvider: IdentityProvider;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mockProvider: MockIdentityProvider,
    private readonly digilockerDirectProvider: DigiLockerDirectProvider,
    private readonly aggregatorProvider: AggregatorIdentityProvider,
    private readonly bankProvider: MockBankVerificationProvider,
  ) {
    const providerConfig = (process.env.IDENTITY_PROVIDER || 'mock').toLowerCase();
    if (providerConfig === 'digilocker_direct') {
      this.identityProvider = this.digilockerDirectProvider;
    } else if (providerConfig === 'aggregator') {
      this.identityProvider = this.aggregatorProvider;
    } else {
      this.identityProvider = this.mockProvider;
    }

    this.logger.log(`[KycService] Active IdentityProvider: ${this.identityProvider.providerName}`);
  }

  /**
   * Initializes a KYC session with DigiLocker (user consent OAuth 2.0 with PKCE).
   */
  async startKyc(userId: string, redirectTo: string = '/dashboard'): Promise<KycStartResponse> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.isBanned) {
      throw new ForbiddenException('Banned accounts cannot initiate identity verification.');
    }

    // Rate-limiting: Max 5 verification attempts per 24 hours per user
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingKyc = await this.prisma.kycVerification.findUnique({
      where: { userId },
    });

    if (
      existingKyc &&
      existingKyc.lastAttemptAt &&
      existingKyc.lastAttemptAt > oneDayAgo &&
      existingKyc.attemptCount >= KYC_RULES.MAX_DAILY_ATTEMPTS
    ) {
      throw new BadRequestException(
        `Maximum daily KYC verification attempts (${KYC_RULES.MAX_DAILY_ATTEMPTS}) reached. Please try again tomorrow.`,
      );
    }

    const session = await this.identityProvider.createAuthorizationSession(userId, redirectTo);

    // Save session (expires in 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const kycSession = await this.prisma.kycSession.create({
      data: {
        userId,
        provider: this.identityProvider.providerName,
        state: session.state,
        nonce: session.nonce,
        codeVerifierEncrypted: session.codeVerifier,
        redirectTo,
        status: 'PENDING',
        expiresAt,
      },
    });

    // Update attempt count
    await this.prisma.kycVerification.upsert({
      where: { userId },
      create: {
        userId,
        status: KycStatus.IN_PROGRESS,
        provider: this.identityProvider.providerName,
        verifiedName: user.name,
        identityFingerprint: '',
        attemptCount: 1,
        lastAttemptAt: new Date(),
      },
      update: {
        status: KycStatus.IN_PROGRESS,
        provider: this.identityProvider.providerName,
        attemptCount: { increment: 1 },
        lastAttemptAt: new Date(),
      },
    });

    // Record audit log
    await this.prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'KYC_STARTED',
        entity: 'User',
        entityId: userId,
        after: { provider: this.identityProvider.providerName, sessionId: kycSession.id },
      },
    });

    return {
      authorizationUrl: session.authorizationUrl,
      sessionId: kycSession.id,
    };
  }

  /**
   * Processes the OAuth callback from DigiLocker / Aggregator.
   */
  async handleCallback(
    state: string,
    code: string,
    error?: string,
  ): Promise<{ redirectUrl: string; status: KycStatus; reason?: string }> {
    const session = await this.prisma.kycSession.findUnique({
      where: { state },
      include: { user: true },
    });

    if (!session) {
      this.logger.error(`KYC callback with invalid or expired state: ${state}`);
      throw new BadRequestException('Invalid or expired KYC session state.');
    }

    const fallbackRedirect = session.redirectTo || '/dashboard';

    if (session.status !== 'PENDING' || session.expiresAt < new Date()) {
      await this.recordRejection(session.userId, KycRejectionReason.EXPIRED_SESSION);
      return {
        redirectUrl: `${fallbackRedirect}?kyc=failed&reason=EXPIRED_SESSION`,
        status: KycStatus.REJECTED,
        reason: 'Session expired',
      };
    }

    if (error) {
      this.logger.warn(`User cancelled or provider returned error: ${error}`);
      await this.recordRejection(session.userId, KycRejectionReason.USER_CANCELLED);
      return {
        redirectUrl: `${fallbackRedirect}?kyc=failed&reason=USER_CANCELLED`,
        status: KycStatus.REJECTED,
        reason: 'Consent cancelled',
      };
    }

    try {
      // 1. Exchange code with PKCE verifier
      const verified = await this.identityProvider.exchangeAndVerifyIdentity(
        code,
        state,
        session.codeVerifierEncrypted,
      );

      // 2. Minimum age check (>= 18 years)
      if (verified.dateOfBirth) {
        const ageYears = this.calculateAge(verified.dateOfBirth);
        if (ageYears < KYC_RULES.MIN_AGE_YEARS) {
          this.logger.warn(`User ${session.userId} is underage (${ageYears} years). Verification rejected.`);
          await this.recordRejection(session.userId, KycRejectionReason.UNDERAGE);
          return {
            redirectUrl: `${fallbackRedirect}?kyc=failed&reason=UNDERAGE`,
            status: KycStatus.REJECTED,
            reason: 'You must be at least 18 years old to verify identity and transact.',
          };
        }
      }

      // 3. Compute salted SHA-256 identity fingerprint
      const fingerprint = computeIdentityFingerprint(
        verified.verifiedName,
        verified.dateOfBirth ? verified.dateOfBirth.toISOString() : '',
        verified.aadhaarLast4 || '',
      );

      // 4. Banned identity check against BlockedIdentity table
      const isBlocked = await this.prisma.blockedIdentity.findUnique({
        where: { identityFingerprint: fingerprint },
      });

      if (isBlocked) {
        this.logger.error(`Banned identity attempt by user ${session.userId}. Fingerprint matched blocked table.`);

        // Flag CRITICAL fraud
        await this.prisma.fraudFlag.create({
          data: {
            userId: session.userId,
            severity: FraudSeverity.CRITICAL,
            rule: 'BANNED_IDENTITY_ATTEMPT',
            metadata: { reason: isBlocked.reason },
          },
        });

        await this.recordRejection(session.userId, KycRejectionReason.BANNED_IDENTITY);
        return {
          redirectUrl: `${fallbackRedirect}?kyc=failed&reason=BANNED_IDENTITY`,
          status: KycStatus.REJECTED,
          reason: 'This identity has been permanently banned from TicketPass.',
        };
      }

      // 5. One identity = one account rule: check for duplicates
      const duplicateAccount = await this.prisma.kycVerification.findFirst({
        where: {
          identityFingerprint: fingerprint,
          status: KycStatus.VERIFIED,
          userId: { not: session.userId },
        },
      });

      if (duplicateAccount) {
        this.logger.warn(
          `Duplicate identity fingerprint detected. User ${session.userId} matched existing verified user ${duplicateAccount.userId}`,
        );

        // Flag MEDIUM fraud
        await this.prisma.fraudFlag.create({
          data: {
            userId: session.userId,
            severity: FraudSeverity.MEDIUM,
            rule: 'DUPLICATE_IDENTITY_DETECTED',
            metadata: { originalUserId: duplicateAccount.userId },
          },
        });

        await this.recordRejection(session.userId, KycRejectionReason.DUPLICATE_IDENTITY);
        return {
          redirectUrl: `${fallbackRedirect}?kyc=failed&reason=DUPLICATE_IDENTITY`,
          status: KycStatus.REJECTED,
          reason: 'This identity is already linked to another TicketPass account.',
        };
      }

      // 6. Complete verification successfully
      const now = new Date();
      const expiresAt = new Date(now.getTime() + KYC_RULES.VALIDITY_DAYS * 24 * 60 * 60 * 1000);

      await this.prisma.kycVerification.upsert({
        where: { userId: session.userId },
        create: {
          userId: session.userId,
          status: KycStatus.VERIFIED,
          provider: this.identityProvider.providerName,
          providerRefId: verified.providerRefId,
          verifiedName: verified.verifiedName,
          dateOfBirth: verified.dateOfBirth,
          gender: verified.gender,
          state: verified.state,
          aadhaarLast4: verified.aadhaarLast4,
          identityFingerprint: fingerprint,
          consentId: verified.consentId,
          consentAt: verified.consentAt,
          verifiedAt: now,
          expiresAt,
          rejectionReason: null,
        },
        update: {
          status: KycStatus.VERIFIED,
          provider: this.identityProvider.providerName,
          providerRefId: verified.providerRefId,
          verifiedName: verified.verifiedName,
          dateOfBirth: verified.dateOfBirth,
          gender: verified.gender,
          state: verified.state,
          aadhaarLast4: verified.aadhaarLast4,
          identityFingerprint: fingerprint,
          consentId: verified.consentId,
          consentAt: verified.consentAt,
          verifiedAt: now,
          expiresAt,
          rejectionReason: null,
        },
      });

      // Update User denormalized status
      await this.prisma.user.update({
        where: { id: session.userId },
        data: {
          kycStatus: KycStatus.VERIFIED,
          kycVerifiedAt: now,
        },
      });

      // Mark session complete
      await this.prisma.kycSession.update({
        where: { id: session.id },
        data: { status: 'COMPLETED' },
      });

      // Audit log
      await this.prisma.auditLog.create({
        data: {
          actorId: session.userId,
          action: 'KYC_VERIFIED',
          entity: 'User',
          entityId: session.userId,
          after: {
            provider: this.identityProvider.providerName,
            verifiedName: verified.verifiedName,
            aadhaarLast4: verified.aadhaarLast4,
            expiresAt: expiresAt.toISOString(),
          },
        },
      });

      return {
        redirectUrl: `${fallbackRedirect}?kyc=success`,
        status: KycStatus.VERIFIED,
      };
    } catch (err) {
      this.logger.error(`Error processing identity callback for session ${session.id}: ${(err as Error).message}`);
      await this.recordRejection(session.userId, KycRejectionReason.PROVIDER_ERROR);
      return {
        redirectUrl: `${fallbackRedirect}?kyc=failed&reason=PROVIDER_ERROR`,
        status: KycStatus.REJECTED,
        reason: 'DigiLocker is currently unavailable. Please try again shortly.',
      };
    }
  }

  /**
   * Retrieves the current user's KYC summary safely (never leaks fingerprint or unmasked ID).
   */
  async getKycStatus(userId: string): Promise<KycVerificationSummary> {
    const kyc = await this.prisma.kycVerification.findUnique({
      where: { userId },
    });

    if (!kyc) {
      return {
        id: '',
        userId,
        status: KycStatus.NOT_STARTED,
        provider: '',
        verifiedName: '',
        aadhaarLast4: null,
        verifiedAt: null,
        expiresAt: null,
        attemptCount: 0,
      };
    }

    return {
      id: kyc.id,
      userId: kyc.userId,
      status: kyc.status as KycStatus,
      provider: kyc.provider,
      verifiedName: kyc.verifiedName,
      aadhaarLast4: kyc.aadhaarLast4,
      state: kyc.state,
      verifiedAt: kyc.verifiedAt ? kyc.verifiedAt.toISOString() : null,
      expiresAt: kyc.expiresAt ? kyc.expiresAt.toISOString() : null,
      rejectionReason: kyc.rejectionReason as KycRejectionReason | null,
      attemptCount: kyc.attemptCount,
    };
  }

  /**
   * Withdraws user consent and soft-deletes KYC summary under DPDP Act 2023.
   * Blocks future transactions until re-verified.
   */
  async withdrawConsent(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { kyc: true },
    });

    if (!user || !user.kyc) {
      throw new NotFoundException('No active KYC verification record found.');
    }

    // Cancel any consent on provider
    if (user.kyc.consentId) {
      await this.identityProvider.revokeSession(user.kyc.consentId).catch((err) => {
        this.logger.warn(`Could not revoke provider session: ${(err as Error).message}`);
      });
    }

    // Soft-delete KYC record
    await this.prisma.kycVerification.update({
      where: { userId },
      data: {
        status: KycStatus.WITHDRAWN,
        verifiedAt: null,
        expiresAt: null,
        rejectionReason: null,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        kycStatus: KycStatus.WITHDRAWN,
        kycVerifiedAt: null,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'KYC_WITHDRAWN',
        entity: 'User',
        entityId: userId,
      },
    });

    this.logger.log(`Consent successfully withdrawn for user ${userId}.`);
  }

  /**
   * Penny-drop bank account verification with fuzzy name matching.
   */
  async verifyBankAccount(
    userId: string,
    accountNumber: string,
    ifsc: string,
    accountHolder: string,
    upiId?: string,
  ): Promise<BankVerificationResult> {
    const kyc = await this.prisma.kycVerification.findUnique({
      where: { userId },
    });

    if (!kyc || kyc.status !== KycStatus.VERIFIED) {
      throw new BadRequestException('You must complete DigiLocker identity verification before adding a bank account.');
    }

    const bankRes = await this.bankProvider.verifyAccount({
      accountNumber,
      ifsc,
      claimedHolderName: accountHolder,
      upiId,
      verifiedKycName: kyc.verifiedName,
    });

    // Save bank account record
    await this.prisma.sellerBankAccount.upsert({
      where: { userId },
      create: {
        userId,
        accountHolder,
        accountNumberEncrypted: `enc_${accountNumber.slice(-4)}`,
        ifsc,
        upiId: upiId || null,
        holderNameFromBank: bankRes.registeredNameAtBank,
        nameMatchScore: bankRes.nameMatchScore,
        nameMatchVerified: bankRes.nameMatchVerified,
        isVerified: bankRes.nameMatchVerified,
      },
      update: {
        accountHolder,
        accountNumberEncrypted: `enc_${accountNumber.slice(-4)}`,
        ifsc,
        upiId: upiId || null,
        holderNameFromBank: bankRes.registeredNameAtBank,
        nameMatchScore: bankRes.nameMatchScore,
        nameMatchVerified: bankRes.nameMatchVerified,
        isVerified: bankRes.nameMatchVerified,
      },
    });

    return {
      accountHolder,
      holderNameFromBank: bankRes.registeredNameAtBank,
      nameMatchScore: bankRes.nameMatchScore,
      nameMatchVerified: bankRes.nameMatchVerified,
    };
  }

  private calculateAge(dob: Date): number {
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private async recordRejection(userId: string, reason: KycRejectionReason): Promise<void> {
    await this.prisma.kycVerification.upsert({
      where: { userId },
      create: {
        userId,
        status: KycStatus.REJECTED,
        provider: this.identityProvider.providerName,
        verifiedName: '',
        identityFingerprint: '',
        rejectionReason: reason,
      },
      update: {
        status: KycStatus.REJECTED,
        rejectionReason: reason,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: KycStatus.REJECTED },
    });

    await this.prisma.auditLog.create({
      data: {
        actorId: userId,
        action: 'KYC_REJECTED',
        entity: 'User',
        entityId: userId,
        after: { reason },
      },
    });
  }
}
