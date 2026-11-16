// apps/frontend/src/components/events/venue-map-concert.tsx
'use client';

import * as React from 'react';
import { formatPaiseToInr } from '@ticketpass/shared';
import { SectionStat } from './venue-map-cricket';

interface ConcertMapProps {
  sections: SectionStat[];
  selectedSection: string | null;
  onSelectSection: (section: string | null) => void;
}

export function VenueMapConcert({ sections, selectedSection, onSelectSection }: ConcertMapProps) {
  const [hoveredSection, setHoveredSection] = React.useState<SectionStat | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const statsMap = React.useMemo(() => {
    const map = new Map<string, SectionStat>();
    for (const s of sections) {
      map.set(s.section.toLowerCase(), s);
    }
    return map;
  }, [sections]);

  const concertSections = [
    {
      id: 'standing_vip_pit',
      name: 'Grand Lounge VIP Box 4',
      tier: 'vip',
      path: 'M 160 170 L 440 170 L 440 240 L 160 240 Z',
      labelX: 300,
      labelY: 205,
    },
    {
      id: 'east_stand_first_floor',
      name: 'AirAsia East Stand First Floor Bay 1',
      tier: 'premium',
      path: 'M 100 260 L 500 260 L 500 340 L 100 340 Z',
      labelX: 300,
      labelY: 300,
    },
    {
      id: 'garware_lower',
      name: 'Garware Stand Lower Tier',
      tier: 'mid',
      path: 'M 70 360 L 270 360 L 250 480 L 50 480 Z',
      labelX: 160,
      labelY: 420,
    },
    {
      id: 'north_stand_2',
      name: 'North Stand Bay 2',
      tier: 'value',
      path: 'M 330 360 L 530 360 L 550 480 L 350 480 Z',
      labelX: 440,
      labelY: 420,
    },
  ];

  // Nike-Grade brightness steps (NO rainbow colors per Section 22)
  const getTierFill = (tier: string) => {
    switch (tier) {
      case 'vip':
        return '#383838';
      case 'premium':
        return '#2E2E2E';
      case 'mid':
        return '#242424';
      default:
        return '#1A1A1A';
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto flex items-center justify-center p-2 select-none">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setHoveredSection(null)}
      >
        {/* Stage Area */}
        <rect x="200" y="50" width="200" height="70" rx="4" fill="#0B0B0B" stroke="#3A3A3A" strokeWidth="1.5" />
        <text x="300" y="92" textAnchor="middle" fill="#7A7A7A" fontSize="13" fontWeight="800" letterSpacing="0.1em">
          STAGE
        </text>

        {/* Sections */}
        {concertSections.map((sec) => {
          const stat = statsMap.get(sec.name.toLowerCase());
          const isSelected = selectedSection === sec.name;
          const isHovered = hoveredSection?.section.toLowerCase() === sec.name.toLowerCase();
          const baseFill = getTierFill(sec.tier);

          return (
            <g key={sec.id} className="cursor-pointer">
              <path
                d={sec.path}
                fill={isSelected ? '#2A2A2A' : isHovered ? '#444444' : baseFill}
                stroke={isSelected ? '#C8FF00' : '#3A3A3A'}
                strokeWidth={isSelected ? 2.5 : 1}
                className="transition-colors duration-150"
                onClick={() => onSelectSection(isSelected ? null : sec.name)}
                onMouseEnter={() => {
                  if (stat) setHoveredSection(stat);
                }}
              />
              <text
                x={sec.labelX}
                y={sec.labelY}
                textAnchor="middle"
                fill={isSelected ? '#C8FF00' : '#B3B3B3'}
                fontSize="11"
                fontWeight="700"
                className="pointer-events-none select-none uppercase tracking-wider"
              >
                {sec.name.length > 20 ? `${sec.name.slice(0, 18)}...` : sec.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredSection && (
        <div
          className="absolute z-20 pointer-events-none p-3 rounded-[8px] bg-black/95 border border-line-strong text-white flex flex-col gap-0.5 shadow-2xl"
          style={{
            left: Math.min(tooltipPos.x + 12, 340),
            top: Math.max(tooltipPos.y - 70, 10),
          }}
        >
          <span className="text-[12px] font-black font-display uppercase tracking-tight text-white">
            {hoveredSection.section}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[14px] font-black font-display tabular-nums text-volt">
              From {formatPaiseToInr(hoveredSection.lowestPricePaise)}
            </span>
            <span className="text-[11px] text-text-3 font-mono">
              · {hoveredSection.listingCount} available
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
