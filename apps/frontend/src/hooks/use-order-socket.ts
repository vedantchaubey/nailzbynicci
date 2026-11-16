// apps/frontend/src/hooks/use-order-socket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTransferLiveStore } from '../stores/transfer-live.store';
import { WebSocketOrderUpdatePayload } from '@ticketpass/shared';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

export function useOrderSocket(orderId: string, onUpdate?: (payload: WebSocketOrderUpdatePayload) => void) {
  const socketRef = useRef<Socket | null>(null);
  const setLiveUpdate = useTransferLiveStore((state) => state.setLiveUpdate);

  useEffect(() => {
    if (!orderId || typeof window === 'undefined') return;

    const token = localStorage.getItem('tp_access_token');
    const socket = io(`${WS_URL}/ws`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      // Subscribe to private order channel (supporting both colon and hyphen conventions)
      socket.emit('subscribe:order', { orderId });
      socket.emit('subscribe-order', { orderId });
    });

    const handlePayload = (payload: WebSocketOrderUpdatePayload) => {
      if (payload.orderId === orderId) {
        setLiveUpdate({
          orderId: payload.orderId,
          status: payload.status,
          message: payload.message,
          confidenceScore: payload.confidenceScore,
          signals: payload.signals,
        });
        if (onUpdate) {
          onUpdate(payload);
        }
      }
    };

    socket.on('order:update', handlePayload);
    socket.on('order-update', handlePayload);

    socket.on('error', (err) => {
      console.warn('[Socket Error]', err);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, setLiveUpdate, onUpdate]);

  return socketRef.current;
}
