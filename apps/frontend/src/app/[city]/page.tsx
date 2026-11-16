// apps/frontend/src/app/[city]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

interface CityEvent {
  id: string;
  slug: string;
  name: string;
  venue: string;
  date: string;
  doorsOpen: string;
  minPricePaise: number;
  availableListings: number;
  category: 'CONCERTS' | 'CRICKET' | 'FESTIVALS';
  status: 'SELLING_FAST' | 'ALMOST_GONE' | 'DROP_LIVE';
}

const CITY_DATA: Record<string, { title: string; tagline: string; defaultVenues: string[] }> = {
  mumbai: {
    title: 'MUMBAI',
    tagline: 'Wankhede Stadium, DY Patil Stadium & Mahalaxmi Racecourse',
    defaultVenues: ['Wankhede Stadium', 'DY Patil Stadium', 'Jio World Convention Centre'],
  },
  delhi: {
    title: 'DELHI NCR',
    tagline: 'Jawaharlal Nehru Stadium, Arun Jaitley Stadium & Indira Gandhi Arena',
    defaultVenues: ['Jawaharlal Nehru Stadium', 'Arun Jaitley Stadium', 'Indira Gandhi Arena'],
  },
  bengaluru: {
    title: 'BENGALURU',
    tagline: 'M. Chinnaswamy Stadium, Manpho Convention Centre & Jayamahal',
    defaultVenues: ['M. Chinnaswamy Stadium', 'Manpho Grounds', 'Kanteerava Stadium'],
  },
  ahmedabad: {
    title: 'AHMEDABAD',
    tagline: 'Narendra Modi Stadium & Sardar Patel Enclave',
    defaultVenues: ['Narendra Modi Stadium', 'The Arena by TransStadia'],
  },
  hyderabad: {
    title: 'HYDERABAD',
    tagline: 'Rajiv Gandhi International Cricket Stadium & Gachibowli Stadium',
    defaultVenues: ['Rajiv Gandhi Stadium', 'Gachibowli Indoor Stadium'],
  },
  chennai: {
    title: 'CHENNAI',
    tagline: 'M.A. Chidambaram Stadium (Chepauk) & Nehru Stadium',
    defaultVenues: ['M.A. Chidambaram Stadium', 'Jawaharlal Nehru Stadium'],
  },
  kolkata: {
    title: 'KOLKATA',
    tagline: 'Eden Gardens, Salt Lake Stadium & Biswa Bangla Mela Prangan',
    defaultVenues: ['Eden Gardens', 'Salt Lake Stadium'],
  },
  pune: {
    title: 'PUNE',
    tagline: 'MCA Stadium Gahunje & Balewadi Sports Complex',
    defaultVenues: ['MCA Stadium Gahunje', 'Shree Shiv Chhatrapati Sports Complex'],
  },
};

export default function CityPage() {
  const params = useParams();
  const rawCity = (params?.city as string) || 'mumbai';
  const cityKey = rawCity.toLowerCase().replace(/[^a-z]/g, '');
  const cityInfo = CITY_DATA[cityKey] || {
    title: rawCity.toUpperCase(),
    tagline: 'Live Stadium & Arena Drops in your metro hub',
    defaultVenues: ['Metro Stadiums', 'Arena Grounds'],
  };

  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const events: CityEvent[] = [
    {
      id: 'evt-1',
      slug: 'coldplay-music-of-the-spheres-ahmedabad-2026',
      name: 'Coldplay: Music of the Spheres World Tour',
      venue: 'Narendra Modi Stadium',
      date: 'Jan 25, 2026',
      doorsOpen: '16:00 IST',
      minPricePaise: 650000,
      availableListings: 18,
      category: 'CONCERTS',
      status: 'SELLING_FAST',
    },
    {
      id: 'evt-2',
      slug: 'diljit-dosanjh-dil-luminati-tour-delhi-2026',
      name: 'Diljit Dosanjh: Dil-Luminati Tour',
      venue: 'JLN Stadium',
      date: 'Feb 14, 2026',
      doorsOpen: '17:30 IST',
      minPricePaise: 420000,
      availableListings: 6,
      category: 'CONCERTS',
      status: 'ALMOST_GONE',
    },
    {
      id: 'evt-3',
      slug: 'ipl-2026-srh-vs-pbks-hyderabad',
      name: 'IPL 2026: Sunrisers Hyderabad vs Punjab Kings',
      venue: 'Rajiv Gandhi Stadium',
      date: 'Apr 04, 2026',
      doorsOpen: '18:00 IST',
      minPricePaise: 280000,
      availableListings: 34,
      category: 'CRICKET',
      status: 'DROP_LIVE',
    },
    {
      id: 'evt-4',
      slug: 'lollapalooza-india-mumbai-2026',
      name: 'Lollapalooza India 2026 &bull; Multi-Stage Weekend',
      venue: 'Mahalaxmi Racecourse',
      date: 'Mar 07, 2026',
      doorsOpen: '13:00 IST',
      minPricePaise: 950000,
      availableListings: 42,
      category: 'FESTIVALS',
      status: 'DROP_LIVE',
    },
  ];

  const filteredEvents = events.filter((e) =>
    activeCategory === 'ALL' ? true : e.category === activeCategory
  );

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* City Hero */}
      <div className="space-y-4 pb-12 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs font-mono uppercase tracking-widest text-text-3">
            METRO DROP HUB &bull; STADIUM ACCESS
          </span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tight font-display leading-none text-text">
          {cityInfo.title}
        </h1>

        <p className="text-base text-text-2 max-w-2xl">
          {cityInfo.tagline}. Every ticket transferred non-custodially in BookMyShow or District with 100% money-back escrow guarantee.
        </p>

        {/* Venues Pill Rail */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {cityInfo.defaultVenues.map((v) => (
            <span
              key={v}
              className="text-xs font-mono px-3 py-1 bg-surface border border-line text-text-2 rounded-full"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Filter Rail */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'CONCERTS', 'CRICKET', 'FESTIVALS'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-text text-black font-bold'
                  : 'bg-surface text-text-3 hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-text-3">
          SHOWING {filteredEvents.length} VERIFIED DROPS
        </div>
      </div>

      {/* Events Rail */}
      <div className="divide-y divide-line border-t border-b border-line">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface/40 transition-colors px-2"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-volt text-black uppercase">
                  {evt.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono uppercase text-text-3">
                  {evt.category}
                </span>
              </div>

              <Link href={`/events/${evt.slug}`} className="block group">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-display group-hover:text-volt transition-colors">
                  {evt.name}
                </h2>
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-xs text-text-2">
                <span>{evt.venue}</span>
                <span className="text-line-strong">&bull;</span>
                <span className="font-mono">{evt.date}</span>
                <span className="text-line-strong">&bull;</span>
                <span className="font-mono text-text-3">Doors: {evt.doorsOpen}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between md:justify-end gap-6">
              <div className="text-left md:text-right">
                <div className="text-[10px] font-mono uppercase text-text-3">PASSES FROM</div>
                <div className="text-3xl font-black font-display text-text tabular-nums">
                  {formatPaise(evt.minPricePaise)}
                </div>
                <div className="text-[11px] font-mono text-volt">
                  {evt.availableListings} seats verified in escrow
                </div>
              </div>

              <Link href={`/events/${evt.slug}`}>
                <Button variant="primary" size="md">
                  GET TICKETS
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
