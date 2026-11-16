// apps/backend/src/modules/kyc/providers/aggregator-identity.provider.ts
import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import {
  IdentityProvider,
  IdentityAuthSession,
  VerifiedIdentityResult,
} from './identity-provider.interface.js';

/**
 * Aggregator Identity Provider Adapter.
 * 
 * Works with third-party Indian KYC aggregators such as:
 * - Setu (Bridge / DigiLocker consent API)
 * - Cashfree (Verification Suite / Aadhaar DigiLocker)
 * - Digio (Document Gateway / DigiLocker Verification)
 * - Gridlines (Identity Verification SDK)
 * 
 * MAPPER IMPLEMENTATION NOTE:
 * The endpoints and JSON payload structure below represent standard aggregator workflows
 * (create-session -> user-consent-url -> webhook/redirect callback -> fetch-result).
 * Before switching IDENTITY_PROVIDER=aggregator in production, confirm each endpoint path
 * and request/response header format against your contracted provider's current documentation.
 */
@Injectable()
export class AggregatorIdentityProvider implements IdentityProvider {
  readonly providerName = 'AGGREGATOR_KYC';
  private readonly logger = new Logger(AggregatorIdentityProvider.name);

  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly callbackUrl: string;

  constructor() {
    this.baseUrl = process.env.KYC_AGGREGATOR_BASE_URL || 'https://api.setu.co/v2';
    this.apiKey = process.env.KYC_AGGREGATOR_API_KEY || '';
    this.apiSecret = process.env.KYC_AGGREGATOR_API_SECRET || '';
    this.callbackUrl =
      process.env.KYC_AGGREGATOR_CALLBACK_URL ||
      'http://localhost:4000/api/v1/kyc/callback';
  }

  async createAuthorizationSession(userId: string, redirectTo: string): Promise<IdentityAuthSession> {
    const state = randomBytes(16).toString('hex');
    const nonce = randomBytes(16).toString('hex');
    const codeVerifier = randomBytes(32).toString('base64url');

    if (!this.apiKey) {
      this.logger.warn('[AggregatorIdentityProvider] KYC_AGGREGATOR_API_KEY not configured.');
    }

    try {
      // Create session on aggregator API
      // (Mock fallback if running with unconfigured credentials)
      if (!this.apiKey) {
        return {
          authorizationUrl: `${this.callbackUrl}?state=${state}&code=agg_test_code&redirect_to=${encodeURIComponent(
            redirectTo,
          )}`,
          state,
          nonce,
          codeVerifier,
        };
      }

      const response = await fetch(`${this.baseUrl}/digilocker/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': this.apiKey,
          'x-client-secret': this.apiSecret,
        },
        body: JSON.stringify({
          userId,
          state,
          nonce,
          redirectUrl: this.callbackUrl,
          documents: ['AADHAAR'],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Aggregator session creation failed: ${errorText}`);
        throw new BadRequestException('Failed to initialize aggregator KYC session.');
      }

      const data = (await response.json()) as { url: string; id: string };

      return {
        authorizationUrl: data.url,
        state,
        nonce,
        codeVerifier,
      };
    } catch (err) {
      this.logger.error(`Aggregator error: ${(err as Error).message}`);
      throw err;
    }
  }

  async exchangeAndVerifyIdentity(
    code: string,
    state: string,
    _codeVerifier: string,
  ): Promise<VerifiedIdentityResult> {
    try {
      if (!this.apiKey) {
        // Fallback mock aggregator response
        return {
          providerRefId: `agg_${randomBytes(8).toString('hex')}`,
          verifiedName: 'Aggregator Verified User',
          dateOfBirth: new Date('1994-06-15'),
          gender: 'M',
          state: 'Maharashtra',
          aadhaarLast4: '5566',
          consentId: `consent_${randomBytes(6).toString('hex')}`,
          consentAt: new Date(),
        };
      }

      // Query aggregator for verification result
      const response = await fetch(`${this.baseUrl}/digilocker/sessions/${code}`, {
        headers: {
          'x-client-id': this.apiKey,
          'x-client-secret': this.apiSecret,
        },
      });

      if (!response.ok) {
        throw new BadRequestException('Aggregator could not verify the provided session code.');
      }

      const res = (await response.json()) as {
        id: string;
        status: string;
        aadhaar?: {
          name: string;
          dob: string;
          gender: string;
          state: string;
          last4: string;
        };
      };

      if (!res.aadhaar) {
        throw new BadRequestException('Aadhaar data was not shared during consent.');
      }

      return {
        providerRefId: res.id,
        verifiedName: res.aadhaar.name,
        dateOfBirth: res.aadhaar.dob ? new Date(res.aadhaar.dob) : null,
        gender: res.aadhaar.gender || null,
        state: res.aadhaar.state || null,
        aadhaarLast4: res.aadhaar.last4 || null,
        consentId: `consent_${res.id}`,
        consentAt: new Date(),
      };
    } catch (err) {
      this.logger.error(`Aggregator verification failed: ${(err as Error).message}`);
      throw err;
    }
  }

  async revokeSession(consentId: string): Promise<void> {
    this.logger.log(`[AggregatorIdentityProvider] Revoking aggregator session: ${consentId}`);
  }
}
