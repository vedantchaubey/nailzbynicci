// apps/frontend/src/app/dispute/[orderId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  FileText,
  Clock,
} from 'lucide-react';
import { Platform, UploadPurpose, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { useAuthStore } from '../../../stores/auth.store';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { ScreenshotDropzone } from '../../../components/transfer/screenshot-dropzone';

interface PageProps {
  params: { orderId: string };
}

const DISPUTE_REASONS = [
  {
    value: 'SELLER_SLA_BREACH',
    label: 'Seller failed to initiate transfer before SLA expiry',
    description: 'The seller did not send the transfer inside BookMyShow/District within the required transfer window.',
  },
  {
    value: 'TICKET_CANCELLED_OR_REVOKED',
    label: 'Ticket cancelled or recalled after transfer',
    description: 'Seller tapped "Cancel request" before acceptance or ticket disappeared from your organizer bookings.',
  },
  {
    value: 'INVALID_SEATS_OR_COUNTERFEIT',
    label: 'Different section, seats, or category received',
    description: 'The ticket transferred does not match the listed section, row, or seat numbers.',
  },
  {
    value: 'ORGANIZER_TRANSFER_UNAVAILABLE',
    label: 'Organizer disallowed transfers for this event',
    description: 'The "Transfer ticket" button is not appearing in the official organizer app.',
  },
  {
    value: 'BUYER_NON_ACCEPTANCE_OR_FRAUD',
    label: 'Buyer refusing to accept or illegitimate claim (Seller Appeal)',
    description: 'Seller initiated transfer correctly, but buyer has not accepted within SLA.',
  },
  {
    value: 'OTHER',
    label: 'Other dispute issue',
    description: 'Other technical or fulfillment problem requiring human mediator intervention.',
  },
];

export default function DisputePage({ params }: PageProps) {
  const router = useRouter();
  const orderId = params.orderId;

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [selectedReason, setSelectedReason] = useState(DISPUTE_REASONS[0].value);
  const [description, setDescription] = useState('');
  const [evidenceUploadIds, setEvidenceUploadIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const res = await apiClient.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err: any) {
        setError(err?.message || 'Could not load order details for dispute.');
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (description.trim().length < 20) {
      setError('Please provide a detailed description of the issue (at least 20 characters).');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post(`/orders/${orderId}/dispute`, {
        reason: selectedReason,
        description: description.trim(),
        evidenceUploadIds: evidenceUploadIds.length > 0 ? evidenceUploadIds : undefined,
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Failed to open dispute:', err);
      setError(err?.message || 'Unable to raise dispute. A dispute may already be open for this order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-amber-300 bg-white shadow-lg space-y-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Dispute Opened &amp; Escrow Frozen</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Payout release has been immediately locked in the escrow vault. A human TicketPass mediator
            will review your submitted evidence and organizer logs within 4 hours.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-mono">
            Case Reference: DISP-{orderId.slice(-8).toUpperCase()}
          </div>
          <div className="pt-2">
            <Link href={`/transfer/${orderId}`}>
              <Button variant="primary" className="w-full">
                Return to Live Transfer Session
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/transfer/${orderId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Transfer Session
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Open Escrow Dispute</h1>
          </div>
          <p className="text-xs text-gray-500">
            Escrow freezes seller payouts instantly upon dispute submission until resolved.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Card className="border-gray-200 bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Order #{orderId.slice(-8).toUpperCase()}
              </h2>
            </div>
            {order && (
              <Badge variant="outline" className="font-mono text-xs">
                {formatPaiseToInr(order.totalPaise)} Protected
              </Badge>
            )}
          </CardHeader>

          <CardContent className="pt-5 space-y-6">
            <form onSubmit={handleSubmitDispute} className="space-y-5">
              {/* Reason Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Primary Dispute Reason
                </label>
                <div className="space-y-2">
                  {DISPUTE_REASONS.map((r) => (
                    <label
                      key={r.value}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedReason === r.value
                          ? 'border-brand-500 bg-brand-50/20 ring-1 ring-brand-500'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="disputeReason"
                        value={r.value}
                        checked={selectedReason === r.value}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="mt-0.5 text-brand-600 focus:ring-brand-500"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-gray-900">{r.label}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">{r.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Detailed Statement &amp; Timeline
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what occurred in BookMyShow/District, timestamps of transfer attempts, error messages, or communication issues..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  required
                />
                <p className="text-[11px] text-gray-400 mt-1">Minimum 20 characters required.</p>
              </div>

              {/* Screenshot Proof Dropzone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Attach Evidence Screenshot (Recommended)
                </label>
                <ScreenshotDropzone
                  orderId={orderId}
                  purpose={UploadPurpose.BUYER_ACCEPT_PROOF}
                  title="Evidence Screenshot"
                  description="Upload screenshot from BookMyShow or District showing the transfer cancellation, missing ticket, or error popup."
                  onUploadSuccess={(upload) => {
                    setEvidenceUploadIds((prev) => [...prev, upload.id]);
                  }}
                />
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Notice:</strong> Filing fraudulent disputes or false claims results in immediate platform ban and permanent loss of seller security deposits.
                </span>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-sm flex items-center justify-center gap-2"
                disabled={isSubmitting || description.trim().length < 20}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Dispute &amp; Freezing Escrow...
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5" />
                    Submit Dispute &amp; Freeze Escrow Payout
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
