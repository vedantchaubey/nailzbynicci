// apps/frontend/src/app/seller/analytics/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Button } from '../../../components/ui/button';

export default function SellerAnalyticsPage() {
  const metrics = [
    { label: 'LIFETIME GROSS SALES', value: '₹1,45,000', sub: '12 orders completed' },
    { label: 'NET PAYOUT RECEIVED', value: '₹1,37,750', sub: 'After 5% platform service fee' },
    { label: 'AVERAGE ESCROW RELEASE', value: '18 MIN', sub: 'Target SLA: 60 minutes' },
    { label: 'COMPLETION RATE', value: '100.0%', sub: 'Zero penalties or deposit strikes' },
  ];

  const recentPerformance = [
    { event: 'Coldplay: Music of the Spheres (Ahmedabad)', section: 'AirAsia East Stand F200-201', soldAt: '₹70,000', timeToSell: '4 mins', net: '₹66,500' },
    { event: 'IPL 2026: SRH vs PBKS (Hyderabad)', section: 'South West Stand Tier 1', soldAt: '₹45,000', timeToSell: '12 mins', net: '₹42,750' },
    { event: 'Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)', section: 'Fan Pit Gold East', soldAt: '₹30,000', timeToSell: '2 mins', net: '₹28,500' },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              SELLER PERFORMANCE INTEL
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            ANALYTICS &amp; SALES
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Real-time tracking of turnover, average transfer speed, and escrow clearance history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/seller/payouts">
            <Button variant="secondary" size="sm">
              VIEW PAYOUT STATEMENTS
            </Button>
          </Link>
          <Link href="/sell">
            <Button variant="primary" size="sm">
              LIST NEW TICKET
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-6 border border-line bg-surface space-y-2">
            <span className="text-[10px] font-mono uppercase text-text-3">{m.label}</span>
            <p className="text-2xl md:text-3xl font-black font-display text-text">{m.value}</p>
            <p className="text-xs font-mono text-text-3">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Breakdown by listing */}
      <div className="mt-12 space-y-6">
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-tight font-display">
            RECENT SALES VELOCITY
          </h3>
          <p className="text-xs text-text-3 font-mono mt-0.5">
            SPEED TO MATCH AND VERIFY ACROSS PRIMARY TICKETING PLATFORMS
          </p>
        </div>

        <div className="divide-y divide-line border-t border-b border-line">
          {recentPerformance.map((item, idx) => (
            <div
              key={idx}
              className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1 flex-1">
                <h4 className="text-base font-bold font-display uppercase tracking-tight text-text">
                  {item.event}
                </h4>
                <p className="text-xs font-mono text-text-3">
                  {item.section} · Sold in <strong className="text-volt">{item.timeToSell}</strong>
                </p>
              </div>

              <div className="text-left md:text-right font-mono">
                <span className="text-[10px] text-text-3 uppercase">NET DISBURSED</span>
                <p className="text-lg font-bold text-volt tabular-nums">{item.net}</p>
                <p className="text-[10px] text-text-3">Gross: {item.soldAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
