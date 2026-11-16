// apps/frontend/src/components/transfer/escrow-card.tsx
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, AlertCircle, ArrowUpRight } from 'lucide-react';
import { formatPaiseToInr } from '@ticketpass/shared';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface EscrowCardProps {
  orderId: string;
  totalPaise: number;
  sellerDepositPaise?: number;
  isEscrowHolding: boolean;
  isBuyer: boolean;
}

export function EscrowCard({
  orderId,
  totalPaise,
  sellerDepositPaise,
  isEscrowHolding,
  isBuyer,
}: EscrowCardProps) {
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 overflow-hidden shadow-sm">
      <CardHeader className="pb-3 border-b border-emerald-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">TicketPass Escrow Vault</h3>
            <p className="text-[11px] text-gray-500">Autonomous Financial Custody</p>
          </div>
        </div>
        <Badge variant={isEscrowHolding ? 'success' : 'neutral'}>
          {isEscrowHolding ? 'Funds Secured' : 'Escrow Settled'}
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-gray-600">Buyer Funds in Escrow:</span>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            {formatPaiseToInr(totalPaise)}
          </span>
        </div>

        {sellerDepositPaise ? (
          <div className="flex items-baseline justify-between text-xs border-t border-gray-100 pt-2">
            <span className="text-gray-500">Seller 20% Collateral Bond:</span>
            <span className="font-semibold text-emerald-700">
              +{formatPaiseToInr(sellerDepositPaise)} (Held)
            </span>
          </div>
        ) : null}

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
          <div className="flex items-start gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Ironclad Escrow Guarantee</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Funds are <strong>NEVER</strong> released on transfer initiation. Payout requires buyer
            in-app acceptance and a verified confidence score ≥ 80. If seller fails or recalls the
            ticket, 100% of your money is refunded automatically.
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>Issue with transfer?</span>
          </div>
          <Link
            href={`/dispute/${orderId}`}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
          >
            Open Escrow Dispute
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
