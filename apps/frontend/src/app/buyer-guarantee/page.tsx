// apps/frontend/src/app/buyer-guarantee/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Chip } from '../../components/ui/chip';
import {
  IconShield,
  IconLock,
  IconClock,
  IconCheck,
  IconArrowUpRight,
  IconVerifiedSeal,
} from '../../components/icons';

export default function BuyerGuaranteePage() {
  const guaranteePillars = [
    {
      step: '01',
      title: 'ESCROW LOCKED FUNDS',
      desc: 'When you purchase a ticket, 100% of your payment is held securely in institutional bank escrow. The seller never touches your funds until valid ticket delivery is confirmed.',
    },
    {
      step: '02',
      title: '60-MINUTE SELLER SLA',
      desc: 'Sellers must initiate native in-app transfer within BookMyShow or District within 60 minutes. If the seller no-shows or misses the transfer window, your funds are automatically refunded in full.',
    },
    {
      step: '03',
      title: 'NO CANCELLED REQUESTS',
      desc: 'In BookMyShow, if a seller recalls or cancels the pending transfer before you accept, our verification engine detects the cancellation instantly and triggers a complete auto-refund with seller penalties.',
    },
    {
      step: '04',
      title: 'DAY-OF-EVENT TURNSTILE PROTECTION',
      desc: 'Should entry be denied due to ticket invalidity through no fault of your own, tap the "Entry Problem" button within 3 hours of event start for an immediate priority investigation backed by our Platform Reserve Fund.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Top Banner / Scrim */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            TICKETPASS ASSURANCE
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          100% BUYER GUARANTEE
        </h1>
        <p className="text-base md:text-lg text-text-2 max-w-2xl leading-relaxed">
          Every ticket purchase is legally guaranteed. Real seats natively transferred inside BookMyShow and District, or your money back in full.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {guaranteePillars.map((pillar) => (
          <div
            key={pillar.step}
            className="p-8 border border-line bg-surface flex flex-col justify-between gap-6"
          >
            <div className="space-y-3">
              <span className="text-3xl font-black font-display text-text-3 font-mono">
                {pillar.step}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight font-display text-text">
                {pillar.title}
              </h3>
              <p className="text-sm text-text-2 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-volt">
              <IconCheck size={14} />
              <span>GUARANTEED ESCROW BACKED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Reserve Fund Callout */}
      <div className="mt-16 p-8 border border-line bg-surface-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-volt">
            <IconVerifiedSeal size={28} />
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase tracking-tight font-display">
              SEGREGATED PLATFORM RESERVE FUND
            </h4>
            <p className="text-xs font-mono text-text-3">
              ₹5,00,000 BASELINE ESCROW SOLVENCY BUFFER
            </p>
          </div>
        </div>
        <p className="text-sm text-text-2 max-w-3xl leading-relaxed">
          To ensure 100% solvency even in disputed cases, TicketPass maintains a segregated institutional reserve fund fed by seller security deposits and platform earnings. Verified claims are paid immediately without waiting for seller recovery.
        </p>
        <div className="pt-2 flex items-center gap-4">
          <Link href="/events/browse">
            <Button variant="primary" size="sm">
              BROWSE VERIFIED DROPS
            </Button>
          </Link>
          <Link href="/refund-policy">
            <Button variant="secondary" size="sm">
              VIEW REFUND TIMELINES
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
