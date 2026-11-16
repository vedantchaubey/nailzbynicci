// apps/backend/src/modules/payments/escrow/escrow-provider.interface.ts
import { Order, EscrowTransaction, Payout } from '@prisma/client';

export interface LockEscrowResult {
  escrowTransaction: EscrowTransaction;
  platformMode: 'route' | 'platform_held';
}

export interface ReleaseEscrowResult {
  payout: Payout;
  escrowTransaction: EscrowTransaction;
  platformMode: 'route' | 'platform_held';
}

export interface RefundEscrowResult {
  escrowTransaction: EscrowTransaction;
  refundId: string;
}

export interface EscrowProvider {
  /**
   * Locks the buyer's captured payment funds into escrow.
   */
  lockEscrow(order: Order, paymentId: string): Promise<LockEscrowResult>;

  /**
   * Releases escrowed funds to the seller after successful ownership verification.
   */
  releaseEscrow(order: Order): Promise<ReleaseEscrowResult>;

  /**
   * Refunds the entire totalPaise amount from escrow back to the buyer's original payment method.
   */
  refundEscrow(order: Order, reason: string): Promise<RefundEscrowResult>;
}
