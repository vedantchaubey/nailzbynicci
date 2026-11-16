// apps/frontend/src/app/admin/reserve/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface ReserveLedgerRow {
  id: string;
  timestamp: string;
  type: 'INJECTION' | 'CLAIM_DISBURSEMENT' | 'PENALTY_RECOVERY';
  amountPaise: number;
  balanceAfterPaise: number;
  reference: string;
  notes: string;
}

export default function AdminReservePage() {
  const [balancePaise, setBalancePaise] = useState(50000000); // ₹5,00,000
  const minThresholdPaise = 20000000; // ₹2,00,000

  const [ledger, setLedger] = useState<ReserveLedgerRow[]>([
    {
      id: 'RES-LEDGER-003',
      timestamp: '2026-11-01 19:50',
      type: 'CLAIM_DISBURSEMENT',
      amountPaise: -1400000,
      balanceAfterPaise: 50000000,
      reference: 'DISP-CLAIM-981',
      notes: 'Instant replacement seat issued for turnstile error at Ahmedabad gate.',
    },
    {
      id: 'RES-LEDGER-002',
      timestamp: '2026-11-01 19:51',
      type: 'PENALTY_RECOVERY',
      amountPaise: +1400000,
      balanceAfterPaise: 51400000,
      reference: 'PEN-SELLER-8821',
      notes: 'Recovered 100% replacement cost from defaulting seller deposit.',
    },
    {
      id: 'RES-LEDGER-001',
      timestamp: '2026-10-22 12:00',
      type: 'INJECTION',
      amountPaise: +50000000,
      balanceAfterPaise: 50000000,
      reference: 'SEED-TREASURY-01',
      notes: 'Initial capitalization of Buyer Guarantee Emergency Reserve Fund.',
    },
  ]);

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(Math.abs(paise) / 100);
    const sign = paise < 0 ? '-' : '+';
    return (paise < 0 ? '-' : '') + '₹' + rupees.toLocaleString('en-IN');
  };

  const handleTopUp = () => {
    const addPaise = 10000000; // ₹1,00,000
    const newBal = balancePaise + addPaise;
    setBalancePaise(newBal);
    setLedger((prev) => [
      {
        id: `RES-LEDGER-00${prev.length + 1}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'INJECTION',
        amountPaise: addPaise,
        balanceAfterPaise: newBal,
        reference: 'ADMIN-TOPUP',
        notes: 'Manual Treasury Injection to maintain 100% Buyer Guarantee solvency.',
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              SOLVENCY BACKSTOP &bull; 100% BUYER GUARANTEE TREASURY
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            PLATFORM RESERVE FUND
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Autonomous emergency reserve pool backstopping the 100% Buyer Guarantee (Section 23.3). Instantly funds emergency replacement seats or immediate cash refunds when turnstiles reject barcodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            AUDIT VAULT LEDGER
          </Button>
          <Button variant="primary" size="sm" onClick={handleTopUp}>
            TOP UP RESERVE (+₹1,00,000)
          </Button>
        </div>
      </div>

      {/* Reserve Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">CURRENT RESERVE BALANCE</div>
          <div className="text-3xl font-black font-display text-volt tabular-nums">
            {formatPaise(balancePaise).replace('+', '')}
          </div>
          <div className="text-xs text-text-3">Separated emergency treasury account</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">MINIMUM THRESHOLD</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            {formatPaise(minThresholdPaise).replace('+', '')}
          </div>
          <div className="text-xs text-text-3">Auto-alert triggers if balance dips</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">COVERAGE RATIO</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            250%
          </div>
          <div className="text-xs text-volt font-bold">Optimal risk coverage</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">SELLER RECOVERY RATE</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            100.0%
          </div>
          <div className="text-xs text-text-3">All claims recovered from deposits</div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          RESERVE FUND IMMUTABLE AUDIT LEDGER
        </h2>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">LEDGER REF</th>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">OPERATION TYPE</th>
                <th className="py-3 px-4 text-right">DELTA AMOUNT</th>
                <th className="py-3 px-4 text-right">VAULT BALANCE AFTER</th>
                <th className="py-3 px-4">AUDIT NOTES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ledger.map((row) => (
                <tr key={row.id} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs font-bold text-text">
                    {row.id}
                    <div className="text-[10px] text-text-3 font-normal">{row.reference}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3 whitespace-nowrap">
                    {row.timestamp}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        row.type === 'INJECTION'
                          ? 'bg-volt text-black'
                          : row.type === 'PENALTY_RECOVERY'
                          ? 'bg-surface-2 text-text border border-line'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-mono tabular-nums font-bold text-xs ${
                      row.amountPaise < 0 ? 'text-rose-400' : 'text-volt'
                    }`}
                  >
                    {formatPaise(row.amountPaise)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums text-text font-bold text-xs">
                    {formatPaise(row.balanceAfterPaise).replace('+', '')}
                  </td>
                  <td className="py-4 px-4 text-xs text-text-2 max-w-sm truncate">
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
