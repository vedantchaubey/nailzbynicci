// apps/frontend/src/components/ui/listing-row.tsx
'use client';

import * as React from 'react';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Button } from './button';
import { Chip } from './chip';
import { VerifiedSealGlyph, ShieldIcon, CheckIcon, ChevronDownIcon } from '../icons/index';

export interface ListingRowProps {
  id: string;
  section: string;
  row: string;
  seats: string[];
  quantity: number;
  originalPricePaise: number;
  resalePricePaise: number;
  sellerLevel?: string;
  sellerKycVerified?: boolean;
  sellerCompletedSales?: number;
  isTogether?: boolean;
  onSelect: (listingId: string) => void;
  className?: string;
}

export const ListingRow: React.FC<ListingRowProps> = ({
  id,
  section,
  row,
  seats,
  quantity,
  originalPricePaise,
  resalePricePaise,
  sellerLevel = 'VERIFIED',
  sellerKycVerified = true,
  sellerCompletedSales = 12,
  isTogether = true,
  onSelect,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const seatSummary = seats.length > 0 ? seats.join(', ') : `${quantity} seats`;
  const togetherLabel = isTogether && quantity > 1 ? `${quantity} together` : '';

  return (
    <div className={`w-full border-b border-line transition-colors ${isExpanded ? 'bg-surface' : 'hover:bg-surface/50'} ${className}`}>
      {/* 88px Header Row */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className="h-[88px] px-4 md:px-6 flex items-center justify-between cursor-pointer select-none"
      >
        {/* Left: Section name + Meta */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-black font-display uppercase tracking-tight text-white">
              {section}
            </span>
            {togetherLabel && (
              <Chip variant="tag" className="py-0.5 px-2 text-[10px]">
                {togetherLabel}
              </Chip>
            )}
          </div>
          <span className="text-[13px] text-text-2 font-medium">
            Row {row} · Seats {seatSummary}
          </span>
        </div>

        {/* Right: Price + Expand Chevron */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-black font-display tabular-nums text-white">
              {formatPaiseToInr(resalePricePaise)}
            </span>
            {originalPricePaise > resalePricePaise && (
              <span className="text-[12px] text-text-3 line-through tabular-nums">
                {formatPaiseToInr(originalPricePaise)}
              </span>
            )}
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-text-3 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-white' : ''
            }`}
          >
            <ChevronDownIcon size={18} />
          </div>
        </div>
      </div>

      {/* Expanded Detail Drawer */}
      {isExpanded && (
        <div className="px-4 md:px-6 pb-5 pt-2 flex flex-col gap-4 bg-surface border-t border-line/60">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[13px]">
            <div className="flex items-center gap-2">
              <VerifiedSealGlyph size={16} className="text-volt" />
              <span className="text-text font-medium">Identity verified seller</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldIcon size={16} className="text-volt" />
              <span className="text-text font-medium">Escrow protected</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckIcon size={16} className="text-volt" />
              <span className="text-text font-medium">{sellerCompletedSales} transfers completed</span>
            </div>
          </div>

          <div className="p-3 bg-surface-2 rounded-[8px] text-[12px] text-text-2 flex items-center justify-between">
            <span>Transfer will land in your app natively. TicketPass coordinates delivery and releases funds only when confirmed.</span>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => onSelect(id)}
            className="w-full font-bold"
          >
            GET TICKETS · {formatPaiseToInr(resalePricePaise)}
          </Button>
        </div>
      )}
    </div>
  );
};
