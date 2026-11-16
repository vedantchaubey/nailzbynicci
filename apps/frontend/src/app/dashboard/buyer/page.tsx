// apps/frontend/src/app/dashboard/buyer/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrderStatus, Platform, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { useAuthStore } from '../../../stores/auth.store';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { SegmentedControl } from '../../../components/ui/segmented-control';
import { TableSkeleton } from '../../../components/ui/skeleton';
import {
  IconTicket,
  IconShield,
  IconClock,
  IconCheck,
  IconArrowUpRight,
  IconReceipt,
  IconLock,
  IconTransfer,
  IconVerifiedSeal,
} from '../../../components/icons';

export default function BuyerDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get('/orders/me/buying');
      setOrders(res.data || []);
    } catch (err: any) {
      console.error('Failed to load buyer orders:', err);
      setError(err?.message || 'Unable to fetch your orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(
    (o) =>
      o.status !== OrderStatus.PAYOUT_RELEASED &&
      o.status !== OrderStatus.REFUNDED &&
      o.status !== OrderStatus.EXPIRED,
  );

  const completedOrders = orders.filter(
    (o) =>
      o.status === OrderStatus.PAYOUT_RELEASED ||
      o.status === OrderStatus.TRANSFER_VERIFIED,
  );

  const displayedOrders =
    activeTab === 'active'
      ? activeOrders
      : activeTab === 'completed'
      ? completedOrders
      : orders;

  const getStatusIndicator = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PAYMENT_PENDING:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-pending font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-pending animate-pulse" />
            PAYMENT PENDING
          </span>
        );
      case OrderStatus.ESCROW_LOCKED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-volt font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-volt" />
            ESCROW SECURED
          </span>
        );
      case OrderStatus.TRANSFER_INITIATED:
      case OrderStatus.TRANSFER_AWAITING_ACCEPTANCE:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-volt font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-volt animate-ping" />
            ACCEPT IN APP
          </span>
        );
      case OrderStatus.TRANSFER_VERIFIED:
      case OrderStatus.PAYOUT_RELEASED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            VERIFIED &amp; COMPLETED
          </span>
        );
      case OrderStatus.DISPUTED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-risk font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-risk" />
            UNDER DISPUTE
          </span>
        );
      case OrderStatus.REFUNDED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-3 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-line" />
            REFUNDED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-line" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              BUYER COMMAND
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            PURCHASES
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Track ticket handovers in real time. 100% escrow secured until verified.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchOrders}
            disabled={loading}
          >
            REFRESH
          </Button>
          <Link href="/events/browse">
            <Button variant="primary" size="sm">
              EXPLORE DROPS
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center justify-between border-b border-line pb-4">
        <SegmentedControl
          value={activeTab}
          onChange={(val) => setActiveTab(val as any)}
          options={[
            { value: 'active', label: `ACTIVE (${activeOrders.length})` },
            { value: 'completed', label: `COMPLETED (${completedOrders.length})` },
            { value: 'all', label: `ALL (${orders.length})` },
          ]}
        />
      </div>

      {/* Main Listing Grid */}
      <div className="mt-8">
        {loading ? (
          <TableSkeleton rows={4} />
        ) : error ? (
          <div className="p-8 border border-line bg-surface text-center space-y-4 max-w-md mx-auto">
            <p className="text-sm text-risk font-mono">{error}</p>
            <Button variant="secondary" size="sm" onClick={fetchOrders}>
              RETRY
            </Button>
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-line bg-surface space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mx-auto text-text-3">
              <IconTicket size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                NO ORDERS FOUND
              </h3>
              <p className="text-xs text-text-3 font-mono">
                {activeTab === 'active'
                  ? 'NO LIVE TICKET TRANSFERS IN PROGRESS'
                  : 'NO COMPLETED PURCHASES ON RECORD'}
              </p>
            </div>
            <div className="pt-2">
              <Link href="/events/browse">
                <Button variant="primary" size="sm">
                  BROWSE LIVE EVENTS
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-line border-t border-b border-line">
            {displayedOrders.map((order) => {
              const platformName =
                order.listing?.platform === Platform.BOOKMYSHOW
                  ? 'BOOKMYSHOW'
                  : 'DISTRICT';
              const eventTitle = order.listing?.event?.title || 'EXCLUSIVE DROP';
              const venue = order.listing?.event?.venue || 'VENUE TBA';
              const eventDate = order.listing?.event?.eventDate
                ? new Date(order.listing.event.eventDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })
                : 'DATE TBA';
              const imageUrl = order.listing?.event?.imageUrl || '/mock/event-placeholder.jpg';

              return (
                <div
                  key={order.id}
                  className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Thumbnail & Event Info */}
                  <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-surface-2 overflow-hidden rounded-[4px] border border-line">
                      <Image
                        src={imageUrl}
                        alt={eventTitle}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        {getStatusIndicator(order.status)}
                        <span className="text-[10px] font-mono tracking-wider text-text-3 uppercase border border-line px-1.5 py-0.5">
                          {platformName}
                        </span>
                        <span className="text-[10px] font-mono text-text-3">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight font-display truncate">
                        {eventTitle}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-text-2 font-mono flex-wrap">
                        <span>{eventDate}</span>
                        <span>·</span>
                        <span className="truncate">{venue}</span>
                        <span>·</span>
                        <span className="text-text font-bold">
                          {order.listing?.quantity || 1} TICKET{(order.listing?.quantity || 1) > 1 ? 'S' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 border-line pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-3">
                        TOTAL PAID
                      </p>
                      <p className="text-lg md:text-xl font-bold font-mono tabular-nums text-text">
                        {formatPaiseToInr(order.totalBuyerPaise)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/transfer/${order.id}`}>
                        <Button
                          variant={order.status === OrderStatus.PAYOUT_RELEASED ? 'secondary' : 'primary'}
                          size="sm"
                          className="flex items-center gap-1.5 text-xs"
                        >
                          <span>{order.status === OrderStatus.PAYOUT_RELEASED ? 'RECEIPT' : 'TRACK TRANSFER'}</span>
                          <IconArrowUpRight size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Escrow Guarantee Footer Strip */}
      <div className="mt-16 p-6 border border-line bg-surface-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-volt">
            <IconVerifiedSeal size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text font-display">
              100% BUYER ESCROW PROTECTION
            </p>
            <p className="text-xs text-text-2">
              Funds remain secured in multi-sig escrow until you confirm ticket receipt in your app.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-text-3">
          <span className="flex items-center gap-1.5">
            <IconLock size={12} /> BANK ESCROW
          </span>
          <span className="flex items-center gap-1.5">
            <IconClock size={12} /> 60-MIN SLA
          </span>
        </div>
      </div>
    </div>
  );
}
