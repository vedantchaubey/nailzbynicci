// apps/frontend/src/app/refund-policy/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { IconClock, IconReceipt, IconShield, IconCheck, IconVerifiedSeal } from '../../components/icons';

export default function RefundPolicyPage() {
  const refundScenarios = [
    {
      scenario: 'SELLER SLA BREACH / NO-SHOW',
      timeline: 'INSTANT (< 2 HOURS)',
      details: 'If the seller does not initiate the in-app transfer within the 60-minute SLA or cancels the pending transfer in BookMyShow, the order transitions to REFUNDED automatically and your payment is routed back to your bank card/UPI source.',
    },
    {
      scenario: 'OFFICIAL EVENT CANCELLATION',
      timeline: 'AUTOMATIC BULK REFUND',
      details: 'If an event organizer or government authority officially cancels the event, all open orders are cancelled in bulk. Buyers receive 100% of their payment back, and active seller security deposits are returned without penalties or strikes.',
    },
    {
      scenario: 'EVENT RESCHEDULED OR VENUE MOVED',
      timeline: '48-HOUR REFUND WINDOW',
      details: 'When an event date or city/venue is altered by the organizers, buyers are provided a 48-hour claim window to request a full 100% refund or keep their seats for the new date.',
    },
    {
      scenario: 'DAY-OF-EVENT TURNSTILE REJECTION',
      timeline: 'PRIORITY 15-MIN SLA DESK',
      details: 'If your transferred ticket QR fails turnstile scanning through no fault of your own, tap "Entry Problem" on your order page. Turnstile desk verifies the incident and issues a complete refund under the TicketPass Buyer Guarantee.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            ESCROW DISBURSEMENT RULES
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          REFUND &amp; CANCELLATION
        </h1>
        <p className="text-base md:text-lg text-text-2 max-w-2xl leading-relaxed">
          Clear, automated refund rules backed by institutional escrow. No prolonged customer support loops.
        </p>
      </div>

      {/* Scenarios List */}
      <div className="mt-16 space-y-6">
        {refundScenarios.map((item, idx) => (
          <div
            key={idx}
            className="p-8 border border-line bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <span className="text-xs font-mono uppercase tracking-wider text-volt">
                SCENARIO {idx + 1}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight font-display text-text">
                {item.scenario}
              </h3>
              <p className="text-sm text-text-2 leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="shrink-0 text-left md:text-right border-t md:border-t-0 border-line pt-4 md:pt-0">
              <span className="text-[10px] font-mono uppercase text-text-3">SPEED</span>
              <p className="text-lg font-bold font-mono text-text mt-0.5">
                {item.timeline}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gateway Destination Strip */}
      <div className="mt-16 p-8 border border-line bg-surface-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold uppercase tracking-tight font-display">
            HOW ARE REFUNDS DISBURSED?
          </h4>
          <p className="text-xs text-text-2">
            Refunds are credited directly to your original payment source (UPI, Credit/Debit Card, NetBanking) via Razorpay. UPI credits typically reflect within 15 minutes; card credits take 2–5 business days depending on your issuing bank.
          </p>
        </div>
        <Link href="/buyer-guarantee">
          <Button variant="secondary" size="sm">
            READ BUYER GUARANTEE
          </Button>
        </Link>
      </div>
    </div>
  );
}
