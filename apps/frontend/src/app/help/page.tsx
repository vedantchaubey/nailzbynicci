// apps/frontend/src/app/help/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { IconSearch, IconArrowUpRight, IconTicket, IconShield, IconLock } from '../../components/icons';

export default function HelpCenterPage() {
  const [query, setQuery] = useState('');

  const articles = [
    {
      slug: 'how-bookmyshow-transfer-works',
      category: 'BMS_TRANSFERS',
      categoryLabel: 'BOOKMYSHOW TRANSFERS',
      title: 'How BookMyShow Ticket Transfers Work',
      summary: 'Learn why the seller needs to save your phone contact before initiating transfer.',
    },
    {
      slug: 'how-district-transfer-works',
      category: 'DISTRICT_TRANSFERS',
      categoryLabel: 'DISTRICT TRANSFERS',
      title: 'How District by Zomato Ticket Transfers Work',
      summary: 'Accepting transferred tickets in your District app and protecting against reverse transfer scams.',
    },
    {
      slug: 'buyer-escrow-guarantee-overview',
      category: 'SAFETY',
      categoryLabel: 'SAFETY & ESCROW',
      title: 'Understanding the 100% Escrow Guarantee',
      summary: 'How TicketPass locks funds in multi-sig banking escrow until turnstile verified.',
    },
    {
      slug: 'seller-security-deposit-and-payouts',
      category: 'SELLING',
      categoryLabel: 'SELLING',
      title: 'Seller 20% Security Deposit & Payouts',
      summary: 'When your deposit is refunded and how IMPS/NEFT automated payouts reach your bank.',
    },
  ];

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase()) ||
      a.categoryLabel.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            KNOWLEDGE BASE
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          HELP CENTER
        </h1>
        <p className="text-base text-text-2 max-w-xl">
          Everything you need to know about native in-app transfers, escrow guarantees, and verified live drops.
        </p>

        {/* Search Bar */}
        <div className="pt-6 max-w-md relative">
          <Input
            placeholder="SEARCH TRANSFERS, ESCROW, BOOKMYSHOW..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-16 space-y-6">
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-tight font-display">
            RECOMMENDED GUIDES ({filtered.length})
          </h3>
        </div>

        <div className="divide-y divide-line border-t border-b border-line">
          {filtered.map((art) => (
            <Link
              key={art.slug}
              href={`/help/${art.slug}`}
              className="py-6 px-4 md:px-6 hover:bg-surface transition-colors flex items-center justify-between gap-6 group block"
            >
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-volt">
                  {art.categoryLabel}
                </span>
                <h4 className="text-lg md:text-xl font-bold font-display uppercase tracking-tight group-hover:text-volt transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-text-2">
                  {art.summary}
                </p>
              </div>

              <div className="text-text-3 group-hover:text-text transition-colors">
                <IconArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Need Help with an Active Order */}
      <div className="mt-16 p-8 border border-line bg-surface-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold uppercase tracking-tight font-display">
            NEED HELP WITH AN ACTIVE ORDER?
          </h4>
          <p className="text-xs text-text-2">
            Have a ticket transfer in progress or need turnstile entry assistance? Open a support ticket with our 15-minute SLA desk.
          </p>
        </div>

        <Link href="/support">
          <Button variant="primary" size="sm">
            OPEN SUPPORT TICKET
          </Button>
        </Link>
      </div>
    </div>
  );
}
