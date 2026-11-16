// apps/frontend/src/components/ui/event-card.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Chip } from './chip';
import { PinIcon, CalendarIcon } from '../icons/index';

export interface EventCardProps {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string | Date;
  imageUrl: string;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  listingCount: number;
  lowestPricePaise: number | null;
  aspectRatio?: '4:5' | '16:9';
  priority?: boolean;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  venue,
  city,
  date,
  imageUrl,
  platform,
  listingCount,
  lowestPricePaise,
  aspectRatio = '4:5',
  priority = false,
  className = '',
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const aspectClass = aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-[16/9]';

  return (
    <Link
      href={`/events/${id}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-[4px] border border-line bg-surface select-none pressable ${aspectClass} ${className}`}
    >
      {/* Background Image with Hover Scale */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 85vw, 400px"
          className="object-cover transition-transform duration-500 ease-nike group-hover:scale-105"
        />
        {/* Scrim Overlay: 88% black at bottom fading up, 6% dark wash */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        <div className="absolute inset-0 scrim-bottom pointer-events-none" />
      </div>

      {/* Top Meta Chips */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        {listingCount > 0 ? (
          <Chip variant="live" pulse>
            LIVE · {listingCount} {listingCount === 1 ? 'SEAT' : 'SEATS'}
          </Chip>
        ) : (
          <Chip variant="sold">DROP COMPLETED</Chip>
        )}

        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-text-2">
          {platform}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-4 md:p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[12px] text-text-2 uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1">
            <PinIcon size={13} className="text-volt" />
            {city}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <CalendarIcon size={13} />
            {formattedDate}
          </span>
        </div>

        {/* Display Title stacked bottom-left */}
        <h3 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight text-white line-clamp-2 leading-none">
          {name}
        </h3>

        {/* Price Line */}
        <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-3">
            STARTING AT
          </span>
          <span className="text-lg md:text-xl font-black font-display tabular-nums text-volt">
            {lowestPricePaise ? formatPaiseToInr(lowestPricePaise) : 'SOLD OUT'}
          </span>
        </div>
      </div>
    </Link>
  );
};
