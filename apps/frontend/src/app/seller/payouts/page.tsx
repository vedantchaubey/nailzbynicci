// apps/frontend/src/app/seller/payouts/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

interface PayoutEntry {
  id: string;
  orderRef: string;
  event: string;
  grossPaise: number;
  feePaise: number;
  netPaise: number;
  method: string;
  utr: string;
  date: string;
  status: 'PAID' | 'PROCESSING' | 'ON_HOLD';
  holdReason?: string;
}

export default function SellerPayoutsPage() {
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  const bankAccount = {
    bankName: 'HDFC Bank Ltd',
    accountMasked: '•••• •••• 9281',
    ifsc: 'HDFC0000240',
    accountHolder: 'ARJUN SHARMA',
    verificationStatus: 'VERIFIED',
    payoutSchedule: 'IMMEDIATE (Within 60 mins of buyer entry confirmation)',
  };

  const payouts: PayoutEntry[] = [
    {
      id: 'PAY-88219-MUM',
      orderRef: 'ORD-98214-CP',
      event: 'Coldplay: Music of the Spheres (Ahmedabad)',
      grossPaise: 7000000,
      feePaise: 350000,
      netPaise: 6650000,
      method: 'IMPS (RazorpayX)',
      utr: 'HDFC261102984120',
      date: '2026-11-01 19:42',
      status: 'PAID',
    },
    {
      id: 'PAY-87402-HYD',
      orderRef: 'ORD-97811-IPL',
      event: 'IPL 2026: SRH vs PBKS (Hyderabad)',
      grossPaise: 4500000,
      feePaise: 225000,
      netPaise: 4275000,
      method: 'IMPS (Cashfree Payouts)',
      utr: 'CF261028741198',
      date: '2026-10-28 22:15',
      status: 'PAID',
    },
    {
      id: 'PAY-86110-DEL',
      orderRef: 'ORD-96540-DIL',
      event: 'Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)',
      grossPaise: 3000000,
      feePaise: 150000,
      netPaise: 2850000,
      method: 'NEFT (Direct Bank API)',
      utr: 'HDFC261019003841',
      date: '2026-10-19 14:02',
      status: 'PAID',
    },
    {
      id: 'PAY-89104-BLR',
      orderRef: 'ORD-99302-RCBW',
      event: 'WPL 2026: RCB vs MI (Bengaluru)',
      grossPaise: 1600000,
      feePaise: 80000,
      netPaise: 1520000,
      method: 'IMPS (In Transit)',
      utr: 'PENDING_BANK_ACK',
      date: '2026-11-02 14:10',
      status: 'PROCESSING',
    },
  ];

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  const handleExportStatement = (format: 'CSV' | 'PDF') => {
    const csvContent =
      'Payout ID,Order Ref,Event,Gross INR,Fee INR,Net INR,Method,UTR,Date,Status\n' +
      payouts
        .map(
          (p) =>
            `${p.id},${p.orderRef},"${p.event}",${p.grossPaise / 100},${p.feePaise / 100},${p.netPaise / 100},${p.method},${p.utr},${p.date},${p.status}`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ticketpass-payouts-${Date.now()}.${format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              FINANCIAL SETTLEMENTS &bull; ESCROW DISBURSEMENTS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            PAYOUT STATEMENTS
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Track bank disbursements released from buyer escrow accounts upon verified ticket transfer completion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => handleExportStatement('CSV')}>
            EXPORT CSV
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleExportStatement('PDF')}>
            EXPORT STATEMENT PDF
          </Button>
          <Link href="/seller/analytics">
            <Button variant="primary" size="sm">
              SELLER ANALYTICS
            </Button>
          </Link>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-none bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            LIFETIME DISBURSED
          </div>
          <div className="text-2xl md:text-3xl font-black font-display text-text tabular-nums">
            ₹1,37,750
          </div>
          <div className="text-xs text-text-3 mt-1">100% on-time settlement</div>
        </div>

        <div className="p-5 rounded-none bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            PENDING IN ESCROW
          </div>
          <div className="text-2xl md:text-3xl font-black font-display text-volt tabular-nums">
            ₹15,200
          </div>
          <div className="text-xs text-text-3 mt-1">1 order awaiting gate scan</div>
        </div>

        <div className="p-5 rounded-none bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            SECURITY DEPOSIT
          </div>
          <div className="text-2xl md:text-3xl font-black font-display text-text tabular-nums">
            ₹0
          </div>
          <div className="text-xs text-text-3 mt-1">No seller holdbacks</div>
        </div>

        <div className="p-5 rounded-none bg-surface border border-line">
          <div className="text-xs font-mono uppercase tracking-wider text-text-3 mb-1">
            PAYOUT DESTINATION
          </div>
          <div className="text-sm font-bold text-text truncate">
            {bankAccount.bankName}
          </div>
          <div className="text-xs font-mono text-text-3 mt-1">
            {bankAccount.accountMasked} &bull; {bankAccount.ifsc}
          </div>
        </div>
      </div>

      {/* Connected Bank Card */}
      <div className="p-6 bg-surface-2 border border-line mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-wider text-text-3">
              PRIMARY SETTLEMENT NODE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-volt text-black font-bold">
              {bankAccount.verificationStatus}
            </span>
          </div>
          <div className="text-base font-bold text-text">
            {bankAccount.accountHolder} &bull; {bankAccount.bankName} ({bankAccount.accountMasked})
          </div>
          <div className="text-xs text-text-3">
            IFSC: <span className="font-mono text-text-2">{bankAccount.ifsc}</span> &bull; Routine: {bankAccount.payoutSchedule}
          </div>
        </div>
        <Link href="/settings/payouts">
          <Button variant="secondary" size="sm">
            MANAGE BANK ACCOUNT
          </Button>
        </Link>
      </div>

      {/* Ledger Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display">
            DISBURSEMENT HISTORY
          </h2>
          <div className="flex items-center gap-2">
            {['ALL', 'PAID', 'PROCESSING'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedMonth(filter)}
                className={`px-3 py-1 text-xs font-mono uppercase rounded-full transition-colors ${
                  selectedMonth === filter
                    ? 'bg-text text-black font-bold'
                    : 'bg-surface text-text-3 hover:text-text'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">PAYOUT REF</th>
                <th className="py-3 px-4">EVENT &amp; ORDER</th>
                <th className="py-3 px-4 text-right">GROSS</th>
                <th className="py-3 px-4 text-right">FEE (5%)</th>
                <th className="py-3 px-4 text-right">NET PAYOUT</th>
                <th className="py-3 px-4">BANK ROUTE / UTR</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payouts
                .filter((p) => selectedMonth === 'ALL' || p.status === selectedMonth)
                .map((p) => (
                  <tr key={p.id} className="hover:bg-surface-2 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs font-bold text-text">
                      {p.id}
                      <div className="text-[10px] text-text-3">{p.orderRef}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-text max-w-xs truncate">
                      {p.event}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums text-text-3">
                      {formatPaise(p.grossPaise)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums text-text-3">
                      -{formatPaise(p.feePaise)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-text">
                      {formatPaise(p.netPaise)}
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <div className="font-mono text-text-2">{p.method}</div>
                      <div className="font-mono text-[10px] text-text-3">{p.utr}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-text-3 whitespace-nowrap">
                      {p.date}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                          p.status === 'PAID'
                            ? 'bg-volt text-black'
                            : p.status === 'PROCESSING'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
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
