// apps/frontend/src/hooks/use-reservation.ts
import { useEffect } from 'react';
import { useCheckoutStore } from '../stores/checkout.store';

export function useReservation(onExpire?: () => void) {
  const secondsRemaining = useCheckoutStore((state) => state.secondsRemaining);
  const decrementCountdown = useCheckoutStore((state) => state.decrementCountdown);
  const reservedUntil = useCheckoutStore((state) => state.reservedUntil);

  useEffect(() => {
    if (!reservedUntil || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      decrementCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [reservedUntil, secondsRemaining, decrementCountdown]);

  useEffect(() => {
    if (secondsRemaining === 0 && reservedUntil && onExpire) {
      onExpire();
    }
  }, [secondsRemaining, reservedUntil, onExpire]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    secondsRemaining,
    formattedTime,
    isExpired: secondsRemaining === 0,
  };
}
