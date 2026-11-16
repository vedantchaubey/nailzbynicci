// apps/frontend/src/app/admin/fees/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface FeeHistory {
  id: string;
  sellerFeeBps: number;
  buyerFeeBps: number;
  maxMarkupBps: number;
  gstRateBps: number;
  effectiveFrom: string;
  changedBy: string;
}

export default function AdminFeesPage() {
  const [sellerFeeBps, setSellerFeeBps] = useState(500); // 5%
  const [buyerFeeBps, setBuyerFeeBps] = useState(250);   // 2.5%
  const [maxMarkupBps, setMaxMarkupBps] = useState(2000); // 20%
  const [simPriceInr, setSimPriceInr] = useState(10000);

  const history: FeeHistory[] = [
    {
      id: 'FEE-CFG-002',
      sellerFeeBps: 500,
      buyerFeeBps: 250,
      maxMarkupBps: 2000,
      gstRateBps: 1800,
      effectiveFrom: '2026-10-22 00:00',
      changedBy: 'admin@ticketpass.dev',
    },
    {
      id: 'FEE-CFG-001',
      sellerFeeBps: 600,
      buyerFeeBps: 300,
      maxMarkupBps: 2500,
      gstRateBps: 1800,
      effectiveFrom: '2026-09-01 00:00',
      changedBy: 'superadmin@ticketpass.dev',
    },
  ];

  // Simulation calculations
  const pricePaise = simPriceInr * 100;
  const buyerFeePaise = Math.round((pricePaise * buyerFeeBps) / 10000);
  const gstPaise = Math.round((buyerFeePaise * 1800) / 10000);
  const buyerTotalPaise = pricePaise + buyerFeePaise + gstPaise;

  const sellerFeePaise = Math.round((pricePaise * sellerFeeBps) / 10000);
  const sellerNetPaise = pricePaise - sellerFeePaise;
  const platformRevenuePaise = buyerFeePaise + sellerFeePaise;

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  const handleSaveFeeConfig = () => {
    alert('Fee configuration updated and applied to next marketplace checkout transactions.');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              REVENUE ENGINE &bull; FAIR RESALE GUARDRAILS
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            PLATFORM FEES &amp; MARKUP CAPS
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Configure platform service commission, statutory 18% GST SAC 998599 calculation, and the +20% maximum markup cap against box office face value.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSaveFeeConfig}>
          SAVE &amp; APPLY CONFIGURATION
        </Button>
      </div>

      {/* Fee Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-surface border border-line space-y-4">
          <label className="block text-xs font-mono uppercase text-text-3">
            SELLER SERVICE FEE
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={sellerFeeBps / 100}
              onChange={(e) => setSellerFeeBps(Math.round(parseFloat(e.target.value) * 100))}
              step="0.1"
              className="w-24 bg-surface-2 border border-line text-text px-3 py-2 text-xl font-bold font-mono focus:outline-none focus:border-volt"
            />
            <span className="font-mono text-sm text-text-2">% of resale price</span>
          </div>
          <p className="text-xs text-text-3">Deducted from gross payout upon buyer gate scan.</p>
        </div>

        <div className="p-6 bg-surface border border-line space-y-4">
          <label className="block text-xs font-mono uppercase text-text-3">
            BUYER CONVENIENCE FEE
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={buyerFeeBps / 100}
              onChange={(e) => setBuyerFeeBps(Math.round(parseFloat(e.target.value) * 100))}
              step="0.1"
              className="w-24 bg-surface-2 border border-line text-text px-3 py-2 text-xl font-bold font-mono focus:outline-none focus:border-volt"
            />
            <span className="font-mono text-sm text-text-2">% of ticket price</span>
          </div>
          <p className="text-xs text-text-3">Subject to 18% GST (SAC 998599) at checkout.</p>
        </div>

        <div className="p-6 bg-surface border border-line space-y-4">
          <label className="block text-xs font-mono uppercase text-text-3">
            MAXIMUM MARKUP CAP
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={maxMarkupBps / 100}
              onChange={(e) => setMaxMarkupBps(Math.round(parseFloat(e.target.value) * 100))}
              step="0.5"
              className="w-24 bg-surface-2 border border-line text-volt px-3 py-2 text-xl font-bold font-mono focus:outline-none focus:border-volt"
            />
            <span className="font-mono text-sm text-text-2">% above face value</span>
          </div>
          <p className="text-xs text-text-3">Anti-scalping hard ceiling enforced across all listings.</p>
        </div>
      </div>

      {/* Live Financial Simulator */}
      <div className="p-6 bg-surface-2 border border-line space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-volt">
              DYNAMIC TRANSACTION SIMULATION
            </div>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight text-text">
              FEE SPLIT &amp; TAX PROJECTION CALCULATOR
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-3">SAMPLE TICKET PRICE:</span>
            <input
              type="number"
              value={simPriceInr}
              onChange={(e) => setSimPriceInr(Math.max(100, parseInt(e.target.value, 10) || 0))}
              step="500"
              className="w-28 bg-surface border border-line text-text px-3 py-1 font-mono text-sm font-bold focus:outline-none focus:border-volt"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-line">
          <div>
            <div className="text-[10px] font-mono text-text-3 uppercase">BUYER PAYS TOTAL</div>
            <div className="text-2xl font-black font-display text-text tabular-nums mt-1">
              {formatPaise(buyerTotalPaise)}
            </div>
            <div className="text-[10px] font-mono text-text-3">
              incl. {formatPaise(gstPaise)} GST
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-text-3 uppercase">SELLER RECEIVES NET</div>
            <div className="text-2xl font-black font-display text-text tabular-nums mt-1">
              {formatPaise(sellerNetPaise)}
            </div>
            <div className="text-[10px] font-mono text-text-3">
              less {formatPaise(sellerFeePaise)} fee
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-text-3 uppercase">PLATFORM NET REVENUE</div>
            <div className="text-2xl font-black font-display text-volt tabular-nums mt-1">
              {formatPaise(platformRevenuePaise)}
            </div>
            <div className="text-[10px] font-mono text-text-3">
              {(sellerFeeBps + buyerFeeBps) / 100}% effective take
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-text-3 uppercase">STATUTORY GST (18%)</div>
            <div className="text-2xl font-black font-display text-text tabular-nums mt-1">
              {formatPaise(gstPaise)}
            </div>
            <div className="text-[10px] font-mono text-text-3">
              SAC 998599 Remittance
            </div>
          </div>
        </div>
      </div>

      {/* Audit History Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          FEE SCHEDULE AUDIT LOG
        </h2>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">CONFIG ID</th>
                <th className="py-3 px-4">SELLER COMMISSION</th>
                <th className="py-3 px-4">BUYER CONVENIENCE</th>
                <th className="py-3 px-4">MAX MARKUP CAP</th>
                <th className="py-3 px-4">EFFECTIVE DATE</th>
                <th className="py-3 px-4 text-right">AUTHOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-surface-2 transition-colors font-mono text-xs">
                  <td className="py-4 px-4 font-bold text-text">{h.id}</td>
                  <td className="py-4 px-4 text-text">{h.sellerFeeBps / 100}%</td>
                  <td className="py-4 px-4 text-text">{h.buyerFeeBps / 100}%</td>
                  <td className="py-4 px-4 text-volt font-bold">+{h.maxMarkupBps / 100}%</td>
                  <td className="py-4 px-4 text-text-3">{h.effectiveFrom}</td>
                  <td className="py-4 px-4 text-right text-text-2">{h.changedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
