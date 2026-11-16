// apps/frontend/src/components/transfer/verification-confidence-widget.tsx
import React from 'react';
import { VerificationSignalKey, VerificationSignalResult } from '@ticketpass/shared';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, X, ShieldAlert, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VerificationConfidenceWidgetProps {
  score: number;
  signals: VerificationSignalResult[];
  meetsAutoRelease: boolean;
  className?: string;
}

const DEFAULT_SIGNALS: Array<{
  key: VerificationSignalKey;
  label: string;
  weight: number;
  description: string;
}> = [
  {
    key: VerificationSignalKey.A_BUYER_CONFIRMATION,
    label: 'Signal A: Buyer Confirmation',
    weight: 40,
    description: 'Buyer confirmed ticket receipt with friction last-4 digit match',
  },
  {
    key: VerificationSignalKey.B_BUYER_OCR_CHECK,
    label: 'Signal B: Buyer App OCR Scan',
    weight: 20,
    description: 'Receipt screenshot OCR validates booking reference & venue',
  },
  {
    key: VerificationSignalKey.C_SELLER_INITIATED_OCR,
    label: 'Signal C: Seller Transfer OCR',
    weight: 15,
    description: 'Seller transfer screenshot confirms transfer request sent',
  },
  {
    key: VerificationSignalKey.D_TIMING_CONSISTENCY,
    label: 'Signal D: SLA Timing Compliance',
    weight: 10,
    description: 'Transfer initiated and confirmed within strict SLA windows',
  },
  {
    key: VerificationSignalKey.E_SELLER_REPUTATION,
    label: 'Signal E: Seller Trust Score',
    weight: 10,
    description: 'Calculated from historical completed sales, dispute-free record',
  },
  {
    key: VerificationSignalKey.F_NO_FRAUD_FLAGS,
    label: 'Signal F: Anti-Fraud Clearance',
    weight: 5,
    description: 'Clean fingerprint, no IP collisions, no perceptual image hash match',
  },
];

export function VerificationConfidenceWidget({
  score,
  signals,
  meetsAutoRelease,
  className,
}: VerificationConfidenceWidgetProps) {
  // Normalize signals map
  const signalMap = new Map<VerificationSignalKey, VerificationSignalResult>();
  signals.forEach((s) => signalMap.set(s.key, s));

  const isGreen = score >= 80;
  const isYellow = score >= 50 && score < 80;

  // Arc calculation for SVG gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * Math.min(100, Math.max(0, score))) / 100;

  return (
    <Card className={cn('border-gray-200 bg-white shadow-sm overflow-hidden', className)}>
      <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Transfer Confidence Engine</h3>
            <p className="text-[11px] text-gray-500">Autonomous Multi-Signal Verification (0–100)</p>
          </div>
        </div>
        <Badge variant={isGreen ? 'success' : isYellow ? 'warning' : 'danger'}>
          {isGreen ? 'Auto-Release Ready' : isYellow ? 'Evaluating Signals' : 'Verification Pending'}
        </Badge>
      </CardHeader>

      <CardContent className="pt-5 space-y-6">
        {/* Dial meter + summary */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200">
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-gray-200"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className={cn(
                  'transition-all duration-1000 ease-out',
                  isGreen ? 'stroke-emerald-500' : isYellow ? 'stroke-amber-500' : 'stroke-red-500',
                )}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-gray-900 tracking-tight font-mono">
                {score}
              </span>
              <span className="text-[10px] font-semibold uppercase text-gray-400">/ 100</span>
            </div>
          </div>

          <div className="text-xs space-y-2 max-w-xs">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-3 h-3 rounded-full',
                  isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-red-500',
                )}
              />
              <span className="font-bold text-gray-900 text-sm">
                {isGreen
                  ? 'Threshold Met (≥ 80)'
                  : isYellow
                  ? 'Awaiting Key Verification Signals'
                  : 'Initial Transfer Stage'}
              </span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              TicketPass requires a minimum composite score of <strong>80 / 100</strong> plus explicit
              buyer confirmation (Signal A) before escrow releases seller payout.
            </p>
          </div>
        </div>

        {/* Signals Checklist */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Verification Signals Breakdown
          </div>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {DEFAULT_SIGNALS.map((sig) => {
              const result = signalMap.get(sig.key);
              const isPassed = result ? result.passed : false;
              const awarded = result ? result.scoreAwarded : 0;

              return (
                <div
                  key={sig.key}
                  className={cn(
                    'p-3 flex items-start justify-between gap-3 transition-colors',
                    isPassed ? 'bg-emerald-50/30' : 'bg-white',
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5',
                        isPassed
                          ? 'bg-emerald-100 text-emerald-700 font-bold'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                        <span>{sig.label}</span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          (Weight: {sig.weight} pts)
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
                        {sig.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span
                      className={cn(
                        'text-xs font-mono font-bold px-2 py-0.5 rounded',
                        isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      +{awarded} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
