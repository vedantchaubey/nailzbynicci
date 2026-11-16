// apps/frontend/src/components/ui/segmented-control.tsx
import * as React from 'react';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  badge?: number | string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={`inline-flex p-1 bg-surface border border-line rounded-pill ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(opt.value)}
            className={`relative flex items-center gap-2 px-5 py-2 rounded-pill text-[13px] font-bold uppercase tracking-wider transition-all duration-state select-none ${
              isSelected
                ? 'bg-white text-black'
                : 'text-text-2 hover:text-text bg-transparent'
            }`}
          >
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span
                className={`text-[11px] tabular-nums font-mono px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-black text-white' : 'bg-surface-2 text-text-3'
                }`}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
