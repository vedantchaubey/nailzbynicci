// apps/frontend/src/components/ui/stepper-pill.tsx
import * as React from 'react';
import { PlusIcon, MinusIcon } from '../icons/index';

export interface StepperPillProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  label?: string;
  className?: string;
}

export const StepperPill: React.FC<StepperPillProps> = ({
  value,
  min = 1,
  max = 6,
  onChange,
  label = 'TICKETS',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 p-1.5 bg-surface border border-line rounded-pill select-none ${className}`}
    >
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full flex items-center justify-center text-text-2 hover:text-text hover:bg-surface-2 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
        aria-label="Decrease quantity"
      >
        <MinusIcon size={16} />
      </button>

      <span className="px-2 text-[14px] font-bold tracking-tight uppercase tabular-nums">
        {value} {value === 1 ? label.replace(/S$/, '') : label}
      </span>

      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-full flex items-center justify-center text-text-2 hover:text-text hover:bg-surface-2 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
        aria-label="Increase quantity"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
};
