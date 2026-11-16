// apps/backend/src/modules/kyc/providers/bank-verification.provider.ts
import { Injectable, Logger } from '@nestjs/common';
import { fuzzyMatchNames, KYC_RULES } from '@ticketpass/shared';

export interface BankVerificationQuery {
  accountNumber: string;
  ifsc: string;
  claimedHolderName: string;
  upiId?: string;
  verifiedKycName: string;
}

export interface BankVerificationResponse {
  isSuccess: boolean;
  registeredNameAtBank: string;
  nameMatchScore: number;
  nameMatchVerified: boolean;
  referenceId: string;
  message: string;
}

export interface BankVerificationProvider {
  verifyAccount(query: BankVerificationQuery): Promise<BankVerificationResponse>;
}

@Injectable()
export class MockBankVerificationProvider implements BankVerificationProvider {
  private readonly logger = new Logger(MockBankVerificationProvider.name);

  async verifyAccount(query: BankVerificationQuery): Promise<BankVerificationResponse> {
    this.logger.log(
      `[MockBankVerificationProvider] Simulating penny-drop verification for IFSC: ${query.ifsc}, claimed: ${query.claimedHolderName}`,
    );

    // In mock mode, if claimedHolderName is provided, simulate bank returning that name
    // (or an inverted order version to test token-based fuzzy matching)
    const registeredNameAtBank = query.claimedHolderName.trim();
    const score = fuzzyMatchNames(registeredNameAtBank, query.verifiedKycName);
    const nameMatchVerified = score >= KYC_RULES.NAME_MATCH_THRESHOLD;

    return {
      isSuccess: true,
      registeredNameAtBank,
      nameMatchScore: score,
      nameMatchVerified,
      referenceId: `pny_drop_${Date.now()}`,
      message: nameMatchVerified
        ? 'Bank account verified successfully. Name matches KYC identity.'
        : `Bank account name (${registeredNameAtBank}) did not sufficiently match verified KYC name (${query.verifiedKycName}). Match score: ${score}`,
    };
  }
}
