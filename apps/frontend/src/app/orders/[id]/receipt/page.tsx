// apps/frontend/src/app/orders/[id]/receipt/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Button } from '../../../../components/ui/button';
import { TableSkeleton } from '../../../../components/ui/skeleton';
import { IconVerifiedSeal, IconReceipt, IconLock, IconArrowUpRight } from '../../../../components/icons';

export default function OrderReceiptPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await apiClient.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error('Failed to load order', err);
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

  if (!order) {
    return (
      <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-3xl mx-auto text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold font-display uppercase">RECEIPT NOT FOUND</h2>
        <Link href="/dashboard/buyer">
          <Button variant="primary" size="sm">
            BACK TO ORDERS
          </Button>
        </Link>
      </div>
    );
  }

  const eventTitle = order.listing?.event?.name || 'LIVE DROP TICKET';
  const venue = order.listing?.event?.venue || 'VENUE TBA';
  const eventDate = order.listing?.event?.date
    ? new Date(order.listing.event.date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'DATE TBA';

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-3xl mx-auto">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-8 border-b border-line">
        <Link href="/dashboard/buyer" className="text-xs font-mono text-text-3 hover:text-text">
          ← BACK TO ORDERS
        </Link>
        <div className="flex items-center gap-3">
          <Link href={`/orders/${order.id}/invoice`}>
            <Button variant="secondary" size="sm" className="text-xs">
              TAX INVOICE (GST)
            </Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={() => window.print()} className="text-xs">
            PRINT RECEIPT
          </Button>
        </div>
      </div>

      {/* Official Receipt Card */}
      <div className="mt-8 p-8 md:p-12 border border-line bg-surface space-y-8 font-mono">
        {/* Top Wordmark & Status */}
        <div className="flex items-start justify-between border-b border-line pb-8">
          <div>
            <span className="text-2xl font-black font-display uppercase text-text tracking-tighter">
              TICKETPASS
            </span>
            <p className="text-[10px] text-text-3 mt-1 uppercase">
              PAYMENT TRANSACTION RECEIPT
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-volt border border-volt/40 px-2 py-0.5 rounded-full">
              {order.status}
            </span>
            <p className="text-[10px] text-text-3 mt-1.5">
              #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Event Coordinates */}
        <div className="space-y-2">
          <span className="text-[10px] text-text-3 uppercase">EVENT &amp; VENUE</span>
          <h2 className="text-2xl font-bold uppercase tracking-tight font-display text-text">
            {eventTitle}
          </h2>
          <p className="text-xs text-text-2">
            {venue} · {eventDate}
          </p>
          <p className="text-xs text-text-3">
            {order.listing?.section} · {order.listing?.quantity || 1} TICKET{(order.listing?.quantity || 1) > 1 ? 'S' : ''} (SEATS: {order.listing?.seats?.join(', ') || 'GENERAL'})
          </p>
        </div>

        {/* Financial Breakdown Table */}
        <div className="space-y-3 pt-6 border-t border-line text-xs">
          <div className="flex justify-between">
            <span className="text-text-3">TICKET RESALE FACE VALUE</span>
            <span className="text-text font-bold tabular-nums">
              {formatPaiseToInr(order.ticketPricePaise)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-3">BUYER PLATFORM ESCROW SERVICE FEE (5%)</span>
            <span className="text-text font-bold tabular-nums">
              {formatPaiseToInr(order.buyerFeePaise)}
            </span>
          </div>
          <div className="flex justify-between pt-4 border-t border-line text-sm">
            <span className="text-text font-bold">TOTAL AMOUNT PAID</span>
            <span className="text-volt font-black tabular-nums text-base">
              {formatPaiseToInr(order.totalPaise)}
            </span>
          </div>
        </div>

        {/* Payment Coordinates & Escrow Assurance */}
        <div className="pt-6 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-text-3">
          <div>
            <span className="text-text-3 uppercase">PAYMENT GATEWAY ID</span>
            <p className="text-text mt-0.5">{order.razorpayPaymentId || 'rzp_test_captured'}</p>
          </div>
          <div>
            <span className="text-text-3 uppercase">TRANSFER RECIPIENT PHONE</span>
            <p className="text-text mt-0.5">+91 {order.buyerAppPhone}</p>
          </div>
        </div>

        {/* Escrow Seal Footer */}
        <div className="p-4 bg-surface-2 border border-line flex items-center gap-3 text-xs">
          <div className="text-volt">
            <IconVerifiedSeal size={20} />
          </div>
          <div>
            <p className="font-bold text-text uppercase">100% BUYER ESCROW GUARANTEE</p>
            <p className="text-[10px] text-text-3">
              Protected by TicketPass institutional reserve fund. Transferred via official {order.listing?.platform || 'BookMyShow'} app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
