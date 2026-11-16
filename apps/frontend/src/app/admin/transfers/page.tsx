// apps/frontend/src/app/admin/transfers/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRightLeft,
  ShieldCheck,
  RefreshCw,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { OrderStatus, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';

export default function AdminTransfersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Override Modal
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [overrideAction, setOverrideAction] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [overrideReason, setOverrideReason] = useState('');
  const [overriding, setOverriding] = useState(false);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get('/admin/orders?limit=30');
      // Filter for orders that have transfer sessions
      const items = res.data?.items?.filter((o: any) => o.transferSession) || [];
      setOrders(items);
    } catch (err: any) {
      console.error('Failed to load transfers:', err);
      setError(err?.message || 'Failed to fetch transfer sessions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleExecuteOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || !overrideReason.trim()) return;

    setOverriding(true);
    try {
      await apiClient.post(`/admin/transfers/${selectedSession.id}/override`, {
        action: overrideAction,
        reason: overrideReason.trim(),
      });

      setSelectedSession(null);
      setOverrideReason('');
      fetchTransfers();
    } catch (err: any) {
      alert(err?.message || 'Failed to execute transfer override.');
    } finally {
      setOverriding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            Transfer Verification Sessions &amp; Overrides
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor autonomous confidence scores and apply administrative manual overrides.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchTransfers}
          className="text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Loading active transfer sessions...</p>
        </div>
      ) : orders.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-gray-300 bg-white">
          <ArrowRightLeft className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-gray-800">No Transfer Sessions Found</h3>
          <p className="text-xs text-gray-500 mt-1">Orders in active transfer states will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const session = order.transferSession;
            const score = session?.confidenceScore || 0;
            const isGreen = score >= 80;

            return (
              <Card
                key={order.id}
                className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs font-mono font-bold">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {order.listing?.platform}
                      </Badge>
                      <Badge
                        variant={
                          order.status === OrderStatus.TRANSFER_VERIFIED ||
                          order.status === OrderStatus.PAYOUT_RELEASED
                            ? 'success'
                            : order.status === OrderStatus.DISPUTED
                            ? 'danger'
                            : 'info'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500 font-mono">
                        Session: {session?.id.slice(-8).toUpperCase()}
                      </div>
                      <Link
                        href={`/transfer/${order.id}`}
                        className="text-brand-600 hover:text-brand-700 text-xs font-bold inline-flex items-center gap-1"
                      >
                        Inspect UI <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
                    {/* Event & Coordinates (5 cols) */}
                    <div className="md:col-span-5 space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {order.listing?.event?.title}
                      </h4>
                      <p className="text-gray-500 text-[11px]">
                        {order.listing?.section} • Row {order.listing?.row || 'Gen'} • Seats:{' '}
                        {order.listing?.seats?.join(', ')}
                      </p>
                      <div className="text-[11px] text-gray-400 pt-1">
                        Buyer: <strong className="text-gray-700">{order.buyer?.name}</strong> • Seller:{' '}
                        <strong className="text-gray-700">{order.seller?.name}</strong>
                      </div>
                    </div>

                    {/* Confidence Score Dial & Signals (4 cols) */}
                    <div className="md:col-span-4 bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-black font-mono text-sm border-2 ${
                            isGreen
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                              : 'bg-amber-50 border-amber-500 text-amber-700'
                          }`}
                        >
                          {score}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-800">Confidence Score</div>
                          <div className="text-[10px] text-gray-400">
                            {isGreen ? 'Threshold met (≥ 80)' : 'Below 80 auto-release'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            session?.buyerConfirmedAt
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          Signal A: {session?.buyerConfirmedAt ? 'Passed' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Override Button (3 cols) */}
                    <div className="md:col-span-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSession(session)}
                        className="text-xs font-bold border-gray-300 hover:border-gray-400 w-full md:w-auto"
                      >
                        Administrative Override
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Override Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={(open: boolean) => !open && setSelectedSession(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer Session Manual Override</DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <form onSubmit={handleExecuteOverride} className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
                Administrative overrides bypass autonomous confidence checks and directly force the order state machine forward or backward.
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Override Action
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      overrideAction === 'APPROVE'
                        ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value="APPROVE"
                      checked={overrideAction === 'APPROVE'}
                      onChange={() => setOverrideAction('APPROVE')}
                      className="hidden"
                    />
                    <div className="font-bold text-emerald-900">Force Approve</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Verify transfer &amp; release seller payout
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      overrideAction === 'REJECT'
                        ? 'border-red-600 bg-red-50/40 ring-1 ring-red-600'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value="REJECT"
                      checked={overrideAction === 'REJECT'}
                      onChange={() => setOverrideAction('REJECT')}
                      className="hidden"
                    />
                    <div className="font-bold text-red-900">Force Reject</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Cancel transfer &amp; refund buyer escrow
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Justification Reason (Logged to Immutable AuditLog)
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Organizer customer support verified ticket received via email..."
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedSession(null)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 text-xs font-bold"
                  disabled={overriding || !overrideReason.trim()}
                >
                  {overriding ? 'Executing Override...' : 'Confirm Override'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
