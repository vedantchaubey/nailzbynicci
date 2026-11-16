// apps/frontend/src/components/events/venue-map-cricket.tsx
'use client';

import * as React from 'react';
import { formatPaiseToInr } from '@ticketpass/shared';

export interface SectionStat {
  section: string;
  listingCount: number;
  lowestPricePaise: number;
  medianPricePaise: number;
  tier: 'value' | 'mid' | 'premium' | 'vip';
}

interface CricketMapProps {
  sections: SectionStat[];
  selectedSection: string | null;
  onSelectSection: (section: string | null) => void;
}

export function VenueMapCricket({ sections, selectedSection, onSelectSection }: CricketMapProps) {
  const [hoveredSection, setHoveredSection] = React.useState<SectionStat | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const statsMap = React.useMemo(() => {
    const map = new Map<string, SectionStat>();
    for (const s of sections) {
      map.set(s.section.toLowerCase(), s);
    }
    return map;
  }, [sections]);

  const stadiumStands = [
    {
      id: 'north_stand_bay_2',
      name: 'North Stand Bay 2',
      tier: 'value',
      path: 'M 220 80 A 180 180 0 0 1 380 80 L 360 120 A 140 140 0 0 0 240 120 Z',
      labelX: 300,
      labelY: 105,
    },
    {
      id: 'airasia_east_stand',
      name: 'AirAsia East Stand First Floor Bay 1',
      tier: 'premium',
      path: 'M 420 120 A 180 180 0 0 1 480 260 L 440 250 A 140 140 0 0 0 390 150 Z',
      labelX: 440,
      labelY: 190,
    },
    {
      id: 'block_k_bay_8',
      name: 'Block K Bay 8 Upper',
      tier: 'value',
      path: 'M 480 300 A 180 180 0 0 1 420 440 L 390 410 A 140 140 0 0 0 440 310 Z',
      labelX: 440,
      labelY: 370,
    },
    {
      id: 'south_west_bay_12',
      name: 'South West Stand Bay 12',
      tier: 'mid',
      path: 'M 380 480 A 180 180 0 0 1 220 480 L 240 440 A 140 140 0 0 0 360 440 Z',
      labelX: 300,
      labelY: 465,
    },
    {
      id: 'garware_lower',
      name: 'Garware Stand Lower Tier',
      tier: 'mid',
      path: 'M 180 440 A 180 180 0 0 1 120 300 L 160 310 A 140 140 0 0 0 210 410 Z',
      labelX: 160,
      labelY: 370,
    },
    {
      id: 'grand_lounge_vip',
      name: 'Grand Lounge VIP Box 4',
      tier: 'vip',
      path: 'M 120 260 A 180 180 0 0 1 180 120 L 210 150 A 140 140 0 0 0 160 250 Z',
      labelX: 160,
      labelY: 190,
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
        {/* Outfield / Pitch */}
        <circle cx="300" cy="300" r="100" fill="#0B0B0B" stroke="#3A3A3A" strokeWidth="1.5" />
        <rect x="290" y="270" width="20" height="60" rx="2" fill="#1A1A1A" stroke="#444444" strokeWidth="1" />
        <text x="300" y="305" textAnchor="middle" fill="#7A7A7A" fontSize="11" fontWeight="800" letterSpacing="0.08em">
          PITCH
        </text>

        {/* Stands */}
        {stadiumStands.map((sec) => {
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
                fontSize="10"
                fontWeight="700"
                className="pointer-events-none select-none uppercase tracking-wider"
              >
                {sec.name.length > 18 ? `${sec.name.slice(0, 16)}...` : sec.name}
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
