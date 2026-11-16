// apps/frontend/src/components/transfer/status-hero.tsx
import React from 'react';
import { OrderStatus, Platform } from '@ticketpass/shared';
import { Badge } from '../ui/badge';
import {
  ShieldCheck,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Hourglass,
  Lock,
} from 'lucide-react';

interface StatusHeroProps {
  status: OrderStatus;
  platform: Platform;
  isBuyer: boolean;
  orderId: string;
}

export function StatusHero({ status, platform, isBuyer, orderId }: StatusHeroProps) {
  const platformName = platform === Platform.BOOKMYSHOW ? 'BookMyShow' : 'District by Zomato';

  const getStatusConfig = () => {
    switch (status) {
      case OrderStatus.PAYMENT_PENDING:
        return {
          badge: 'Payment Pending',
          badgeVariant: 'warning' as const,
          title: 'Awaiting Payment',
          description: isBuyer
            ? 'Complete your payment within 15 minutes to lock this ticket in escrow.'
            : 'Buyer has reserved this ticket and is completing payment.',
          icon: Hourglass,
          iconColor: 'text-amber-500',
          bgColor: 'bg-amber-50 border-amber-200',
        };
      case OrderStatus.ESCROW_LOCKED:
        return {
          badge: 'Escrow Locked',
          badgeVariant: 'success' as const,
          title: isBuyer
            ? 'Payment Secured in Escrow'
            : 'Transfer Required: Send Ticket Now',
          description: isBuyer
            ? `Your funds are held securely. The seller has been instructed to transfer the ticket directly to your ${platformName} account.`
            : `Buyer has paid! You must now open your ${platformName} app and transfer the ticket to the buyer's registered mobile number before the SLA expires.`,
          icon: Lock,
          iconColor: 'text-emerald-500',
          bgColor: 'bg-emerald-50 border-emerald-200',
        };
      case OrderStatus.TRANSFER_INITIATED:
      case OrderStatus.TRANSFER_AWAITING_ACCEPTANCE:
        return {
          badge: 'Awaiting In-App Acceptance',
          badgeVariant: 'info' as const,
          title: isBuyer
            ? `Action Required: Accept Ticket in ${platformName}`
            : 'Transfer Sent — Waiting for Buyer Acceptance',
          description: isBuyer
            ? `The seller has sent the ticket transfer. Open your ${platformName} app, go to bookings/transfers, and tap "Accept". Then return here to confirm.`
            : `Transfer marked sent. The buyer has 60 minutes to open their ${platformName} app and accept the ticket. Payout will be unlocked upon verification.`,
          icon: ArrowRightLeft,
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-50 border-blue-200',
        };
      case OrderStatus.TRANSFER_VERIFIED:
        return {
          badge: 'Transfer Verified',
          badgeVariant: 'success' as const,
          title: 'Ownership Verified by Confidence Engine',
          description: isBuyer
            ? `Ticket ownership is confirmed in your ${platformName} app. You are all set for the event!`
            : 'Ticket acceptance confirmed! Payout calculation finalized and releasing to your bank account.',
          icon: ShieldCheck,
          iconColor: 'text-emerald-500',
          bgColor: 'bg-emerald-50 border-emerald-200',
        };
      case OrderStatus.PAYOUT_RELEASED:
        return {
          badge: 'Order Complete & Payout Released',
          badgeVariant: 'success' as const,
          title: isBuyer ? 'Order Successfully Fulfilled' : 'Payout Successfully Sent!',
          description: isBuyer
            ? `Enjoy the event! Remember: only use the live QR in your ${platformName} app at the gate.`
            : 'Funds and your 20% security deposit have been released to your registered bank account.',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50 border-emerald-300',
        };
      case OrderStatus.DISPUTED:
        return {
          badge: 'Under Dispute Investigation',
          badgeVariant: 'danger' as const,
          title: 'Escrow Frozen: Dispute in Review',
          description:
            'A dispute has been opened for this transfer. Payout is temporarily frozen while an admin agent reviews in-app transfer audit logs and submitted screenshots.',
          icon: AlertTriangle,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50 border-red-200',
        };
      case OrderStatus.REFUNDED:
        return {
          badge: 'Escrow Refunded',
          badgeVariant: 'neutral' as const,
          title: 'Order Refunded to Buyer',
          description:
            'The escrow payment has been refunded to the original payment source due to SLA expiry or dispute resolution.',
          icon: RotateCcw,
          iconColor: 'text-gray-500',
          bgColor: 'bg-gray-50 border-gray-200',
        };
      case OrderStatus.EXPIRED:
      default:
        return {
          badge: 'Session Expired',
          badgeVariant: 'neutral' as const,
          title: 'Checkout Session Expired',
          description: 'Payment was not received within the reservation window. Ticket returned to active inventory.',
          icon: Clock,
          iconColor: 'text-gray-400',
          bgColor: 'bg-gray-50 border-gray-200',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`p-6 rounded-2xl border ${config.bgColor} transition-all`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant={config.badgeVariant}>{config.badge}</Badge>
              <span className="text-xs text-gray-500 font-mono">Order #{orderId.slice(-8).toUpperCase()}</span>
              <Badge variant="outline" className="text-xs">
                {platformName}
              </Badge>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">{config.description}</p>
          </div>
        </div>

        {status === OrderStatus.ESCROW_LOCKED && isBuyer && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-emerald-300 text-xs text-emerald-800 font-medium self-start md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Real-time verification active
          </div>
        )}
      </div>
    </div>
  );
}
