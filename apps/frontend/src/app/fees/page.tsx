// apps/frontend/src/app/fees/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatPaiseToInr, calculateOrderFees, calculateGst } from '@ticketpass/shared';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { IconReceipt, IconLock, IconCheck, IconVerifiedSeal } from '../../components/icons';

export default function FeesPage() {
  const [calcRupees, setCalcRupees] = useState(5000);
  const samplePricePaise = Math.max(0, calcRupees * 100);
  const fees = calculateOrderFees(samplePricePaise);
  const gst = calculateGst(fees.buyerFeePaise, false);

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            PRICING ARCHITECTURE
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          TRANSPARENT FEES
        </h1>
        <p className="text-base md:text-lg text-text-2 max-w-2xl leading-relaxed">
          Zero hidden costs. Flat 5% platform take-rate powering multi-sig bank escrow and autonomous ticket verification.
        </p>
      </div>

      {/* Grid of Fee Rules */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 border border-line bg-surface space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-text-3">
            BUYER FEE
          </span>
          <p className="text-4xl font-black font-display text-text">
            5.0%
          </p>
          <p className="text-xs text-text-2 leading-relaxed">
            Covers payment gateway gateway processing, multi-sig escrow custody, and the 100% TicketPass Buyer Guarantee. Minimum fee: ₹50.
          </p>
        </div>

        <div className="p-8 border border-line bg-surface space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-text-3">
            SELLER FEE
          </span>
          <p className="text-4xl font-black font-display text-text">
            5.0%
          </p>
          <p className="text-xs text-text-2 leading-relaxed">
            Deducted from gross resale payout. Covers automated IMPS/NEFT bank disbursement and anti-fraud reputation scoring.
          </p>
        </div>

        <div className="p-8 border border-line bg-surface space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-volt">
            SELLER SECURITY DEPOSIT
          </span>
          <p className="text-4xl font-black font-display text-volt">
            20.0%
          </p>
          <p className="text-xs text-text-2 leading-relaxed">
            Temporary refundable hold placed during listing activation. 100% refunded immediately once the buyer receives tickets in BookMyShow or District.
          </p>
        </div>
      </div>

      {/* Interactive Fee Calculator */}
      <div className="mt-16 p-8 border border-line bg-surface space-y-8">
        <div>
          <h3 className="text-2xl font-bold uppercase tracking-tight font-display">
            FEE SIMULATOR
          </h3>
          <p className="text-xs text-text-3 font-mono mt-1">
            ENTER A TICKET RESALE PRICE TO SEE THE PRECISE INTEGER PAISE BREAKDOWN
          </p>
        </div>

        <div className="max-w-xs space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-wider text-text-3">
            TICKET PRICE (₹)
          </label>
          <Input
            type="number"
            value={calcRupees}
            onChange={(e) => setCalcRupees(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="5000"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-line">
          <div>
            <span className="text-[10px] font-mono uppercase text-text-3">BUYER PAYS</span>
            <p className="text-2xl font-bold font-mono tabular-nums text-text mt-1">
              {formatPaiseToInr(fees.totalBuyerPaysPaise)}
            </p>
            <span className="text-[10px] font-mono text-text-3">
              incl. 5% fee ({formatPaiseToInr(fees.buyerFeePaise)})
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-text-3">SELLER RECEIVES</span>
            <p className="text-2xl font-bold font-mono tabular-nums text-volt mt-1">
              {formatPaiseToInr(fees.sellerReceivesPaise)}
            </p>
            <span className="text-[10px] font-mono text-text-3">
              after 5% fee ({formatPaiseToInr(fees.sellerFeePaise)})
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-text-3">DEPOSIT REQUIRED</span>
            <p className="text-2xl font-bold font-mono tabular-nums text-text mt-1">
              {formatPaiseToInr(fees.securityDepositPaise)}
            </p>
            <span className="text-[10px] font-mono text-text-3">
              100% refunded post-transfer
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-text-3">GST (18% ON FEE)</span>
            <p className="text-2xl font-bold font-mono tabular-nums text-text mt-1">
              {formatPaiseToInr(gst.totalGstPaise)}
            </p>
            <span className="text-[10px] font-mono text-text-3">
              SAC 998599 Tax Invoice generated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
