// apps/frontend/src/stores/transfer-live.store.ts
import { create } from 'zustand';
import { OrderStatus, VerificationSignalResult } from '@ticketpass/shared';

interface TransferLiveStore {
  orderId: string | null;
  liveStatus: OrderStatus | null;
  progressMessage: string;
  confidenceScore: number;
  signals: VerificationSignalResult[];
  lastUpdatedAt: string | null;
  setLiveUpdate: (update: {
    orderId: string;
    status: OrderStatus;
    message: string;
    confidenceScore?: number;
    signals?: VerificationSignalResult[];
  }) => void;
  reset: () => void;
}

export const useTransferLiveStore = create<TransferLiveStore>((set) => ({
  orderId: null,
  liveStatus: null,
  progressMessage: 'Initializing transfer session…',
  confidenceScore: 0,
  signals: [],
  lastUpdatedAt: null,

  setLiveUpdate: (update) => {
    set({
      orderId: update.orderId,
      liveStatus: update.status,
      progressMessage: update.message,
      confidenceScore: update.confidenceScore ?? 0,
      signals: update.signals ?? [],
      lastUpdatedAt: new Date().toISOString(),
    });
  },

  reset: () => {
    set({
      orderId: null,
      liveStatus: null,
      progressMessage: 'Initializing transfer session…',
      confidenceScore: 0,
      signals: [],
      lastUpdatedAt: null,
    });
  },
}));
