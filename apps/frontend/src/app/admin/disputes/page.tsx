// apps/frontend/src/app/admin/disputes/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  FileText,
  UserCheck,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { DisputeStatus, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resolution Modal State
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null);
  const [resolutionWinner, setResolutionWinner] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [adminNote, setAdminNote] = useState('');
  const [resolving, setResolving] = useState(false);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get('/admin/disputes');
      setDisputes(res.data || []);
    } catch (err: any) {
      console.error('Failed to load disputes:', err);
      setError(err?.message || 'Failed to fetch disputes list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute || !adminNote.trim()) return;

    setResolving(true);
    try {
      const resolution =
        resolutionWinner === 'BUYER'
          ? DisputeStatus.RESOLVED_BUYER
          : DisputeStatus.RESOLVED_SELLER;

      await apiClient.post(`/admin/disputes/${selectedDispute.id}/resolve`, {
        resolution,
        adminNote: adminNote.trim(),
      });

      setSelectedDispute(null);
      setAdminNote('');
      fetchDisputes();
    } catch (err: any) {
      alert(err?.message || 'Failed to resolve dispute.');
    } finally {
      setResolving(false);
    }
  };

  const getDisputeStatusBadge = (status: DisputeStatus) => {
    switch (status) {
      case DisputeStatus.OPEN:
      case DisputeStatus.UNDER_REVIEW:
        return <Badge variant="danger">Active Review Needed</Badge>;
      case DisputeStatus.RESOLVED_BUYER:
        return <Badge variant="neutral">Resolved: Buyer Refunded</Badge>;
      case DisputeStatus.RESOLVED_SELLER:
        return <Badge variant="success">Resolved: Seller Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Customer Disputes Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Human mediator review panel for conflicted in-app ticket transfers.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchDisputes}
          className="text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Loading dispute records...</p>
        </div>
      ) : disputes.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-gray-300 bg-white">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-gray-800">No Disputes Pending Review</h3>
          <p className="text-xs text-gray-500 mt-1">All customer claims have been investigated and settled.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {disputes.map((dispute) => {
            const isResolved =
              dispute.status === DisputeStatus.RESOLVED_BUYER ||
              dispute.status === DisputeStatus.RESOLVED_SELLER;

            return (
              <Card
                key={dispute.id}
                className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getDisputeStatusBadge(dispute.status)}
                      <span className="text-xs font-mono font-bold text-gray-900">
                        Dispute #{dispute.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500 font-mono">
                        Order #{dispute.orderId.slice(-8).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500">
                        Held in Escrow:{' '}
                        <strong className="font-mono text-gray-900">
                          {formatPaiseToInr(dispute.order?.totalPaise || 0)}
                        </strong>
                      </div>
                      <Link
                        href={`/transfer/${dispute.orderId}`}
                        className="text-brand-600 hover:text-brand-700 text-xs font-bold inline-flex items-center gap-1"
                      >
                        Live Session <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Event & Dispute Details (8 cols) */}
                    <div className="md:col-span-8 space-y-2">
                      <div className="font-bold text-gray-900 text-sm">
                        {dispute.order?.listing?.event?.title || 'Event Ticket'}
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        {dispute.order?.listing?.section} • Seats: {dispute.order?.listing?.seats?.join(', ')}
                      </div>

                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1 mt-2">
                        <div className="font-bold text-gray-800">Reason: {dispute.reason}</div>
                        <p className="text-gray-600 text-[11px] leading-relaxed">
                          &quot;{dispute.description}&quot;
                        </p>
                      </div>

                      {dispute.adminNote && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-900">
                          <strong>Admin Resolution Note:</strong> {dispute.adminNote}
                        </div>
                      )}
                    </div>

                    {/* Parties & Resolution Actions (4 cols) */}
                    <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4 space-y-3">
                      <div className="space-y-1.5 text-[11px]">
                        <div>
                          <span className="text-gray-400">Buyer: </span>
                          <span className="font-semibold text-gray-800">{dispute.order?.buyer?.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Seller: </span>
                          <span className="font-semibold text-gray-800">{dispute.order?.seller?.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Raised By: </span>
                          <Badge variant="outline" className="text-[10px]">
                            {dispute.raisedBy?.id === dispute.order?.buyerId ? 'Buyer' : 'Seller'}
                          </Badge>
                        </div>
                      </div>

                      {!isResolved && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedDispute(dispute)}
                          className="w-full text-xs font-bold"
                        >
                          Resolve Dispute
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dispute Resolution Modal */}
      <Dialog open={!!selectedDispute} onOpenChange={(open: boolean) => !open && setSelectedDispute(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Dispute Case</DialogTitle>
          </DialogHeader>

          {selectedDispute && (
            <form onSubmit={handleResolve} className="space-y-4 pt-2 text-xs">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Mediation Resolution
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      resolutionWinner === 'BUYER'
                        ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-600'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="winner"
                      value="BUYER"
                      checked={resolutionWinner === 'BUYER'}
                      onChange={() => setResolutionWinner('BUYER')}
                      className="hidden"
                    />
                    <div className="font-bold text-gray-900">Refund Buyer</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      100% funds to buyer • Seller bond forfeit
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      resolutionWinner === 'SELLER'
                        ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="winner"
                      value="SELLER"
                      checked={resolutionWinner === 'SELLER'}
                      onChange={() => setResolutionWinner('SELLER')}
                      className="hidden"
                    />
                    <div className="font-bold text-gray-900">Release to Seller</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Payout released • Deposit refunded
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Official Administrative Finding / Note
                </label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Detail the audit evidence, organizer confirmation, or communication log that determined this outcome..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedDispute(null)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 text-xs font-bold"
                  disabled={resolving || !adminNote.trim()}
                >
                  {resolving ? 'Executing Settlement...' : 'Confirm Final Resolution'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
