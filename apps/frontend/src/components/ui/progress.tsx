// apps/frontend/src/components/ui/progress.tsx
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'brand' | 'pending' | 'risk';
}

export function Progress({
  className,
  value = 0,
  max = 100,
  variant = 'brand',
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    brand: 'bg-brand-600',
    pending: 'bg-pending-500',
    risk: 'bg-risk-500',
  };

  return (
    <div
      className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100', className)}
      {...props}
    >
      <div
        className={cn('h-full w-full flex-1 transition-all duration-300 ease-out', variants[variant])}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
