// apps/frontend/src/app/wishlist/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

interface SavedEvent {
  id: string;
  slug: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  doorsOpen: string;
  minPricePaise: number;
  availableListings: number;
  status: 'SELLING_FAST' | 'ALMOST_GONE' | 'DROP_LIVE';
  category: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<SavedEvent[]>([
    {
      id: 'evt-1',
      slug: 'coldplay-music-of-the-spheres-ahmedabad-2026',
      name: 'Coldplay: Music of the Spheres World Tour',
      venue: 'Narendra Modi Stadium',
      city: 'Ahmedabad',
      date: 'Jan 25, 2026',
      doorsOpen: '16:00 IST',
      minPricePaise: 650000,
      availableListings: 18,
      status: 'SELLING_FAST',
      category: 'STADIUM CONCERT',
    },
    {
      id: 'evt-2',
      slug: 'diljit-dosanjh-dil-luminati-tour-delhi-2026',
      name: 'Diljit Dosanjh: Dil-Luminati Tour',
      venue: 'Jawaharlal Nehru Stadium',
      city: 'Delhi NCR',
      date: 'Feb 14, 2026',
      doorsOpen: '17:30 IST',
      minPricePaise: 420000,
      availableListings: 6,
      status: 'ALMOST_GONE',
      category: 'ARENA TOUR',
    },
    {
      id: 'evt-3',
      slug: 'ipl-2026-srh-vs-pbks-hyderabad',
      name: 'IPL 2026: Sunrisers Hyderabad vs Punjab Kings',
      venue: 'Rajiv Gandhi International Stadium',
      city: 'Hyderabad',
      date: 'Apr 04, 2026',
      doorsOpen: '18:00 IST',
      minPricePaise: 280000,
      availableListings: 34,
      status: 'DROP_LIVE',
      category: 'CRICKET PREMIER LEAGUE',
    },
  ]);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              SAVED DROPS &bull; WATCHLIST
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            WISHLIST
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Track seat availability, instant price reductions, and gate countdowns for your bookmarked events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/alerts">
            <Button variant="secondary" size="sm">
              MANAGE PRICE ALERTS
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="primary" size="sm">
              EXPLORE ALL DROPS
            </Button>
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <div className="text-sm font-mono uppercase tracking-wider text-text-3">
            YOUR WATCHLIST IS EMPTY
          </div>
          <p className="text-sm text-text-2 max-w-md mx-auto">
            Bookmark stadium concerts, IPL matches, and world tour drops to receive immediate price alerts.
          </p>
          <Link href="/events">
            <Button variant="primary" size="sm">
              EXPLORE ACTIVE DROPS
            </Button>
          </Link>
        </div>
      ) : (
        /* Saved List Items */
        <div className="divide-y divide-line my-8 border-t border-b border-line">
          {items.map((event) => (
            <div
              key={event.id}
              className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/50 transition-colors px-2"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-volt text-black uppercase">
                    {event.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono uppercase text-text-3">
                    {event.category} &bull; {event.city}
                  </span>
                </div>

                <Link href={`/events/${event.slug}`} className="block group">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight font-display group-hover:text-volt transition-colors">
                    {event.name}
                  </h2>
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text-2">
                  <span>{event.venue}</span>
                  <span className="text-line-strong">&bull;</span>
                  <span className="font-mono">{event.date}</span>
                  <span className="text-line-strong">&bull;</span>
                  <span className="font-mono text-text-3">Doors: {event.doorsOpen}</span>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="text-left md:text-right">
                  <div className="text-[10px] font-mono uppercase text-text-3">STARTING FROM</div>
                  <div className="text-2xl font-black font-display text-text tabular-nums">
                    {formatPaise(event.minPricePaise)}
                  </div>
                  <div className="text-[11px] font-mono text-volt">
                    {event.availableListings} listings active
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/events/${event.slug}`}>
                    <Button variant="primary" size="sm">
                      VIEW DROP
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(event.id)}
                    className="p-2 text-text-3 hover:text-white transition-colors"
                    title="Remove from wishlist"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
