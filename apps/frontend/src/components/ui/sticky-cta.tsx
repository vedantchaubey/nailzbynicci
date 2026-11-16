// apps/frontend/src/components/ui/sticky-cta.tsx
'use client';

import * as React from 'react';
import { Button } from './button';
import { formatPaiseToInr } from '@ticketpass/shared';

export interface StickyCtaProps {
  pricePaise: number;
  originalPricePaise?: number;
  buttonText: string;
  onAction: () => void;
  subtext?: string;
  isVisible?: boolean;
  className?: string;
}

export const StickyCta: React.FC<StickyCtaProps> = ({
  pricePaise,
  originalPricePaise,
  buttonText,
  onAction,
  subtext = 'Escrow protected transfer',
  isVisible = true,
  className = '',
}) => {
  return (
    <aside
      aria-label="Ticket purchase actions"
      className={`fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-line py-3 px-4 md:px-8 transition-transform duration-300 ease-nike ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
    >
      <div className="max-w-content mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black font-display tabular-nums text-white">
              {formatPaiseToInr(pricePaise)}
            </span>
            {originalPricePaise && originalPricePaise > pricePaise && (
              <span className="text-[13px] text-text-3 line-through tabular-nums">
                {formatPaiseToInr(originalPricePaise)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-3">
            {subtext}
          </span>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={onAction}
          className="min-w-[160px] md:min-w-[200px]"
        >
          {buttonText}
        </Button>
      </div>
    </aside>
  );
};
