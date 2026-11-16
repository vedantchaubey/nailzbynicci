// apps/frontend/src/components/transfer/realtime-progress.tsx
import React from 'react';
import { OrderStatus } from '@ticketpass/shared';
import { Check, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RealtimeProgressProps {
  status: OrderStatus;
  className?: string;
}

const STEPS = [
  { id: 'PAYMENT_PENDING', label: 'Payment', sublabel: 'Buyer checkout' },
  { id: 'ESCROW_LOCKED', label: 'Escrow Locked', sublabel: '100% funds held' },
  { id: 'TRANSFER_INITIATED', label: 'Transfer Sent', sublabel: 'Seller app action' },
  { id: 'TRANSFER_AWAITING_ACCEPTANCE', label: 'In-App Acceptance', sublabel: 'Buyer accepts in app' },
  { id: 'TRANSFER_VERIFIED', label: 'Verified', sublabel: 'Confidence ≥ 80' },
  { id: 'PAYOUT_RELEASED', label: 'Payout Released', sublabel: 'Order complete' },
];

function getStepIndex(status: OrderStatus): number {
  switch (status) {
    case OrderStatus.PAYMENT_PENDING:
      return 0;
    case OrderStatus.ESCROW_LOCKED:
      return 1;
    case OrderStatus.TRANSFER_INITIATED:
      return 2;
    case OrderStatus.TRANSFER_AWAITING_ACCEPTANCE:
      return 3;
    case OrderStatus.TRANSFER_VERIFIED:
      return 4;
    case OrderStatus.PAYOUT_RELEASED:
      return 5;
    case OrderStatus.DISPUTED:
    case OrderStatus.REFUNDED:
    case OrderStatus.EXPIRED:
      return -1;
    default:
      return 0;
  }
}

export function RealtimeProgress({ status, className }: RealtimeProgressProps) {
  const currentIndex = getStepIndex(status);
  const isTerminalSpecial =
    status === OrderStatus.DISPUTED ||
    status === OrderStatus.REFUNDED ||
    status === OrderStatus.EXPIRED;

  return (
    <div className={cn('bg-white p-6 rounded-2xl border border-gray-100 shadow-sm', className)}>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Live Order State Machine
      </h3>

      {isTerminalSpecial ? (
        <div
          className={cn(
            'p-4 rounded-xl flex items-center gap-3',
            status === OrderStatus.DISPUTED
              ? 'bg-amber-50 border border-amber-200 text-amber-900'
              : 'bg-red-50 border border-red-200 text-red-900',
          )}
        >
          {status === OrderStatus.DISPUTED ? (
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <div>
            <div className="font-semibold text-sm">
              {status === OrderStatus.DISPUTED ? 'State Machine: DISPUTED' : `State Machine: ${status}`}
            </div>
            <div className="text-xs opacity-90">
              {status === OrderStatus.DISPUTED
                ? 'Normal transition pipeline is halted pending mediator review.'
                : 'Session ended in non-standard termination. Funds reconciled in escrow.'}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-2">
            {STEPS.map((step, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={step.id} className="flex flex-col items-start md:items-center text-left md:text-center relative">
                  <div className="flex items-center gap-2 md:flex-col mb-1.5 w-full">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm flex-shrink-0',
                        isPast
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-brand-600 text-white ring-4 ring-brand-100 animate-pulse'
                          : 'bg-gray-100 text-gray-400 border border-gray-200',
                      )}
                    >
                      {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>

                    <div className="font-semibold text-xs text-gray-900 truncate">{step.label}</div>
                  </div>
                  <div className="text-[11px] text-gray-500 hidden md:block">{step.sublabel}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden hidden md:block">
            <div
              className="bg-brand-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, ((currentIndex + 1) / STEPS.length) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
