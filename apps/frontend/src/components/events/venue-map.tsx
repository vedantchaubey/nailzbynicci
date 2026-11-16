// apps/frontend/src/components/events/venue-map.tsx
'use client';

import * as React from 'react';
import { VenueMapCricket, SectionStat } from './venue-map-cricket';
import { VenueMapConcert } from './venue-map-concert';
import { PlusIcon, MinusIcon } from '../icons/index';

interface VenueMapProps {
  category: string;
  sections: SectionStat[];
  selectedSection: string | null;
  onSelectSection: (section: string | null) => void;
  className?: string;
}

export function VenueMap({
  category,
  sections,
  selectedSection,
  onSelectSection,
  className = '',
}: VenueMapProps) {
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const isCricket = category.toLowerCase().includes('cricket');

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    onSelectSection(null);
  };

  return (
    <div className={`relative flex flex-col items-center rounded-[16px] border border-line bg-surface p-4 overflow-hidden select-none ${className}`}>
      {/* Zoom / Reset Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 p-1 rounded-pill bg-black/80 border border-line backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-full flex items-center justify-center text-text-2 hover:text-white hover:bg-surface-2 transition-colors"
        >
          <PlusIcon size={14} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-full flex items-center justify-center text-text-2 hover:text-white hover:bg-surface-2 transition-colors"
        >
          <MinusIcon size={14} />
        </button>
      </div>

      {/* Map Content */}
      <div
        className="w-full transition-transform duration-300 ease-nike"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {isCricket ? (
          <VenueMapCricket
            sections={sections}
            selectedSection={selectedSection}
            onSelectSection={onSelectSection}
          />
        ) : (
          <VenueMapConcert
            sections={sections}
            selectedSection={selectedSection}
            onSelectSection={onSelectSection}
          />
        )}
      </div>

      {/* Minimal Legend */}
      <div className="w-full flex items-center justify-center gap-6 mt-4 pt-4 border-t border-line text-[11px] font-bold uppercase tracking-wider text-text-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-[#1A1A1A] border border-[#3A3A3A]" />
          <span>Value Tier</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-[#2E2E2E] border border-[#3A3A3A]" />
          <span>Premium Tier</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-[#383838] border border-[#3A3A3A]" />
          <span>VIP Box</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-volt" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
