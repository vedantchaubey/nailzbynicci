// apps/frontend/src/app/about/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { IconShield, IconLock, IconCheck, IconVerifiedSeal } from '../../components/icons';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            PROTOCOL MISSION
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          ABOUT TICKETPASS
        </h1>
        <p className="text-base md:text-lg text-text-2 max-w-2xl leading-relaxed">
          The non-custodial verification protocol ending ticket scalping scams in India.
        </p>
      </div>

      <div className="mt-12 space-y-12 text-text-2 text-sm leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight font-display text-text">
            WHY TICKETPASS EXISTS
          </h2>
          <p>
            Secondary ticketing in India has long been plagued by fake PDF barcodes, photoshopped booking screenshots, and disappearing social media sellers. Event organizers reject static QR codes at turnstiles with zero exceptions.
          </p>
          <p>
            TicketPass solves this fundamentally by never hosting tickets. Instead, all ticket reassignments occur natively inside the official BookMyShow or District apps, while TicketPass coordinates multi-sig financial escrow and mathematical proof of receipt.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 border border-line bg-surface space-y-2">
            <span className="text-2xl font-black font-display text-volt">100%</span>
            <p className="text-xs font-mono text-text uppercase">BANK ESCROW SECURED</p>
            <p className="text-xs text-text-3">Seller receives zero payout until turnstile verified</p>
          </div>
          <div className="p-6 border border-line bg-surface space-y-2">
            <span className="text-2xl font-black font-display text-volt">60 MIN</span>
            <p className="text-xs font-mono text-text uppercase">STRICT TRANSFER SLA</p>
            <p className="text-xs text-text-3">Auto-refund on seller no-shows</p>
          </div>
          <div className="p-6 border border-line bg-surface space-y-2">
            <span className="text-2xl font-black font-display text-volt">DPDP</span>
            <p className="text-xs font-mono text-text uppercase">GOVERNMENT KYC</p>
            <p className="text-xs text-text-3">DigiLocker verified real human buyers and sellers</p>
          </div>
        </section>
      </div>
    </div>
  );
}
