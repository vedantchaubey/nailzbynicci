// apps/backend/test/kyc-verification.spec.ts
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import {
  fuzzyMatchNames,
  computeIdentityFingerprint,
  KYC_RULES,
  KycStatus,
  KycRejectionReason,
} from '@ticketpass/shared';

describe('Section 21: DigiLocker Identity Verification & KYC Logic', () => {
  describe('Name Fuzzy Matching (Token-based & Honorific-invariant)', () => {
    it('should match names with inverted token order with score >= 0.8', () => {
      const score = fuzzyMatchNames('Rahul Kumar Verma', 'VERMA RAHUL KUMAR');
      expect(score).toBeGreaterThanOrEqual(KYC_RULES.NAME_MATCH_THRESHOLD);
      expect(score).toBe(1.0);
    });

    it('should match names ignoring common Indian honorifics (Shri, Smt, Mr, Dr)', () => {
      const score1 = fuzzyMatchNames('Shri Rahul Verma', 'Rahul Verma');
      expect(score1).toBeGreaterThanOrEqual(0.8);

      const score2 = fuzzyMatchNames('Dr. Priya Sharma', 'Priya Sharma');
      expect(score2).toBeGreaterThanOrEqual(0.8);

      const score3 = fuzzyMatchNames('Smt. Kavita Nair', 'Kavita Nair');
      expect(score3).toBeGreaterThanOrEqual(0.8);
    });

    it('should match initials when combined with last name', () => {
      const score = fuzzyMatchNames('R. K. Verma', 'Rahul Kumar Verma');
      expect(score).toBeGreaterThanOrEqual(0.75);
    });

    it('should reject completely disparate names with score < 0.8', () => {
      const score1 = fuzzyMatchNames('Rahul Verma', 'Amit Shah');
      expect(score1).toBeLessThan(KYC_RULES.NAME_MATCH_THRESHOLD);

      const score2 = fuzzyMatchNames('Priya Sharma', 'Vikram Malhotra');
      expect(score2).toBeLessThan(0.3);
    });
  });

  describe('Identity Fingerprint Generation', () => {
    it('should produce identical SHA-256 fingerprints regardless of token order or case', () => {
      const fp1 = computeIdentityFingerprint('Rahul Kumar Verma', '1995-04-12', '4821', 'test_salt');
      const fp2 = computeIdentityFingerprint('VERMA RAHUL KUMAR', '1995-04-12T00:00:00Z', '4821', 'test_salt');
      expect(fp1).toBe(fp2);
      expect(fp1).toHaveLength(64); // SHA-256 hex string
    });

    it('should produce different fingerprints for different individuals or different last-4', () => {
      const fp1 = computeIdentityFingerprint('Rahul Verma', '1995-04-12', '4821', 'test_salt');
      const fp2 = computeIdentityFingerprint('Rahul Verma', '1995-04-12', '9999', 'test_salt');
      const fp3 = computeIdentityFingerprint('Priya Sharma', '1995-04-12', '4821', 'test_salt');

      expect(fp1).not.toBe(fp2);
      expect(fp1).not.toBe(fp3);
    });
  });

  describe('Age Verification Rule', () => {
    function isUnderage(dob: Date): boolean {
      const diffMs = Date.now() - dob.getTime();
      const ageDate = new Date(diffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age < KYC_RULES.MIN_AGE_YEARS;
    }

    it('should reject users who are under 18 years old', () => {
      const dobUnderage = new Date('2012-05-10'); // 14 years old
      expect(isUnderage(dobUnderage)).toBe(true);
    });

    it('should accept users who are 18 or older', () => {
      const dobAdult = new Date('1998-08-23'); // 28 years old
      expect(isUnderage(dobAdult)).toBe(false);
    });
  });

  describe('DPDP Data Minimisation and Zero-Storage Rules', () => {
    it('should assert that full Aadhaar numbers are never stored in fingerprint or result', () => {
      const fullAadhaar = '548912349134';
      const last4 = fullAadhaar.slice(-4);
      expect(last4).toBe('9134');

      const fp = computeIdentityFingerprint('Priya Sharma', '1998-08-23', last4, 'test_salt');
      // The fingerprint hash must not contain the plaintext last 4 or full Aadhaar
      expect(fp).not.toContain(fullAadhaar);
      expect(fp).not.toContain('9134');
    });
  });
});
