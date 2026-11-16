// apps/frontend/src/components/ui/timeline.tsx
import * as React from 'react';
import { CheckIcon, ClockIcon } from '../icons/index';

export interface TimelineStepItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string | null;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING' | 'REJECTED';
}

export interface TimelineProps {
  steps: TimelineStepItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isCompleted = step.status === 'COMPLETED';
        const isActive = step.status === 'ACTIVE';

        return (
          <div key={step.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
            {/* Connecting Vertical Line */}
            {!isLast && (
              <div
                className={`absolute left-[15px] top-[30px] bottom-0 w-[2px] ${
                  isCompleted ? 'bg-volt' : 'bg-line'
                }`}
              />
            )}

            {/* Step Marker Node */}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                isCompleted
                  ? 'bg-volt text-black border-volt font-bold'
                  : isActive
                  ? 'bg-black text-volt border-volt animate-pulse'
                  : 'bg-surface text-text-3 border-line'
              }`}
            >
              {isCompleted ? (
                <CheckIcon size={16} />
              ) : isActive ? (
                <ClockIcon size={16} />
              ) : (
                <span className="text-[12px] font-mono">{idx + 1}</span>
              )}
            </div>

            {/* Step Content */}
            <div className="flex flex-col flex-1 pt-1">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`text-[15px] font-bold uppercase tracking-tight ${
                    isCompleted || isActive ? 'text-white' : 'text-text-3'
                  }`}
                >
                  {step.title}
                </span>

                {step.timestamp && (
                  <span className="text-[11px] font-mono text-text-3 tabular-nums">
                    {step.timestamp}
                  </span>
                )}
              </div>

              {step.description && (
                <p className="text-[13px] text-text-2 mt-0.5 leading-snug">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
