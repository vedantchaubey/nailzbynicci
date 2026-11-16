// apps/frontend/src/components/ui/stepper.tsx
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  className?: string;
}

export function Stepper({ steps, currentStepIndex, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <li key={step.id} className="relative flex-1">
                <div className="group flex flex-col items-center">
                  <span className="flex items-center">
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                        isCompleted
                          ? 'bg-brand-600 text-white'
                          : isCurrent
                          ? 'border-2 border-brand-600 bg-white text-brand-600'
                          : 'border border-gray-300 bg-white text-gray-500',
                      )}
                    >
                      {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : index + 1}
                    </span>
                  </span>
                  <span className="mt-2 text-center text-xs font-medium text-gray-700">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-[50%] top-4.5 -z-10 h-0.5 w-full -translate-y-1/2',
                      isCompleted ? 'bg-brand-600' : 'bg-gray-200',
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
