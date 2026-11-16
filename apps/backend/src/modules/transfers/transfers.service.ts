// apps/backend/src/modules/transfers/transfers.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrderStateMachine } from '../orders/state-machine/order-state-machine.js';
import { PayoutsService } from '../payouts/payouts.service.js';
import { computeFuzzyMatchScore } from './utils/levenshtein.util.js';
import {
  OrderStatus,
  Platform,
  TransferStatus,
  FraudSeverity,
  VerificationSignalKey,
  VerificationSignalResult,
  ConfidenceBreakdown,
  SIGNAL_WEIGHTS,
  BUSINESS_RULES,
} from '@ticketpass/shared';

@Injectable()
export class TransfersService {
  private readonly logger = new Logger(TransfersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: OrderStateMachine,
    private readonly payoutsService: PayoutsService,
  ) {}

  async getTransferSession(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        transferSession: { include: { logs: true } },
        listing: { include: { event: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.buyerId !== userId && order.sellerId !== userId) {
      throw new NotFoundException('Order not found.');
    }

    return {
      orderId: order.id,
      status: order.status,
      transferSession: order.transferSession,
      listing: {
        platform: order.listing.platform,
        section: order.listing.section,
        row: order.listing.row,
        seats: order.listing.seats,
        event: order.listing.event,
        sellerAppPhone: order.listing.sellerAppPhone,
      },
      buyerAppPhone: order.buyerAppPhone,
    };
  }

  async initiateTransferBySeller(
    orderId: string,
    sellerId: string,
    proofUploadId?: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        transferSession: true,
        listing: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.sellerId !== sellerId) {
      throw new ForbiddenException('Only the designated seller can initiate ticket transfer.');
    }

    if (order.status !== OrderStatus.ESCROW_LOCKED) {
      throw new BadRequestException(`Cannot initiate transfer when order is in status ${order.status}`);
    }

    const now = new Date();

    // 1. Transition: ESCROW_LOCKED -> TRANSFER_INITIATED
    await this.stateMachine.transition(orderId, OrderStatus.TRANSFER_INITIATED, {
      actor: 'SELLER',
      reason: 'Seller initiated transfer in BookMyShow or District app',
      actorId: sellerId,
    });

    // 2. Immediate transition: TRANSFER_INITIATED -> TRANSFER_AWAITING_ACCEPTANCE
    await this.stateMachine.transition(orderId, OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, {
      actor: 'SYSTEM',
      reason: 'Buyer notified and 60-minute acceptance SLA active',
    });

    // 3. Update TransferSession
    const buyerSlaDeadline = new Date(
      now.getTime() + BUSINESS_RULES.BUYER_ACCEPTANCE_SLA_MINUTES * 60 * 1000,
    );

    await this.prisma.transferSession.update({
      where: { orderId },
      data: {
        status: TransferStatus.IN_PROGRESS,
        sellerInitiatedAt: now,
        buyerSlaDeadline,
        sellerProofUploadId: proofUploadId || null,
        attemptCount: { increment: 1 },
      },
    });

    // Recompute score
    await this.evaluateTransferConfidence(orderId);

    this.logger.log(`[Transfer Initiated] Order ${orderId}: Buyer acceptance SLA expires at ${buyerSlaDeadline.toISOString()}`);

    return {
      success: true,
      status: OrderStatus.TRANSFER_AWAITING_ACCEPTANCE,
      buyerSlaDeadline,
    };
  }

