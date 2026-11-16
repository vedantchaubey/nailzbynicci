// apps/frontend/src/components/ui/badge.tsx
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'brand'
    | 'pending'
    | 'risk'
    | 'outline'
    | 'bms'
    | 'district'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    brand: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    pending: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    risk: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    outline: 'border-gray-300 text-gray-700 bg-transparent',
    bms: 'bg-red-50 text-red-600 border-red-200 font-semibold',
    district: 'bg-violet-50 text-violet-700 border-violet-200 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    info: 'bg-blue-50 text-blue-700 border-blue-200 font-medium',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200 font-medium',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
