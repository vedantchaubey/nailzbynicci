// apps/backend/src/modules/kyc/providers/identity-provider.interface.ts

export interface IdentityAuthSession {
  authorizationUrl: string;
  state: string;
  nonce: string;
  codeVerifier: string;
}

export interface VerifiedIdentityResult {
  providerRefId: string;
  verifiedName: string;
  dateOfBirth: Date | null;
  gender: string | null;
  state: string | null;
  aadhaarLast4: string | null;
  consentId: string;
  consentAt: Date;
}

export interface IdentityProvider {
  readonly providerName: string;

  /**
   * Initializes OAuth 2.0 PKCE session and generates the user authorization URL.
   */
  createAuthorizationSession(userId: string, redirectTo: string): Promise<IdentityAuthSession>;

  /**
   * Exchanges authorization code for identity tokens, fetches verified attributes,
   * validates state/nonce, immediately revokes access tokens, and discards raw PII.
   */
  exchangeAndVerifyIdentity(
    code: string,
    state: string,
    codeVerifier: string,
  ): Promise<VerifiedIdentityResult>;

  /**
   * Explicitly revokes consent/tokens on provider side where supported.
   */
  revokeSession(consentId: string): Promise<void>;
}
