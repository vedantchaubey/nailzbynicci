// apps/backend/src/modules/kyc/providers/mock-identity.provider.ts
import { Injectable, Logger } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import {
  IdentityProvider,
  IdentityAuthSession,
  VerifiedIdentityResult,
} from './identity-provider.interface.js';

export interface MockTestIdentity {
  id: string;
  name: string;
  dob: string;
  gender: string;
  state: string;
  aadhaarLast4: string;
  isUnderage?: boolean;
  isBanned?: boolean;
}

export const MOCK_TEST_IDENTITIES: MockTestIdentity[] = [
  {
    id: 'mock_id_rahul',
    name: 'Rahul Kumar Verma',
    dob: '1995-04-12',
    gender: 'M',
    state: 'Maharashtra',
    aadhaarLast4: '4821',
  },
  {
    id: 'mock_id_priya',
    name: 'Priya Sharma',
    dob: '1998-08-23',
    gender: 'F',
    state: 'Delhi',
    aadhaarLast4: '9134',
  },
  {
    id: 'mock_id_vikram',
    name: 'Vikram Malhotra',
    dob: '1992-11-05',
    gender: 'M',
    state: 'Karnataka',
    aadhaarLast4: '7740',
  },
  {
    id: 'mock_id_ananya',
    name: 'Ananya Deshmukh',
    dob: '2001-02-17',
    gender: 'F',
    state: 'Telangana',
    aadhaarLast4: '3029',
  },
  {
    id: 'mock_id_underage',
    name: 'Aryan Kid Mehra',
    dob: '2012-05-10', // Underage (< 18)
    gender: 'M',
    state: 'Maharashtra',
    aadhaarLast4: '1122',
    isUnderage: true,
  },
  {
    id: 'mock_id_banned',
    name: 'Banned Fraudster identity',
    dob: '1985-01-01',
    gender: 'M',
    state: 'Haryana',
    aadhaarLast4: '6666',
    isBanned: true,
  },
];

@Injectable()
export class MockIdentityProvider implements IdentityProvider {
  readonly providerName = 'MOCK_DIGILOCKER';
  private readonly logger = new Logger(MockIdentityProvider.name);

  // In-memory store for mock sessions
  private readonly sessions = new Map<string, { userId: string; redirectTo: string }>();

  async createAuthorizationSession(userId: string, redirectTo: string): Promise<IdentityAuthSession> {
    const state = randomBytes(16).toString('hex');
    const nonce = randomBytes(16).toString('hex');
    const codeVerifier = randomBytes(32).toString('base64url');

    this.sessions.set(state, { userId, redirectTo });

    // In local dev, direct user to the frontend mock consent screen
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const authorizationUrl = `${frontendUrl}/dev/mock-digilocker?state=${state}&nonce=${nonce}&redirect_to=${encodeURIComponent(
      redirectTo,
    )}`;

    this.logger.log(`[MockIdentityProvider] Created session for user ${userId}. Auth URL: ${authorizationUrl}`);

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
    _codeVerifier: string,
  ): Promise<VerifiedIdentityResult> {
    this.logger.log(`[MockIdentityProvider] Exchanging mock code=${code} for state=${state}`);

    // Parse code to see if a specific test identity was selected
    let selectedIdentity = MOCK_TEST_IDENTITIES[0];
    if (code && code.startsWith('identity:')) {
      const idKey = code.replace('identity:', '');
      const found = MOCK_TEST_IDENTITIES.find((item) => item.id === idKey);
      if (found) {
        selectedIdentity = found;
      }
    }

    const consentId = `mock_consent_${randomBytes(8).toString('hex')}`;

    return {
      providerRefId: `dl_ref_${randomBytes(8).toString('hex')}`,
      verifiedName: selectedIdentity.name,
      dateOfBirth: new Date(selectedIdentity.dob),
      gender: selectedIdentity.gender,
      state: selectedIdentity.state,
      aadhaarLast4: selectedIdentity.aadhaarLast4,
      consentId,
      consentAt: new Date(),
    };
  }

  async revokeSession(consentId: string): Promise<void> {
    this.logger.log(`[MockIdentityProvider] Mock session revoked: consentId=${consentId}`);
  }
}
