// apps/frontend/src/components/events/quantity-modal.tsx
'use client';

import * as React from 'react';
import { Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQty: number;
  onSelectQty: (qty: number) => void;
}

export function QuantityModal({
  isOpen,
  onClose,
  selectedQty,
  onSelectQty,
}: QuantityModalProps) {
  const options = [1, 2, 3, 4, 5, 6];

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Users className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl">How many tickets?</DialogTitle>
          <DialogDescription>
            We will only show seats together in the same row.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 py-4">
          {options.map((qty) => (
            <button
              key={qty}
              onClick={() => {
                onSelectQty(qty);
                onClose();
              }}
              className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                selectedQty === qty
                  ? 'border-brand-600 bg-brand-50/50 text-brand-700 font-bold ring-2 ring-brand-500/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800'
              }`}
            >
              <span className="text-2xl font-bold">{qty}</span>
              <span className="text-xs text-gray-500 mt-1">
                {qty === 1 ? 'Ticket' : 'Tickets'}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-800 py-2"
        >
          View all available quantities
        </button>
      </DialogContent>
    </Dialog>
  );
}
