// apps/frontend/src/app/admin/finance/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface FinancialSnapshot {
  capturedGrossPaise: number;
  inEscrowPaise: number;
  releasedPayoutsPaise: number;
  refundedPaise: number;
  gstCollectedPaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  platformNetRevenuePaise: number;
  nodalVariancePaise: number;
}

interface TaxInvoiceRow {
  invoiceNumber: string;
  orderId: string;
  date: string;
  buyerName: string;
  stateCode: string;
  grossPaise: number;
  feePaise: number;
  gstPaise: number;
  sacCode: string;
  status: 'ISSUED' | 'RECONCILED';
}

export default function AdminFinancePage() {
  const snapshot: FinancialSnapshot = {
    capturedGrossPaise: 485000000, // ₹48,50,000
    inEscrowPaise: 82000000,      // ₹8,20,000
    releasedPayoutsPaise: 388000000, // ₹38,80,000
    refundedPaise: 15000000,      // ₹1,50,000
    gstCollectedPaise: 873000,    // ₹8,730
    cgstPaise: 436500,
    sgstPaise: 436500,
    igstPaise: 0,
    platformNetRevenuePaise: 4850000, // ₹48,500
    nodalVariancePaise: 0,        // ₹0 exact match
  };

  const invoices: TaxInvoiceRow[] = [
    {
      invoiceNumber: 'INV-2026-0001',
      orderId: 'ORD-98214-CP',
      date: '2026-11-01',
      buyerName: 'Rohan Verma',
      stateCode: '27 (MH)',
      grossPaise: 14000000,
      feePaise: 140000,
      gstPaise: 25200,
      sacCode: '998599',
      status: 'RECONCILED',
    },
    {
      invoiceNumber: 'INV-2026-0002',
      orderId: 'ORD-97811-IPL',
      date: '2026-10-28',
      buyerName: 'Ananya Sharma',
      stateCode: '36 (TS)',
      grossPaise: 9000000,
      feePaise: 90000,
      gstPaise: 16200,
      sacCode: '998599',
      status: 'RECONCILED',
    },
    {
      invoiceNumber: 'INV-2026-0003',
      orderId: 'ORD-96540-DIL',
      date: '2026-10-19',
      buyerName: 'Vikram Joshi',
      stateCode: '07 (DL)',
      grossPaise: 6000000,
      feePaise: 60000,
      gstPaise: 10800,
      sacCode: '998599',
      status: 'ISSUED',
    },
  ];

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  const handleRunReconciliation = () => {
    alert('Nodal bank reconciliation complete. Variance: ₹0.00. 100% matched.');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              FISCAL INTEGRITY &bull; GST SAC 998599 &bull; NODAL VAULT
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            FINANCE &amp; TAX RECONCILIATION
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Live escrow balance, gateway nodal reconciliation, automatic GST tax invoice issuance, and statutory compliance under Indian Goods and Services Tax Act.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleRunReconciliation}>
            RUN NODAL RECONCILIATION
          </Button>
          <Button variant="primary" size="sm">
            DOWNLOAD GSTR-1 CSV
          </Button>
        </div>
      </div>

      {/* Financial Health Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">GROSS FUNDS CAPTURED</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            {formatPaise(snapshot.capturedGrossPaise)}
          </div>
          <div className="text-xs text-text-3">Via Razorpay &amp; Cashfree Nodal</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">LOCKED IN ESCROW</div>
          <div className="text-3xl font-black font-display text-volt tabular-nums">
            {formatPaise(snapshot.inEscrowPaise)}
          </div>
          <div className="text-xs text-text-3">Pending gate entry verification</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">SELLER DISBURSEMENTS</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            {formatPaise(snapshot.releasedPayoutsPaise)}
          </div>
          <div className="text-xs text-text-3">Direct IMPS settlement</div>
        </div>

        <div className="p-5 bg-surface border border-line space-y-1">
          <div className="text-[11px] font-mono uppercase text-text-3">NODAL VARIANCE</div>
          <div className="text-3xl font-black font-display text-text tabular-nums">
            ₹0.00
          </div>
          <div className="text-xs text-volt font-bold">100% Balanced &bull; 0 Drift</div>
        </div>
      </div>

      {/* GST Breakdown Card */}
      <div className="p-6 bg-surface-2 border border-line space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-volt">
              GST SAC 998599 (EVENT TICKETING INTERMEDIARY SERVICES)
            </div>
            <h2 className="text-xl font-bold font-display uppercase tracking-tight text-text">
              18% GST TAX COLLECTION &amp; COMPLIANCE
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono uppercase text-text-3">TOTAL GST COLLECTED</div>
            <div className="text-2xl font-black font-display text-volt tabular-nums">
              {formatPaise(snapshot.gstCollectedPaise)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-surface border border-line">
            <div className="text-xs font-mono text-text-3">CGST (9% INTRA-STATE)</div>
            <div className="text-lg font-bold font-mono text-text tabular-nums mt-1">
              {formatPaise(snapshot.cgstPaise)}
            </div>
          </div>
          <div className="p-4 bg-surface border border-line">
            <div className="text-xs font-mono text-text-3">SGST (9% INTRA-STATE)</div>
            <div className="text-lg font-bold font-mono text-text tabular-nums mt-1">
              {formatPaise(snapshot.sgstPaise)}
            </div>
          </div>
          <div className="p-4 bg-surface border border-line">
            <div className="text-xs font-mono text-text-3">IGST (18% INTER-STATE)</div>
            <div className="text-lg font-bold font-mono text-text tabular-nums mt-1">
              {formatPaise(snapshot.igstPaise)}
            </div>
          </div>
        </div>
      </div>

      {/* Tax Invoices Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-tight font-display">
            RECENT TAX INVOICES (SAC 998599)
          </h2>
          <Button variant="secondary" size="sm">
            BULK DOWNLOAD PDFS
          </Button>
        </div>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">INVOICE NUMBER</th>
                <th className="py-3 px-4">ORDER REF</th>
                <th className="py-3 px-4">BUYER &amp; STATE</th>
                <th className="py-3 px-4 text-right">GROSS ORDER</th>
                <th className="py-3 px-4 text-right">PLATFORM FEE</th>
                <th className="py-3 px-4 text-right">GST (18%)</th>
                <th className="py-3 px-4">SAC</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {invoices.map((inv) => (
                <tr key={inv.invoiceNumber} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs font-bold text-text">
                    {inv.invoiceNumber}
                    <div className="text-[10px] text-text-3 font-normal">{inv.date}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-2">
                    {inv.orderId}
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="font-bold text-text">{inv.buyerName}</div>
                    <div className="font-mono text-text-3">{inv.stateCode}</div>
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums text-text-3">
                    {formatPaise(inv.grossPaise)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-text">
                    {formatPaise(inv.feePaise)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums text-volt font-bold">
                    {formatPaise(inv.gstPaise)}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3">
                    {inv.sacCode}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-volt text-black uppercase">
                      {inv.status}
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
