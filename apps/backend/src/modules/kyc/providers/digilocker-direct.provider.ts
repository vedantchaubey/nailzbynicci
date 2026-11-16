// apps/backend/src/modules/kyc/providers/digilocker-direct.provider.ts
import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import {
  IdentityProvider,
  IdentityAuthSession,
  VerifiedIdentityResult,
} from './identity-provider.interface.js';

/**
 * DigiLocker Direct Integration via API Setu / MeriPehchaan OAuth 2.0 with PKCE.
 * 
 * REFERENCE DOCUMENTATION & ENDPOINTS:
 * 1. API Setu DigiLocker Partner API Spec:
 *    https://apisetu.gov.in/api/digilocker
 * 2. MeriPehchaan (National Single Sign-On / Jan Parichay) Developer Integration Guide:
 *    https://meripehchaan.gov.in/developer-docs
 * 3. DigiLocker OAuth 2.0 & e-Aadhaar/e-Document consent architecture:
 *    https://partners.digitallocker.gov.in/public/oauth_service
 *
 * NOTE FOR PRODUCTION DEPLOYMENT:
 * Direct DigiLocker integration requires an onboarding approval agreement with NeGD (National e-Governance Division)
 * and an active API Setu Partner Client ID & Client Secret.
 * Verify all endpoint paths against the latest API Setu circulars as endpoint versions (v2/v3) change.
 */
@Injectable()
export class DigiLockerDirectProvider implements IdentityProvider {
  readonly providerName = 'DIGILOCKER_DIRECT';
  private readonly logger = new Logger(DigiLockerDirectProvider.name);

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly authorizeEndpoint: string;
  private readonly tokenEndpoint: string;
  private readonly profileEndpoint: string;
  private readonly revokeEndpoint: string;

  constructor() {
    this.clientId = process.env.DIGILOCKER_CLIENT_ID || '';
    this.clientSecret = process.env.DIGILOCKER_CLIENT_SECRET || '';
    this.redirectUri =
      process.env.DIGILOCKER_REDIRECT_URI ||
      'http://localhost:4000/api/v1/kyc/callback';
    this.authorizeEndpoint =
      process.env.DIGILOCKER_AUTHORIZE_URL ||
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize';
    this.tokenEndpoint =
      process.env.DIGILOCKER_TOKEN_URL ||
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/token';
    this.profileEndpoint =
      process.env.DIGILOCKER_USER_PROFILE_URL ||
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/user';
    this.revokeEndpoint =
      process.env.DIGILOCKER_REVOKE_URL ||
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/revoke';
  }

  private generateCodeChallenge(verifier: string): string {
    return createHash('sha256')
      .update(verifier)
      .digest('base64url');
  }

  async createAuthorizationSession(userId: string, _redirectTo: string): Promise<IdentityAuthSession> {
    if (!this.clientId) {
      this.logger.warn('DIGILOCKER_CLIENT_ID not set. Please configure env vars for live direct DigiLocker.');
    }

    const state = randomBytes(16).toString('hex');
    const nonce = randomBytes(16).toString('hex');
    const codeVerifier = randomBytes(32).toString('base64url');
    const codeChallenge = this.generateCodeChallenge(codeVerifier);

    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      scope: 'read_profile eaadhaar',
    });

    const authorizationUrl = `${this.authorizeEndpoint}?${queryParams.toString()}`;

    return {
      authorizationUrl,
      state,
      nonce,
      codeVerifier,
    };
  }

  async exchangeAndVerifyIdentity(
    code: string,
    state: string,
    codeVerifier: string,
  ): Promise<VerifiedIdentityResult> {
    if (!this.clientId || !this.clientSecret) {
      throw new InternalServerErrorException('DigiLocker direct credentials are not configured on server.');
    }

    try {
      // 1. Exchange authorization code with PKCE verifier
      const tokenResponse = await fetch(this.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code_verifier: codeVerifier,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        this.logger.error(`Token exchange failed with DigiLocker: ${errorText}`);
        throw new BadRequestException('Failed to exchange authorization token with DigiLocker.');
      }

      const tokenData = (await tokenResponse.json()) as { access_token: string; consent_id?: string };
      const accessToken = tokenData.access_token;
      const consentId = tokenData.consent_id || `dl_consent_${randomBytes(8).toString('hex')}`;

      // 2. Fetch user profile & masked verification info
      const profileResponse = await fetch(this.profileEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!profileResponse.ok) {
        throw new BadRequestException('Failed to fetch user profile from DigiLocker.');
      }

      const profile = (await profileResponse.json()) as {
        digilockerid?: string;
        name: string;
        dob?: string;
        gender?: string;
        state?: string;
        eaadhaar?: { last4?: string };
      };

      // 3. Immedately revoke access token to honor DPDP minimal data retention
      await this.revokeSession(accessToken).catch((err) => {
        this.logger.warn(`Non-blocking error revoking token after fetch: ${(err as Error).message}`);
      });

      // 4. Return sanitized verification summary (raw response discarded from memory)
      return {
        providerRefId: profile.digilockerid || `dl_${randomBytes(8).toString('hex')}`,
        verifiedName: profile.name,
        dateOfBirth: profile.dob ? new Date(profile.dob) : null,
        gender: profile.gender || null,
        state: profile.state || null,
        aadhaarLast4: profile.eaadhaar?.last4 || null,
        consentId,
        consentAt: new Date(),
      };
    } catch (err) {
      this.logger.error(`Error in DigiLockerDirectProvider: ${(err as Error).message}`);
      throw err;
    }
  }

  async revokeSession(tokenOrConsentId: string): Promise<void> {
    try {
      await fetch(this.revokeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          token: tokenOrConsentId,
        }),
      });
    } catch (err) {
      this.logger.warn(`Revoke session warning: ${(err as Error).message}`);
    }
  }
}
