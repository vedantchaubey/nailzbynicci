// apps/frontend/src/app/transfer/[orderId]/page.tsx
'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { formatPaiseToInr, OrderStatus } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { useAuthStore } from '../../../stores/auth.store';
import { useOrderSocket } from '../../../hooks/use-order-socket';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { ConfidenceGauge } from '../../../components/ui/gauge';
import { CountdownBlock } from '../../../components/ui/countdown-block';
import { Timeline } from '../../../components/ui/timeline';
import { Dropzone } from '../../../components/ui/dropzone';
import { Input } from '../../../components/ui/input';
import {
  ShieldIcon,
  VerifiedSealGlyph,
  CheckIcon,
  CloseIcon,
  TransferArrowsIcon,
  LockIcon,
  ClockIcon,
} from '../../../components/icons/index';

export default function NikeStyleTransferTrackingPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;

  const { user } = useAuthStore();

  const [order, setOrder] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [last4Phone, setLast4Phone] = React.useState('');
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<string | null>(null);

  const fetchOrder = React.useCallback(async () => {
    try {
      const res = await apiClient.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch {
      // Handled in UI
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  React.useEffect(() => {
    if (orderId) {
      fetchOrder();
      const interval = setInterval(fetchOrder, 4000);
      return () => clearInterval(interval);
    }
  }, [orderId, fetchOrder]);

  useOrderSocket(orderId, () => {
    fetchOrder();
  });

  const handleConfirmReceipt = async () => {
    if (last4Phone.length !== 4) {
      alert('Please enter the last 4 digits of the phone number that received the transfer.');
      return;
    }

    setIsConfirming(true);
    try {
      await apiClient.post(`/transfers/${orderId}/buyer/confirm`, {
        phoneLast4: last4Phone,
      });
      await fetchOrder();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Receipt confirmation failed.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('Uploading screenshot proof...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderId', orderId);
      formData.append('purpose', 'BUYER_ACCEPT_PROOF');

      const uploadRes = await apiClient.post('/uploads', formData);
      setUploadStatus('OCR processing ticket markers...');

      // Link proof to transfer session
      await apiClient.post(`/transfers/${orderId}/buyer/proof`, {
        uploadId: uploadRes.data.id,
      });

      await fetchOrder();
      setUploadStatus(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Upload processing failed.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg text-white flex items-center justify-center">
        <span className="text-[14px] font-mono text-volt animate-pulse">CONNECTING TO ESCROW TRACKER...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-bg text-white p-8 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-2xl font-black font-display uppercase">Order Not Found</span>
        <Link href="/dashboard/buyer">
          <Button size="md" variant="primary">RETURN TO ORDERS</Button>
        </Link>
      </div>
    );
  }

  const isVerifiedSuccess = order.status === OrderStatus.TRANSFER_VERIFIED || order.status === OrderStatus.PAYOUT_RELEASED;
  const isRefunded = order.status === OrderStatus.REFUNDED;

  // SUCCESS FULL-SCREEN TAKEOVER (No confetti per Section 22 guidelines)
  if (isVerifiedSuccess) {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-500">
        <div className="w-24 h-24 rounded-full bg-volt text-black flex items-center justify-center mb-6">
          <CheckIcon size={48} />
        </div>

        <h1 className="type-hero text-white tracking-tighter">
          YOU&apos;RE IN.
        </h1>

        <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-volt mt-2">
          TRANSFER CONFIRMED &amp; VERIFIED
        </p>

        <div className="max-w-md w-full bg-surface border border-line rounded-[16px] p-6 flex flex-col gap-3 my-8 text-left">
          <span className="text-[11px] font-mono uppercase tracking-widest text-text-3">EVENT</span>
          <span className="text-xl font-black font-display uppercase text-white">{order.listing?.event?.name}</span>
          <span className="text-[14px] text-text-2">{order.listing?.section} · Row {order.listing?.row}</span>
          <div className="border-t border-line pt-3 mt-1 flex items-center justify-between text-[13px]">
            <span className="text-text-3">Payout Released to Seller</span>
            <span className="font-mono tabular-nums text-white">{formatPaiseToInr(order.ticketPricePaise)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/buyer">
            <Button size="lg" variant="primary" className="font-bold">
              VIEW MY ORDERS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAwaitingAcceptance = order.status === OrderStatus.TRANSFER_AWAITING_ACCEPTANCE;
  const confidenceScore = order.transferSession?.confidenceScore || 40;
  const signals = order.transferSession?.confidenceBreakdown?.signals || [];

  const timelineSteps = [
    {
      id: '1',
      title: 'ESCROW LOCKED',
      description: `${formatPaiseToInr(order.totalPaise)} held safely in TicketPass escrow account.`,
      timestamp: order.escrowLockedAt ? new Date(order.escrowLockedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'DONE',
      status: 'COMPLETED' as const,
    },
    {
      id: '2',
      title: 'SELLER APP TRANSFER',
      description: `Seller initiates native in-app transfer to ${order.buyerAppPhone} in ${order.listing?.platform}.`,
      timestamp: order.transferInitiatedAt ? new Date(order.transferInitiatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : null,
      status: order.transferInitiatedAt ? ('COMPLETED' as const) : ('ACTIVE' as const),
    },
    {
      id: '3',
      title: 'BUYER CONFIRMATION & OCR CHECK',
      description: 'Accept the transfer in your app and confirm receipt with phone last-4 digits.',
      timestamp: null,
      status: isAwaitingAcceptance ? ('ACTIVE' as const) : ('PENDING' as const),
    },
    {
      id: '4',
      title: 'PAYOUT RELEASE',
      description: 'Escrow released automatically upon verified receipt.',
      timestamp: null,
      status: 'PENDING' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text py-10 px-6 md:px-12 max-w-content mx-auto flex flex-col gap-10 select-none">
      {/* Top Header & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Chip variant="live" pulse>
              LIVE ORDER ACTIVITY
            </Chip>
            <span className="text-[12px] font-mono text-text-3 uppercase">
              ORDER #{order.id.slice(-8)}
            </span>
          </div>

          <h1 className="type-section-title text-white">
            {order.status.replace(/_/g, ' ')}
          </h1>

          <p className="text-[15px] text-text-2">
            {order.listing?.event?.name} · {order.listing?.section} (Row {order.listing?.row})
          </p>
        </div>

        {/* Identity Verification Badges */}
        <div className="flex items-center gap-3">
          <Chip variant="tag" className="flex items-center gap-1.5 py-1.5 px-3">
            <VerifiedSealGlyph size={14} className="text-volt" />
            <span>BUYER ID VERIFIED</span>
          </Chip>
          <Chip variant="tag" className="flex items-center gap-1.5 py-1.5 px-3">
            <VerifiedSealGlyph size={14} className="text-volt" />
            <span>SELLER ID VERIFIED</span>
          </Chip>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (Timeline & Platform Instructions) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Timeline */}
          <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-6">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              TRANSFER PROGRESS
            </span>
            <Timeline steps={timelineSteps} />
          </div>

          {/* Action Step: Confirm Acceptance in App */}
          {isAwaitingAcceptance && (
            <div className="p-8 rounded-[16px] bg-surface border border-volt/40 flex flex-col gap-6">
              <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
                ACTION REQUIRED
              </span>

              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                Confirm Ticket Receipt in App
              </h2>

              <p className="text-text-2 text-[14px] leading-relaxed">
                1. Open your {order.listing?.platform} app on phone ending in <strong className="text-white">...{order.buyerAppPhone.slice(-4)}</strong>.<br />
                2. Tap Accept on the pending transfer notification.<br />
                3. Enter the last 4 digits below to verify delivery and release funds.
              </p>

              <div className="max-w-xs">
                <Input
                  label="LAST 4 DIGITS OF YOUR PHONE"
                  placeholder="e.g. 3210"
                  maxLength={4}
                  value={last4Phone}
                  onChange={(e) => setLast4Phone(e.target.value)}
                />
              </div>

              <Button
                size="lg"
                variant="volt"
                onClick={handleConfirmReceipt}
                isLoading={isConfirming}
                className="w-full font-bold"
              >
                CONFIRM RECEIPT &amp; RELEASE FUNDS
              </Button>
            </div>
          )}

          {/* Screenshot Dropzone */}
          <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-4">
            <span className="text-[12px] font-mono uppercase tracking-widest text-text-3">
              OPTIONAL VERIFICATION EVIDENCE
            </span>
            <h3 className="text-lg font-black font-display uppercase text-white">
              Upload In-App Acceptance Screenshot
            </h3>
            <p className="text-[13px] text-text-2">
              Accelerates automated release by verifying your M-Ticket booking reference via OCR.
            </p>
            <Dropzone
              onFileSelect={handleFileUpload}
              isProcessing={isUploading}
              statusText={uploadStatus || undefined}
            />
          </div>
        </div>

        {/* Right Column (Confidence Gauge & SLA Countdown) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* SLA Countdown Timer */}
          <div className="p-8 rounded-[16px] bg-surface border border-line flex flex-col gap-4">
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              60-MINUTE ACCEPTANCE SLA
            </span>
            <CountdownBlock
              targetDate={new Date(Date.now() + 45 * 60000)}
              label="TIME REMAINING TO ACCEPT IN APP"
              size="lg"
            />
          </div>

          {/* Multi-Signal Confidence Gauge */}
          <ConfidenceGauge score={confidenceScore} signals={signals} />

          {/* Dispute Link */}
          <div className="p-6 rounded-[16px] bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-white uppercase">Having an issue?</span>
              <span className="text-[12px] text-text-3">Seller didn’t transfer or ticket invalid?</span>
            </div>

            <Link href={`/dispute/${order.id}`}>
              <Button size="sm" variant="destructive">
                OPEN DISPUTE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