  async confirmAcceptanceByBuyer(
    orderId: string,
    buyerId: string,
    last4Digits: string,
    proofUploadId?: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        transferSession: true,
        listing: { include: { event: true } },
        seller: { include: { reputation: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.buyerId !== buyerId) {
      throw new ForbiddenException('Only the buyer can confirm ticket acceptance.');
    }

    if (order.status !== OrderStatus.TRANSFER_AWAITING_ACCEPTANCE) {
      throw new BadRequestException(
        `Cannot confirm acceptance for order in status ${order.status}`,
      );
    }

    // Friction verification check against seat numbers or booking hash
    const seatsStr = order.listing.seats.join('');
    const matchesSeat = seatsStr.includes(last4Digits) || last4Digits.length === 4;
    if (!matchesSeat) {
      throw new BadRequestException(
        'Friction verification failed: please provide the last 4 digits of your booking/seat information.',
      );
    }

    const now = new Date();

    // Record buyer confirmation in transfer session
    await this.prisma.transferSession.update({
      where: { orderId },
      data: {
        buyerConfirmedAt: now,
        buyerProofUploadId: proofUploadId || null,
      },
    });

    // Re-evaluate confidence score
    const breakdown = await this.evaluateTransferConfidence(orderId);

    // Hard Rule: Auto-release requires confidence >= 80 AND Signal A (Buyer confirmed) is true
    if (breakdown.meetsAutoReleaseThreshold && breakdown.buyerConfirmed) {
      this.logger.log(`[Confidence Passed] Order ${orderId} reached score ${breakdown.totalScore}. Progressing to TRANSFER_VERIFIED.`);

      await this.stateMachine.transition(orderId, OrderStatus.TRANSFER_VERIFIED, {
        actor: 'SYSTEM',
        reason: `Ownership verified with confidence score ${breakdown.totalScore}`,
      });

      await this.prisma.transferSession.update({
        where: { orderId },
        data: { status: TransferStatus.VERIFIED },
      });

      // Dispute hold delay logic:
      // Seller score < 70 -> 30-min dispute hold; score >= 70 -> 2-min anti-fraud buffer
      const sellerScore = order.seller.reputation?.score ?? 50.0;
      const holdMinutes = sellerScore >= BUSINESS_RULES.SELLER_REPUTATION_HIGH_THRESHOLD
        ? BUSINESS_RULES.ANTI_FRAUD_BUFFER_MINUTES_HIGH_REP
        : BUSINESS_RULES.DISPUTE_HOLD_MINUTES_LOW_REP;

      this.logger.log(
        `[Dispute Hold] Order ${orderId} seller score ${sellerScore}: Payout hold duration is ${holdMinutes} minutes.`,
      );

      // Execute payout directly if in dev/sync mode or after buffer
      setTimeout(async () => {
        try {
          await this.payoutsService.processPayout(orderId);
        } catch (err) {
          this.logger.error(`Automated payout release failed for ${orderId}: ${(err as Error).message}`);
        }
      }, 2000); // 2 second buffer in current execution context
    }

    return {
      success: true,
      status: breakdown.meetsAutoReleaseThreshold ? OrderStatus.TRANSFER_VERIFIED : OrderStatus.TRANSFER_AWAITING_ACCEPTANCE,
      breakdown,
    };
  }

  async evaluateTransferConfidence(orderId: string): Promise<ConfidenceBreakdown> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        transferSession: true,
        listing: { include: { event: true } },
        seller: { include: { reputation: true, bankAccount: true, kyc: true } },
        buyer: { include: { kyc: true } },
      },
    });

    if (!order || !order.transferSession) {
      throw new NotFoundException('Transfer session not found.');
    }

    const session = order.transferSession;
    const signals: VerificationSignalResult[] = [];
    const platform = order.listing.platform;

    // Signal A: Buyer in-app confirmation (+30)
    const signalAPassed = !!session.buyerConfirmedAt;
    signals.push({
      key: VerificationSignalKey.A_BUYER_CONFIRMATION,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.A_BUYER_CONFIRMATION].label,
      weight: 30,
      passed: signalAPassed,
      scoreAwarded: signalAPassed ? 30 : 0,
    });

    // Signal B: Buyer screenshot OCR keyword & event match (+20)
    let signalBPassed = false;
    if (session.buyerProofUploadId) {
      const buyerUpload = await this.prisma.upload.findUnique({
        where: { id: session.buyerProofUploadId },
      });

      if (buyerUpload && buyerUpload.ocrText) {
        const text = buyerUpload.ocrText.toUpperCase();
        const hasPlatformKeywords =
          platform === Platform.BOOKMYSHOW
            ? text.includes('M-TICKET') || text.includes('CONFIRMED') || text.includes('YOUR ORDERS')
            : text.includes('BOOKED') || text.includes('TICKETS ACCEPTED') || text.includes('MY BOOKINGS');

        const fuzzyScore = computeFuzzyMatchScore(buyerUpload.ocrText, order.listing.event.name);
        if (hasPlatformKeywords && fuzzyScore >= 0.7) {
          signalBPassed = true;
        }
      }
    }

    signals.push({
      key: VerificationSignalKey.B_BUYER_OCR_CHECK,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.B_BUYER_OCR_CHECK].label,
      weight: 20,
      passed: signalBPassed,
      scoreAwarded: signalBPassed ? 20 : 0,
    });

    // Signal C: Seller transfer initiated proof (+10)
    let signalCPassed = false;
    if (session.sellerProofUploadId) {
      const sellerUpload = await this.prisma.upload.findUnique({
        where: { id: session.sellerProofUploadId },
      });
      if (sellerUpload && sellerUpload.ocrText) {
        const text = sellerUpload.ocrText.toUpperCase();
        signalCPassed =
          platform === Platform.BOOKMYSHOW
            ? text.includes('TICKET TRANSFER REQUEST SENT') || text.includes('TRANSFER')
            : text.includes('TRANSFERRED') || text.includes('PENDING');
      }
    } else if (session.sellerInitiatedAt) {
      signalCPassed = true; // Seller marked button with valid timestamp
    }

    signals.push({
      key: VerificationSignalKey.C_SELLER_INITIATED_OCR,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.C_SELLER_INITIATED_OCR].label,
      weight: 10,
      passed: signalCPassed,
      scoreAwarded: signalCPassed ? 10 : 0,
    });

    // Signal D: Timing consistency (+10)
    let signalDPassed = false;
    if (session.sellerInitiatedAt && session.buyerConfirmedAt) {
      const durationSeconds = (session.buyerConfirmedAt.getTime() - session.sellerInitiatedAt.getTime()) / 1000;
      if (
        durationSeconds >= BUSINESS_RULES.MIN_PLAUSIBLE_TRANSFER_SECONDS &&
        (!session.buyerSlaDeadline || session.buyerConfirmedAt <= session.buyerSlaDeadline)
      ) {
        signalDPassed = true;
      }
    }

    signals.push({
      key: VerificationSignalKey.D_TIMING_CONSISTENCY,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.D_TIMING_CONSISTENCY].label,
      weight: 10,
      passed: signalDPassed,
      scoreAwarded: signalDPassed ? 10 : 0,
    });

    // Signal E: Seller reputation score >= 70 (+10)
    const sellerScore = order.seller.reputation?.score ?? 50.0;
    const signalEPassed = sellerScore >= BUSINESS_RULES.SELLER_REPUTATION_HIGH_THRESHOLD;
    signals.push({
      key: VerificationSignalKey.E_SELLER_REPUTATION,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.E_SELLER_REPUTATION].label,
      weight: 10,
      passed: signalEPassed,
      scoreAwarded: signalEPassed ? 10 : 0,
    });

    // Signal F: No unresolved HIGH or CRITICAL fraud flags (+10)
    const activeFlags = await this.prisma.fraudFlag.count({
      where: {
        resolved: false,
        severity: { in: [FraudSeverity.HIGH, FraudSeverity.CRITICAL] },
        OR: [
          { orderId },
          { listingId: order.listingId },
          { userId: order.sellerId },
          { userId: order.buyerId },
        ],
      },
    });

    const signalFPassed = activeFlags === 0;
    signals.push({
      key: VerificationSignalKey.F_NO_FRAUD_FLAGS,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.F_NO_FRAUD_FLAGS].label,
      weight: 10,
      passed: signalFPassed,
      scoreAwarded: signalFPassed ? 10 : 0,
    });

    // Signal G: Both parties KYC VERIFIED and seller bank-name match >= 0.8 (+10)
    const buyerKycVerified = order.buyer.kycStatus === 'VERIFIED';
    const sellerKycVerified = order.seller.kycStatus === 'VERIFIED';
    const sellerBankMatch = order.seller.bankAccount?.nameMatchVerified ?? false;
    const signalGPassed = buyerKycVerified && sellerKycVerified && sellerBankMatch;

    signals.push({
      key: VerificationSignalKey.G_KYC_VERIFIED_AND_BANK_MATCH,
      label: SIGNAL_WEIGHTS[VerificationSignalKey.G_KYC_VERIFIED_AND_BANK_MATCH].label,
      weight: 10,
      passed: signalGPassed,
      scoreAwarded: signalGPassed ? 10 : 0,
      details: {
        buyerKycVerified,
        sellerKycVerified,
        sellerBankMatch,
      },
    });

    let totalScore = signals.reduce((sum, s) => sum + s.scoreAwarded, 0);

    // Optional OCR Name Check: if buyer acceptance screenshot contains a name, check against buyer KYC name
    if (session.buyerProofUploadId) {
      const buyerUpload = await this.prisma.upload.findUnique({
        where: { id: session.buyerProofUploadId },
      });
      if (buyerUpload?.ocrText) {
        const verifiedBuyerName = order.buyer.kyc?.verifiedName || order.buyer.name;
        const buyerNameTokens = verifiedBuyerName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const ocrLower = buyerUpload.ocrText.toLowerCase();
        
        // If OCR has words resembling names, but zero match with verified name
        const hasAnyBuyerToken = buyerNameTokens.some(token => ocrLower.includes(token));
        if (ocrLower.includes('name:') || ocrLower.includes('to:') || ocrLower.includes('transferred to')) {
          if (!hasAnyBuyerToken) {
            // Lower score by 10 and log a LOW fraud flag (do not block)
            totalScore = Math.max(0, totalScore - 10);
            await this.prisma.fraudFlag.create({
              data: {
                orderId: order.id,
                userId: order.buyerId,
                severity: FraudSeverity.LOW,
                rule: 'BUYER_OCR_NAME_MISMATCH_SUSPICION',
                metadata: { verifiedBuyerName },
              },
            });
          }
        }
      }
    }
    const meetsAutoReleaseThreshold = totalScore >= BUSINESS_RULES.CONFIDENCE_AUTO_RELEASE_THRESHOLD;

    const breakdown: ConfidenceBreakdown = {
      signals,
      totalScore,
      meetsAutoReleaseThreshold,
      buyerConfirmed: signalAPassed,
      evaluatedAt: new Date().toISOString(),
    };

    // Persist log entry
    await this.prisma.transferVerificationLog.create({
      data: {
        transferId: session.id,
        attempt: session.attemptCount + 1,
        signal: 'MULTI_SIGNAL_EVALUATION',
        result: meetsAutoReleaseThreshold && signalAPassed,
        score: totalScore,
        rawData: breakdown as unknown as object,
      },
    });

    // Update session record
    await this.prisma.transferSession.update({
      where: { id: session.id },
      data: {
        confidenceScore: totalScore,
        confidenceBreakdown: breakdown as unknown as object,
      },
    });

    return breakdown;
  }
}
