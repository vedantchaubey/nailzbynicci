// apps/frontend/src/app/terms/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            LEGAL FRAMEWORK
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          TERMS OF SERVICE
        </h1>
        <p className="text-xs font-mono text-text-3">
          VERSION 1.0.0 · LAST UPDATED: NOVEMBER 2026 · APPLICABLE TO ALL USERS IN INDIA
        </p>
      </div>

      {/* Legal Content */}
      <div className="mt-12 space-y-12 text-text-2 text-sm leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            1. THE TICKETPASS PROTOCOL &amp; NON-CUSTODIAL ROLE
          </h2>
          <p>
            TicketPass operates as a technology coordination protocol and escrow facilitation layer for secondary live event ticket transfers across India. 
          </p>
          <div className="p-4 border border-line bg-surface text-text font-mono text-xs">
            IMPORTANT: TICKETPASS DOES NOT HOST, ISSUE, GENERATE, PRINT, OR STORE TICKETS. TICKETS NEVER RESIDE ON TICKETPASS SERVERS.
          </div>
          <p>
            All legal ownership reassignments and access rights transfers occur exclusively inside the official mobile applications of primary ticketing partners (specifically BookMyShow and District by Zomato Limited).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            2. USER ELIGIBILITY &amp; MANDATORY GOVERNMENT KYC
          </h2>
          <p>
            In accordance with Indian law and prevention of multi-accounting or fraudulent scalping syndicates, all buyers and sellers must complete user-consented DigiLocker government identity verification prior to activating listings or completing checkout.
          </p>
          <p>
            Users under 18 years of age are prohibited from acting as commercial sellers. TicketPass retains only a salted cryptographic SHA-256 fingerprint of identity metadata in strict accordance with the Digital Personal Data Protection Act, 2023.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            3. ESCROW CUSTODY &amp; DISBURSEMENT
          </h2>
          <p>
            Buyer funds are held in multi-sig banking escrow throughout the transaction lifecycle. Funds are released to the seller only upon verified transfer receipt or refunded to the buyer under our Buyer Guarantee.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display text-text">
            4. SELLER TRANSFER COMMITMENT &amp; 20% DEPOSIT
          </h2>
          <p>
            Sellers place a 20% refundable security deposit during listing activation. The deposit is refunded immediately upon verified buyer delivery. Sellers who no-show, recall transfers, or commit fraud permanently forfeit the deposit.
          </p>
        </section>
      </div>
    </div>
  );
}
