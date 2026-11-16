// apps/backend/test/confidence-engine.spec.ts
import {
  VerificationSignalKey,
  SIGNAL_WEIGHTS,
  BUSINESS_RULES,
} from '@ticketpass/shared';

interface SignalState {
  signalA_buyerConfirmed: boolean;
  signalB_buyerOcrPass: boolean;
  signalC_sellerInitiatedOcr: boolean;
  signalD_timingValid: boolean;
  signalE_sellerReputationHigh: boolean;
  signalF_noFraudFlags: boolean;
}

function evaluateScore(state: SignalState): {
  totalScore: number;
  autoReleaseAllowed: boolean;
} {
  let score = 0;
  if (state.signalA_buyerConfirmed) score += SIGNAL_WEIGHTS[VerificationSignalKey.A_BUYER_CONFIRMATION].weight;
  if (state.signalB_buyerOcrPass) score += SIGNAL_WEIGHTS[VerificationSignalKey.B_BUYER_OCR_CHECK].weight;
  if (state.signalC_sellerInitiatedOcr) score += SIGNAL_WEIGHTS[VerificationSignalKey.C_SELLER_INITIATED_OCR].weight;
  if (state.signalD_timingValid) score += SIGNAL_WEIGHTS[VerificationSignalKey.D_TIMING_CONSISTENCY].weight;
  if (state.signalE_sellerReputationHigh) score += SIGNAL_WEIGHTS[VerificationSignalKey.E_SELLER_REPUTATION].weight;
  if (state.signalF_noFraudFlags) score += SIGNAL_WEIGHTS[VerificationSignalKey.F_NO_FRAUD_FLAGS].weight;

  // Strict Hard Rule: Must score >= 80 AND Buyer Confirmation (Signal A) must be true
  const meetsThreshold = score >= BUSINESS_RULES.CONFIDENCE_AUTO_RELEASE_THRESHOLD;
  const autoReleaseAllowed = meetsThreshold && state.signalA_buyerConfirmed;

  return { totalScore: score, autoReleaseAllowed };
}

describe('Transfer Verification Confidence Engine', () => {
  it('table-driven validation of signal combinations', () => {
    const testCases: Array<{
      name: string;
      signals: SignalState;
      expectedScore: number;
      expectedAutoRelease: boolean;
    }> = [
      {
        name: 'Case 1: Seller screenshot proof only (MUST NOT release)',
        signals: {
          signalA_buyerConfirmed: false,
          signalB_buyerOcrPass: false,
          signalC_sellerInitiatedOcr: true, // +10
          signalD_timingValid: false,
          signalE_sellerReputationHigh: false,
          signalF_noFraudFlags: false,
        },
        expectedScore: 10,
        expectedAutoRelease: false,
      },
      {
        name: 'Case 2: Seller screenshot + high reputation + no fraud flags (MUST NOT release without buyer confirmation)',
        signals: {
          signalA_buyerConfirmed: false,
          signalB_buyerOcrPass: false,
          signalC_sellerInitiatedOcr: true, // +10
          signalD_timingValid: false,
          signalE_sellerReputationHigh: true, // +10
          signalF_noFraudFlags: true, // +10
        },
        expectedScore: 30,
        expectedAutoRelease: false,
      },
      {
        name: 'Case 3: Buyer confirmation alone (Score 35 < 80 -> MUST NOT release)',
        signals: {
          signalA_buyerConfirmed: true, // +35
          signalB_buyerOcrPass: false,
          signalC_sellerInitiatedOcr: false,
          signalD_timingValid: false,
          signalE_sellerReputationHigh: false,
          signalF_noFraudFlags: false,
        },
        expectedScore: 35,
        expectedAutoRelease: false,
      },
      {
        name: 'Case 4: Full verification (Buyer confirmation + OCR pass + Seller OCR + Timing + Rep + No fraud) = 100',
        signals: {
          signalA_buyerConfirmed: true, // +35
          signalB_buyerOcrPass: true, // +25
          signalC_sellerInitiatedOcr: true, // +10
          signalD_timingValid: true, // +10
          signalE_sellerReputationHigh: true, // +10
          signalF_noFraudFlags: true, // +10
        },
        expectedScore: 100,
        expectedAutoRelease: true,
      },
      {
        name: 'Case 5: Buyer confirmation + OCR pass + Seller OCR + Timing = 80 (Exact threshold -> releases)',
        signals: {
          signalA_buyerConfirmed: true, // +35
          signalB_buyerOcrPass: true, // +25
          signalC_sellerInitiatedOcr: true, // +10
          signalD_timingValid: true, // +10
          signalE_sellerReputationHigh: false,
          signalF_noFraudFlags: false,
        },
        expectedScore: 80,
        expectedAutoRelease: true,
      },
      {
        name: 'Case 6: Seller with low reputation and no OCR screenshot but Buyer confirmed with valid timing = 55 (MUST NOT release)',
        signals: {
          signalA_buyerConfirmed: true, // +35
          signalB_buyerOcrPass: false,
          signalC_sellerInitiatedOcr: false,
          signalD_timingValid: true, // +10
          signalE_sellerReputationHigh: false,
          signalF_noFraudFlags: true, // +10
        },
        expectedScore: 55,
        expectedAutoRelease: false,
      },
    ];

    for (const tc of testCases) {
      const result = evaluateScore(tc.signals);
      expect(result.totalScore).toBe(tc.expectedScore);
      expect(result.autoReleaseAllowed).toBe(tc.expectedAutoRelease);
    }
  });

  it('guarantees seller screenshot alone never triggers payout release', () => {
    const sellerOnlyResult = evaluateScore({
      signalA_buyerConfirmed: false,
      signalB_buyerOcrPass: false,
      signalC_sellerInitiatedOcr: true,
      signalD_timingValid: true,
      signalE_sellerReputationHigh: true,
      signalF_noFraudFlags: true,
    });

    // Score is 40, buyer confirmation is false -> release MUST be false
    expect(sellerOnlyResult.totalScore).toBe(40);
    expect(sellerOnlyResult.autoReleaseAllowed).toBe(false);
  });
});
