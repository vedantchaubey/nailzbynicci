// apps/frontend/src/components/ui/gauge.tsx
'use client';

import * as React from 'react';
import { CheckIcon, CloseIcon } from '../icons/index';

export interface SignalRowItem {
  key: string;
  label: string;
  passed: boolean;
  scoreAwarded: number;
}

export interface ConfidenceGaugeProps {
  score: number; // 0..100
  signals?: SignalRowItem[];
  size?: number;
  className?: string;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  score = 0,
  signals = [],
  size = 220,
  className = '',
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half-circle
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const isVerified = normalizedScore >= 80;

  return (
    <div className={`flex flex-col items-center bg-surface border border-line rounded-[16px] p-6 ${className}`}>
      {/* Half-Ring Gauge */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden" style={{ width: size, height: size / 2 + 30 }}>
        <svg width={size} height={size} className="transform -rotate-180">
          {/* Background Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--line)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Dynamic Fill Arc in VOLT */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--volt)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-nike"
          />
        </svg>

        <div className="absolute bottom-2 flex flex-col items-center">
          <span className="text-4xl font-black font-display tabular-nums tracking-tight text-white">
            {Math.round(normalizedScore)}
            <span className="text-volt text-2xl font-bold">/100</span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-3">
            {isVerified ? 'AUTO-RELEASE VERIFIED' : 'EVALUATING SIGNALS'}
          </span>
        </div>
      </div>

      {/* Signal Rows */}
      {signals.length > 0 && (
        <div className="w-full mt-6 flex flex-col divide-y divide-line border-t border-line">
          {signals.map((sig) => (
            <div key={sig.key} className="py-2.5 flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    sig.passed ? 'text-volt bg-volt/10' : 'text-text-3 bg-surface-2'
                  }`}
                >
                  {sig.passed ? <CheckIcon size={12} /> : <CloseIcon size={10} />}
                </span>
                <span className={sig.passed ? 'text-text font-medium' : 'text-text-3'}>
                  {sig.label}
                </span>
              </div>
              <span className="font-mono text-[12px] tabular-nums font-semibold text-text-2">
                +{sig.scoreAwarded}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
