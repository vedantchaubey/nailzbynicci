// apps/frontend/src/app/orders/[id]/invoice/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Button } from '../../../../components/ui/button';
import { TableSkeleton } from '../../../../components/ui/skeleton';

export default function OrderInvoicePage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [invoice, setInvoice] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await apiClient.get(`/finance/invoices/order/${orderId}`);
        setInvoice(res.data);
      } catch (err) {
        // If not found, attempt auto-generation
        try {
          const gen = await apiClient.post(`/finance/invoices/order/${orderId}/generate`);
          setInvoice(gen.data?.buyerInvoice);
        } catch (genErr) {
          console.error('Invoice load error', genErr);
        }
      } finally {
        setLoading(false);
      }
    }
    if (orderId) load();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-3xl mx-auto">
        <TableSkeleton rows={4} />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-3xl mx-auto text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold font-display uppercase">INVOICE PENDING GENERATION</h2>
        <p className="text-xs text-text-3 font-mono">
          Tax invoices are generated upon payment capture and escrow lock.
        </p>
        <Link href={`/orders/${orderId}/receipt`}>
          <Button variant="primary" size="sm">
            VIEW PAYMENT RECEIPT
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-3xl mx-auto">
      {/* Top action controls */}
      <div className="flex items-center justify-between pb-8 border-b border-line">
        <Link href={`/orders/${orderId}/receipt`} className="text-xs font-mono text-text-3 hover:text-text">
          ← BACK TO RECEIPT
        </Link>
        <Button variant="secondary" size="sm" onClick={() => window.print()} className="text-xs">
          PRINT TAX INVOICE
        </Button>
      </div>

      {/* Tax Invoice Document */}
      <div className="mt-8 p-8 md:p-12 border border-line bg-surface space-y-8 font-mono text-xs">
        {/* Header Strip */}
        <div className="flex items-start justify-between border-b border-line pb-8">
          <div>
            <h1 className="text-3xl font-black font-display uppercase tracking-tighter text-text">
              TAX INVOICE
            </h1>
            <p className="text-[10px] text-text-3 mt-1">
              ORIGINAL FOR RECIPIENT · SAC 998599
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-text">
              {invoice.invoiceNumber}
            </p>
            <p className="text-[10px] text-text-3 mt-1">
              DATE: {new Date(invoice.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        {/* Supplier & Recipient Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-line pb-8">
          <div className="space-y-1">
            <span className="text-[10px] text-volt uppercase font-bold">ISSUER / SUPPLIER</span>
            <p className="text-sm font-bold text-text">TicketPass Technologies India Pvt. Ltd.</p>
            <p className="text-text-3">BKC, Bandra East, Mumbai, Maharashtra 400051</p>
            <p className="text-text-3">GSTIN: {invoice.supplierGstin}</p>
            <p className="text-text-3">STATE CODE: 27 (Maharashtra)</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-volt uppercase font-bold">BILLED TO (RECIPIENT)</span>
            <p className="text-sm font-bold text-text">{invoice.recipientName}</p>
            <p className="text-text-3">STATE CODE: {invoice.recipientState === 'MH' ? '27 (Maharashtra)' : invoice.recipientState}</p>
            <p className="text-text-3">ORDER REF: #{invoice.orderId.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-4">
          <div className="flex justify-between border-b border-line pb-2 text-[10px] text-text-3 uppercase">
            <span>DESCRIPTION &amp; HSN/SAC</span>
            <span>TAXABLE (₹)</span>
          </div>

          {invoice.lines?.map((line: any) => (
            <div key={line.id} className="flex justify-between py-2">
              <div>
                <p className="text-text font-bold">{line.description}</p>
                <p className="text-[10px] text-text-3">HSN/SAC: {invoice.hsnSac} · QTY: 1</p>
              </div>
              <span className="text-text font-bold tabular-nums">
                {formatPaiseToInr(line.amountPaise)}
              </span>
            </div>
          ))}

          {/* Tax Breakdown */}
          <div className="pt-4 border-t border-line space-y-2">
            <div className="flex justify-between text-text-3">
              <span>TAXABLE VALUE</span>
              <span className="tabular-nums font-bold text-text">
                {formatPaiseToInr(invoice.taxableAmountPaise)}
              </span>
            </div>

            {invoice.cgstPaise > 0 && (
              <div className="flex justify-between text-text-3">
                <span>CENTRAL GST (CGST 9.0%)</span>
                <span className="tabular-nums font-bold text-text">
                  {formatPaiseToInr(invoice.cgstPaise)}
                </span>
              </div>
            )}

            {invoice.sgstPaise > 0 && (
              <div className="flex justify-between text-text-3">
                <span>STATE GST (SGST 9.0%)</span>
                <span className="tabular-nums font-bold text-text">
                  {formatPaiseToInr(invoice.sgstPaise)}
                </span>
              </div>
            )}

            {invoice.igstPaise > 0 && (
              <div className="flex justify-between text-text-3">
                <span>INTEGRATED GST (IGST 18.0%)</span>
                <span className="tabular-nums font-bold text-text">
                  {formatPaiseToInr(invoice.igstPaise)}
                </span>
              </div>
            )}

            <div className="flex justify-between pt-3 border-t border-line text-sm">
              <span className="text-text font-bold">TOTAL INVOICE VALUE</span>
              <span className="text-volt font-black tabular-nums text-base">
                {formatPaiseToInr(invoice.totalAmountPaise)}
              </span>
            </div>
          </div>
        </div>

        {/* Signatory Footer */}
        <div className="pt-8 border-t border-line flex flex-col md:flex-row md:items-end justify-between gap-6 text-[10px] text-text-3">
          <div className="space-y-1">
            <p>• This is a system-generated computer invoice in accordance with Rule 46 of CGST Rules, 2017.</p>
            <p>• Subject to Mumbai jurisdiction.</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-text font-bold">FOR TICKETPASS TECHNOLOGIES INDIA PVT LTD</p>
            <p className="mt-4 text-volt">DIGITALLY AUTHORISED SIGNATORY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
