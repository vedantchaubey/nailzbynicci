// apps/frontend/src/app/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { Button } from '../components/ui/button';
import { Chip } from '../components/ui/chip';
import { EventCard } from '../components/ui/event-card';
import { CountdownBlock } from '../components/ui/countdown-block';
import { EventCardSkeleton } from '../components/ui/shape-skeletons';
import {
  TicketIcon,
  ShieldIcon,
  TransferArrowsIcon,
  LockIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
} from '../components/icons/index';

interface EventItem {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  imageUrl: string;
  category: string;
  platform: 'BOOKMYSHOW' | 'DISTRICT';
  listingCount: number;
  lowestPricePaise: number | null;
}

interface EventsResponse {
  items: EventItem[];
  total: number;
}

const CITIES = ['ALL CITIES', 'MUMBAI', 'DELHI', 'BENGALURU', 'HYDERABAD', 'GOA', 'AHMEDABAD'];

export default function NikeStyleLandingPage() {
  const [selectedCity, setSelectedCity] = React.useState('ALL CITIES');

  const { data, isLoading } = useQuery<EventsResponse>({
    queryKey: ['events-home', selectedCity],
    queryFn: async () => {
      const url = selectedCity !== 'ALL CITIES' ? `/events?city=${selectedCity}` : '/events';
      const res = await apiClient.get<EventsResponse>(url);
      return res.data;
    },
  });

  const events = data?.items || [];
  const trendingEvents = events.slice(0, 4);
  const startingSoonEvents = events.slice(4, 8).length > 0 ? events.slice(4, 8) : events.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text select-none">
      {/* 1. FULL-BLEED 100svh HERO */}
      <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-end overflow-hidden pb-16 md:pb-24 px-6 md:px-12">
        {/* Background Crowd Photography with Scrim */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=85"
            alt="Stadium crowd floodlights"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-100 transition-transform duration-1000 ease-nike"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Content Stacking */}
        <div className="relative z-10 max-w-content mx-auto w-full flex flex-col items-start gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
            <span className="text-[12px] font-bold uppercase tracking-widest text-volt">
              VERIFIED RESALE MARKETPLACE
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="type-hero text-white tracking-tighter">
              GET IN.
            </h1>
            <p className="type-section-title text-text-2 tracking-tight mt-1">
              NO SCALPERS. JUST SEATS.
            </p>
          </div>

          <p className="max-w-md text-[16px] text-text-2 leading-relaxed">
            Tickets transfer natively in your BookMyShow and District apps. Funds stay locked in automated escrow until ownership is verified.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link href="/events/browse">
              <Button size="lg" variant="primary" className="font-bold">
                BROWSE DROPS
              </Button>
            </Link>

            <Link href="/sell">
              <Button size="lg" variant="secondary" className="font-bold">
                SELL A TICKET
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Dropping Soon Ticker Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/90 border-t border-line flex items-center px-6 overflow-hidden">
          <div className="flex items-center gap-8 text-[11px] font-mono uppercase tracking-widest text-text-2 animate-pulse whitespace-nowrap">
            <span className="flex items-center gap-2 text-volt font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-volt" />
              LIVE TICKER
            </span>
            <span>·</span>
            <span>COLDPLAY MUMBAI: 4 SEATS LEFT</span>
            <span>·</span>
            <span>DILJIT DELHI: 2 SEATS LEFT</span>
            <span>·</span>
            <span>SUNBURN GOA: SELLING FAST</span>
            <span>·</span>
            <span>100% ESCROW HOLD UNTIL APP CONFIRMATION</span>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL CITY FILTER CHIPS */}
      <section className="sticky top-[64px] z-30 w-full bg-bg/95 backdrop-blur-md border-b border-line py-3 px-6 md:px-12">
        <div className="max-w-content mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CITIES.map((city) => (
            <Chip
              key={city}
              variant="filter"
              active={selectedCity === city}
              onSelect={() => setSelectedCity(city)}
              className="shrink-0"
            >
              {city}
            </Chip>
          ))}
        </div>
      </section>

      {/* 3. TRENDING NOW SNAP RAIL */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 max-w-content mx-auto flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              CURATED DROPS
            </span>
            <h2 className="type-section-title text-white mt-1">
              TRENDING NOW
            </h2>
          </div>

          <Link href="/events/browse" className="hidden sm:flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider text-text-2 hover:text-white transition-colors">
            <span>SEE ALL ({events.length})</span>
            <ChevronRightIcon size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <EventCardSkeleton aspectRatio="4:5" />
            <EventCardSkeleton aspectRatio="4:5" />
            <EventCardSkeleton aspectRatio="4:5" />
            <EventCardSkeleton aspectRatio="4:5" />
          </div>
        ) : (
          <div className="snap-rail gap-6 pb-4">
            {trendingEvents.map((evt) => (
              <div key={evt.id} className="snap-card w-[280px] sm:w-[320px] md:w-[340px]">
                <EventCard
                  id={evt.id}
                  name={evt.name}
                  venue={evt.venue}
                  city={evt.city}
                  date={evt.date}
                  imageUrl={evt.imageUrl}
                  platform={evt.platform}
                  listingCount={evt.listingCount}
                  lowestPricePaise={evt.lowestPricePaise}
                  aspectRatio="4:5"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. HOW IT WORKS (Giant Numerals 01–04) */}
      <section className="w-full bg-surface border-y border-line py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-content mx-auto flex flex-col gap-16">
          <div className="flex flex-col">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              TRANSFER PROTOCOL
            </span>
            <h2 className="type-section-title text-white mt-1">
              HOW IT WORKS
            </h2>
            <p className="text-text-2 text-[15px] max-w-xl mt-2">
              Tickets NEVER live on TicketPass. Transfers happen natively inside BookMyShow and District. We hold the money until your ticket is in your hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="text-6xl md:text-7xl font-black font-display text-volt">
                01
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                LOCK IN ESCROW
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                Choose your seat. Your payment is held securely in TicketPass escrow. The seller cannot touch the money.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="text-6xl md:text-7xl font-black font-display text-white">
                02
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                IN-APP TRANSFER
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                The seller initiates an official in-app ticket transfer directly to your mobile number in BookMyShow or District.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="text-6xl md:text-7xl font-black font-display text-white">
                03
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                CONFIDENCE ENGINE
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                Our multi-signal verification engine checks booking references, OCR evidence, phone numbers, and DigiLocker KYC.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-6">
              <span className="text-6xl md:text-7xl font-black font-display text-white">
                04
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                PAYOUT RELEASED
              </h3>
              <p className="text-text-2 text-[14px] leading-relaxed">
                You confirm receipt and a brand new in-app M-Ticket is generated for you. Only then is the seller paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STARTING SOON COUNTDOWN RAIL */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 max-w-content mx-auto flex flex-col gap-8">
        <div className="flex flex-col">
          <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
            CLOCK IS TICKING
          </span>
          <h2 className="type-section-title text-white mt-1">
            STARTING SOON
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startingSoonEvents.map((evt) => (
            <div key={evt.id} className="p-6 rounded-[8px] bg-surface border border-line flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-volt">
                    {evt.city} · {evt.platform}
                  </span>
                  <Chip variant="live" pulse>ACTIVE DROP</Chip>
                </div>

                <h3 className="text-xl font-black font-display uppercase tracking-tight text-white line-clamp-1">
                  {evt.name}
                </h3>
              </div>

              <CountdownBlock
                targetDate={evt.date}
                label="TRANSFER WINDOW CLOSES IN"
                size="md"
              />

              <Link href={`/events/${evt.id}`}>
                <Button size="md" variant="secondary" className="w-full font-bold">
                  VIEW AVAILABLE SEATS
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SELL YOUR SEAT FULL-BLEED BAND */}
      <section className="w-full bg-surface-2 border-t border-line py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              CAN’T MAKE IT?
            </span>
            <h2 className="type-section-title text-white mt-1">
              SELL YOUR SEAT. GET PAID INSTANTLY.
            </h2>
            <p className="text-text-2 text-[15px] max-w-lg mt-2">
              List in 60 seconds with verified booking reference. Transfer natively when sold and get paid straight to your bank account via UPI.
            </p>
          </div>

          <Link href="/sell">
            <Button size="lg" variant="primary" className="font-bold whitespace-nowrap">
              LIST MY TICKET
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
