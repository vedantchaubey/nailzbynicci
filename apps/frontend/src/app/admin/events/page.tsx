// apps/frontend/src/app/admin/events/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface EventItem {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  activeListings: number;
  minPrice: string;
  hasVenueMap: boolean;
  status: 'ACTIVE' | 'DRAFT' | 'COMPLETED';
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'evt-cp-amd-2026',
      name: 'Coldplay: Music of the Spheres World Tour',
      venue: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      date: '2026-01-25 18:00',
      platform: 'BOOKMYSHOW',
      activeListings: 18,
      minPrice: '₹6,500',
      hasVenueMap: true,
      status: 'ACTIVE',
    },
    {
      id: 'evt-diljit-del-2026',
      name: 'Diljit Dosanjh: Dil-Luminati Tour',
      venue: 'Jawaharlal Nehru Stadium',
      city: 'Delhi NCR',
      date: '2026-02-14 19:00',
      platform: 'DISTRICT',
      activeListings: 6,
      minPrice: '₹4,200',
      hasVenueMap: true,
      status: 'ACTIVE',
    },
    {
      id: 'evt-ipl-srh-pbks-2026',
      name: 'IPL 2026: Sunrisers Hyderabad vs Punjab Kings',
      venue: 'Rajiv Gandhi International Stadium',
      city: 'Hyderabad',
      date: '2026-04-04 19:30',
      platform: 'BOOKMYSHOW',
      activeListings: 34,
      minPrice: '₹2,800',
      hasVenueMap: true,
      status: 'ACTIVE',
    },
    {
      id: 'evt-wpl-rcb-mi-2026',
      name: 'WPL 2026: Royal Challengers Bengaluru vs Mumbai Indians',
      venue: 'M. Chinnaswamy Stadium',
      city: 'Bengaluru',
      date: '2026-03-12 19:30',
      platform: 'BOOKMYSHOW',
      activeListings: 12,
      minPrice: '₹1,500',
      hasVenueMap: false,
      status: 'ACTIVE',
    },
  ]);

  const [isEditingMap, setIsEditingMap] = useState(false);
  const [selectedEventForMap, setSelectedEventForMap] = useState<EventItem | null>(null);

  const handleOpenMapEditor = (event: EventItem) => {
    setSelectedEventForMap(event);
    setIsEditingMap(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              CATALOG GOVERNANCE &bull; STADIUM TOPOLOGY
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            EVENTS &amp; VENUES
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Ingest official tour dates, configure non-custodial transfer endpoints (BookMyShow / District), and map SVG stadium section coordinates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            IMPORT EVENTS CSV
          </Button>
          <Button variant="primary" size="sm">
            CREATE NEW EVENT
          </Button>
        </div>
      </div>

      {/* Metrics Rail */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface border border-line">
          <div className="text-[11px] font-mono uppercase text-text-3">ACTIVE EVENTS</div>
          <div className="text-2xl font-black font-display text-text tabular-nums">4</div>
        </div>
        <div className="p-4 bg-surface border border-line">
          <div className="text-[11px] font-mono uppercase text-text-3">MAPPED STADIUMS</div>
          <div className="text-2xl font-black font-display text-volt tabular-nums">3</div>
        </div>
        <div className="p-4 bg-surface border border-line">
          <div className="text-[11px] font-mono uppercase text-text-3">ACTIVE SEATS LISTED</div>
          <div className="text-2xl font-black font-display text-text tabular-nums">70</div>
        </div>
        <div className="p-4 bg-surface border border-line">
          <div className="text-[11px] font-mono uppercase text-text-3">BOOKMYSHOW / DISTRICT</div>
          <div className="text-2xl font-black font-display text-text tabular-nums">3 / 1</div>
        </div>
      </div>

      {/* Table of Events */}
      <div className="space-y-4">
        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">EVENT NAME &amp; ID</th>
                <th className="py-3 px-4">VENUE &amp; CITY</th>
                <th className="py-3 px-4">DATE &amp; TIME</th>
                <th className="py-3 px-4">PLATFORM</th>
                <th className="py-3 px-4 text-right">INVENTORY</th>
                <th className="py-3 px-4 text-center">VENUE MAP</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-bold text-text">
                    {evt.name}
                    <div className="text-[10px] font-mono text-text-3 font-normal">{evt.id}</div>
                  </td>
                  <td className="py-4 px-4 text-xs text-text-2">
                    {evt.venue}
                    <div className="text-text-3">{evt.city}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3 whitespace-nowrap">
                    {evt.date}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface-2 border border-line text-text">
                      {evt.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-xs">
                    <div className="font-bold text-text">{evt.activeListings} listings</div>
                    <div className="text-text-3">from {evt.minPrice}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {evt.hasVenueMap ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-volt text-black uppercase">
                        SVG ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-text-3 border border-line px-2 py-0.5 rounded-full">
                        NO MAP
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMapEditor(evt)}
                      className="text-xs font-mono text-volt hover:underline uppercase"
                    >
                      EDIT MAP
                    </button>
                    <button
                      type="button"
                      className="text-xs font-mono text-text-3 hover:text-white uppercase"
                    >
                      DETAILS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SVG Venue Map Modal / Drawer */}
      {isEditingMap && selectedEventForMap && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-surface border border-line max-w-3xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-volt">
                  INTERACTIVE STADIUM TOPOLOGY EDITOR
                </div>
                <h2 className="text-xl font-bold uppercase font-display text-text">
                  {selectedEventForMap.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingMap(false)}
                className="text-text-3 hover:text-text font-mono text-sm"
              >
                [ESC CLOSE]
              </button>
            </div>

            {/* SVG Stadium Map Mock Visualizer */}
            <div className="p-8 bg-black border border-line flex flex-col items-center justify-center space-y-4">
              <div className="text-xs font-mono text-text-3">
                NARENDRA MODI STADIUM &bull; INTERACTIVE SEAT TOPOLOGY (360&deg; BOWL)
              </div>
              <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
                {/* Field */}
                <ellipse cx="200" cy="150" rx="90" ry="60" fill="#152815" stroke="#262626" strokeWidth="2" />
                <text x="200" y="155" fill="#C8FF00" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  FIELD / STAGE
                </text>
                {/* North Stand */}
                <path d="M 120 70 Q 200 40 280 70 L 290 50 Q 200 20 110 50 Z" fill="#222" stroke="#444" className="hover:fill-volt cursor-pointer transition-colors" />
                {/* South Stand */}
                <path d="M 120 230 Q 200 260 280 230 L 290 250 Q 200 280 110 250 Z" fill="#222" stroke="#444" className="hover:fill-volt cursor-pointer transition-colors" />
                {/* West Tier */}
                <path d="M 80 100 Q 60 150 80 200 L 60 210 Q 40 150 60 90 Z" fill="#222" stroke="#444" className="hover:fill-volt cursor-pointer transition-colors" />
                {/* East Tier */}
                <path d="M 320 100 Q 340 150 320 200 L 340 210 Q 360 150 340 90 Z" fill="#222" stroke="#444" className="hover:fill-volt cursor-pointer transition-colors" />
              </svg>
              <div className="text-[11px] font-mono text-text-3">
                Hover over stands to verify Section 23.9 polygon coordinate mapping.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setIsEditingMap(false)}>
                CANCEL
              </Button>
              <Button variant="primary" size="sm" onClick={() => setIsEditingMap(false)}>
                SAVE STADIUM GEOMETRY
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
