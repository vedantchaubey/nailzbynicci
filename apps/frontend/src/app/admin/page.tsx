// apps/frontend/src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  ShoppingBag,
  Ticket,
  AlertTriangle,
  ShieldAlert,
  Clock,
  RefreshCw,
  Loader2,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { OrderStatus, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../lib/api-client';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Force Refund State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [refunding, setRefunding] = useState(false);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [overviewRes, ordersRes] = await Promise.all([
        apiClient.get('/admin/overview'),
        apiClient.get('/admin/orders?limit=15'),
      ]);
      setOverview(overviewRes.data);
      setOrders(ordersRes.data?.items || []);
    } catch (err: any) {
      console.error('Failed to load admin overview:', err);
      setError(err?.message || 'Failed to fetch admin overview data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const handleForceRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !refundReason.trim()) return;

    setRefunding(true);
    try {
      await apiClient.post(`/admin/orders/${selectedOrder.id}/force-refund`, {
        reason: refundReason.trim(),
      });

      setSelectedOrder(null);
      setRefundReason('');
      fetchOverviewData();
    } catch (err: any) {
      alert(err?.message || 'Failed to execute force refund.');
    } finally {
      setRefunding(false);
    }
  };

  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PAYMENT_PENDING:
        return <Badge variant="warning">Payment Pending</Badge>;
      case OrderStatus.ESCROW_LOCKED:
        return <Badge variant="success">Escrow Locked</Badge>;
      case OrderStatus.TRANSFER_INITIATED:
        return <Badge variant="info">Transfer Initiated</Badge>;
      case OrderStatus.TRANSFER_AWAITING_ACCEPTANCE:
        return <Badge variant="info">Awaiting Acceptance</Badge>;
      case OrderStatus.TRANSFER_VERIFIED:
        return <Badge variant="success">Transfer Verified</Badge>;
      case OrderStatus.PAYOUT_RELEASED:
        return <Badge variant="success">Payout Released</Badge>;
      case OrderStatus.DISPUTED:
        return <Badge variant="danger">DISPUTED</Badge>;
      case OrderStatus.REFUNDED:
        return <Badge variant="neutral">Refunded</Badge>;
      case OrderStatus.EXPIRED:
        return <Badge variant="neutral">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
        <p className="text-xs font-medium text-gray-500">Loading system overview metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Escrow Held */}
        <Card className="p-4 border-emerald-200 bg-emerald-50/40">
          <div className="flex items-center gap-2 text-emerald-800 mb-1">
            <Lock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Escrow Held</span>
          </div>
          <div className="text-xl font-black font-mono text-emerald-950 mt-1">
            {formatPaiseToInr(overview?.totalEscrowHeldPaise || 0)}
          </div>
          <span className="text-[10px] text-emerald-700">Protected in custody</span>
        </Card>

        {/* Total Orders */}
        <Card className="p-4 border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
          </div>
          <div className="text-xl font-black font-mono text-gray-900 mt-1">
            {overview?.totalOrders || 0}
          </div>
          <span className="text-[10px] text-gray-400">All-time volume</span>
        </Card>

        {/* Active Listings */}
        <Card className="p-4 border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Ticket className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Inventory</span>
          </div>
          <div className="text-xl font-black font-mono text-gray-900 mt-1">
            {overview?.activeListings || 0}
          </div>
          <span className="text-[10px] text-gray-400">Tickets on market</span>
        </Card>

        {/* Open Disputes */}
        <Card className="p-4 border-amber-200 bg-amber-50/40">
          <div className="flex items-center gap-2 text-amber-800 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Open Disputes</span>
          </div>
          <div className="text-xl font-black font-mono text-amber-950 mt-1">
            {overview?.openDisputes || 0}
          </div>
          <span className="text-[10px] text-amber-700">Requires mediator review</span>
        </Card>

        {/* Unresolved Fraud Flags */}
        <Card className="p-4 border-red-200 bg-red-50/40">
          <div className="flex items-center gap-2 text-red-800 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Fraud Flags</span>
          </div>
          <div className="text-xl font-black font-mono text-red-950 mt-1">
            {overview?.unresolvedFraudFlags || 0}
          </div>
          <span className="text-[10px] text-red-700">High severity anomalies</span>
        </Card>

        {/* Pending Payouts */}
        <Card className="p-4 border-purple-200 bg-purple-50/40">
          <div className="flex items-center gap-2 text-purple-800 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Payouts</span>
          </div>
          <div className="text-xl font-black font-mono text-purple-950 mt-1">
            {overview?.pendingPayoutsCount || 0}
          </div>
          <span className="text-[10px] text-purple-700">Dispute hold / buffer</span>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-gray-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent Marketplace Orders</h3>
            <p className="text-[11px] text-gray-500">Live order state machine audit status</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchOverviewData}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Event &amp; Seats</th>
                  <th className="py-3 px-4">Buyer</th>
                  <th className="py-3 px-4">Seller</th>
                  <th className="py-3 px-4">Escrow Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-900">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      <div className="font-bold text-gray-900 truncate">
                        {order.listing?.event?.title || 'Event'}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {order.listing?.section} • Seats: {order.listing?.seats?.join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{order.buyer?.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{order.buyer?.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{order.seller?.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{order.seller?.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-gray-900">
                      {formatPaiseToInr(order.totalPaise)}
                    </td>
                    <td className="py-3 px-4">
                      {getOrderStatusBadge(order.status)}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/transfer/${order.id}`}
                        className="text-brand-600 hover:text-brand-700 font-bold inline-flex items-center gap-1 text-[11px]"
                      >
                        Session <ExternalLink className="w-3 h-3" />
                      </Link>

                      {order.status !== OrderStatus.REFUNDED && order.status !== OrderStatus.PAYOUT_RELEASED && (
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="text-red-600 hover:text-red-700 font-bold text-[11px] underline ml-2"
                        >
                          Force Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Force Refund Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open: boolean) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Administrative Force Refund</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <form onSubmit={handleForceRefund} className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900">
                You are about to force-refund <strong>{formatPaiseToInr(selectedOrder.totalPaise)}</strong> for order{' '}
                <strong className="font-mono">#{selectedOrder.id.slice(-8).toUpperCase()}</strong>. Escrow funds will be immediately released back to the buyer&apos;s original payment method.
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reason for Force Refund (Audit Log)
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Organizer cancelled match, seller admitted counterfeit ticket..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  disabled={refunding || !refundReason.trim()}
                >
                  {refunding ? 'Refunding...' : 'Confirm Force Refund'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
