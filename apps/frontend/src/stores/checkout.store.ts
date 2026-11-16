// apps/frontend/src/stores/checkout.store.ts
import { create } from 'zustand';

interface CheckoutStore {
  listingId: string | null;
  reservedUntil: string | null;
  secondsRemaining: number;
  buyerName: string;
  buyerEmail: string;
  buyerAppPhone: string;
  setReservation: (listingId: string, reservedUntil: string, durationSeconds?: number) => void;
  clearReservation: () => void;
  decrementCountdown: () => void;
  setBuyerInfo: (info: { buyerName?: string; buyerEmail?: string; buyerAppPhone?: string }) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  listingId: null,
  reservedUntil: null,
  secondsRemaining: 300,
  buyerName: '',
  buyerEmail: '',
  buyerAppPhone: '',

  setReservation: (listingId: string, reservedUntil: string, durationSeconds = 300) => {
    set({
      listingId,
      reservedUntil,
      secondsRemaining: durationSeconds,
    });
  },

  clearReservation: () => {
    set({
      listingId: null,
      reservedUntil: null,
      secondsRemaining: 0,
    });
  },

  decrementCountdown: () => {
    set((state) => ({
      secondsRemaining: Math.max(0, state.secondsRemaining - 1),
    }));
  },

  setBuyerInfo: (info) => {
    set((state) => ({
      ...state,
      ...info,
    }));
  },
}));
