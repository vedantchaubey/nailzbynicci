// apps/backend/test/state-machine.spec.ts
import {
  OrderStatus,
  isOrderTransitionAllowed,
  getNextAllowedOrderStatuses,
  TERMINAL_ORDER_STATES,
} from '@ticketpass/shared';

describe('Order State Machine Transition Rules', () => {
  describe('Legal Forward Transitions', () => {
    it('allows PAYMENT_PENDING -> ESCROW_LOCKED by SYSTEM or ADMIN', () => {
      expect(isOrderTransitionAllowed(OrderStatus.PAYMENT_PENDING, OrderStatus.ESCROW_LOCKED, 'SYSTEM')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.PAYMENT_PENDING, OrderStatus.ESCROW_LOCKED, 'ADMIN')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.PAYMENT_PENDING, OrderStatus.ESCROW_LOCKED, 'BUYER')).toBe(false);
    });

    it('allows PAYMENT_PENDING -> EXPIRED by SYSTEM on 15-minute timer', () => {
      expect(isOrderTransitionAllowed(OrderStatus.PAYMENT_PENDING, OrderStatus.EXPIRED, 'SYSTEM')).toBe(true);
    });

    it('allows ESCROW_LOCKED -> TRANSFER_INITIATED by SELLER or ADMIN', () => {
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.TRANSFER_INITIATED, 'SELLER')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.TRANSFER_INITIATED, 'ADMIN')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.TRANSFER_INITIATED, 'BUYER')).toBe(false);
    });

    it('allows ESCROW_LOCKED -> REFUNDED on seller SLA breach or hard stop', () => {
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.REFUNDED, 'SYSTEM')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.REFUNDED, 'ADMIN')).toBe(true);
    });

    it('allows TRANSFER_INITIATED -> TRANSFER_AWAITING_ACCEPTANCE by SYSTEM', () => {
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_INITIATED, OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, 'SYSTEM')).toBe(true);
    });

    it('allows TRANSFER_AWAITING_ACCEPTANCE -> TRANSFER_VERIFIED when score >= 80', () => {
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, OrderStatus.TRANSFER_VERIFIED, 'SYSTEM')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, OrderStatus.TRANSFER_VERIFIED, 'ADMIN')).toBe(true);
    });

    it('allows TRANSFER_AWAITING_ACCEPTANCE -> REFUNDED on buyer SLA breach', () => {
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, OrderStatus.REFUNDED, 'SYSTEM')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, OrderStatus.REFUNDED, 'ADMIN')).toBe(true);
    });

    it('allows TRANSFER_VERIFIED -> PAYOUT_RELEASED by SYSTEM upon payout job completion', () => {
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_VERIFIED, OrderStatus.PAYOUT_RELEASED, 'SYSTEM')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_VERIFIED, OrderStatus.PAYOUT_RELEASED, 'ADMIN')).toBe(true);
    });
  });

  describe('Dispute State Transitions', () => {
    it('allows any active non-terminal state to transition to DISPUTED', () => {
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.DISPUTED, 'BUYER')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_INITIATED, OrderStatus.DISPUTED, 'SELLER')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_AWAITING_ACCEPTANCE, OrderStatus.DISPUTED, 'BUYER')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_VERIFIED, OrderStatus.DISPUTED, 'BUYER')).toBe(true);
    });

    it('allows DISPUTED to transition to TRANSFER_VERIFIED or REFUNDED ONLY by ADMIN', () => {
      expect(isOrderTransitionAllowed(OrderStatus.DISPUTED, OrderStatus.TRANSFER_VERIFIED, 'ADMIN')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.DISPUTED, OrderStatus.REFUNDED, 'ADMIN')).toBe(true);
      expect(isOrderTransitionAllowed(OrderStatus.DISPUTED, OrderStatus.TRANSFER_VERIFIED, 'SELLER')).toBe(false);
      expect(isOrderTransitionAllowed(OrderStatus.DISPUTED, OrderStatus.REFUNDED, 'BUYER')).toBe(false);
    });
  });

  describe('Illegal & Terminal State Transitions', () => {
    it('rejects illegal shortcut transitions', () => {
      // Cannot skip escrow to payout
      expect(isOrderTransitionAllowed(OrderStatus.PAYMENT_PENDING, OrderStatus.PAYOUT_RELEASED)).toBe(false);
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.PAYOUT_RELEASED)).toBe(false);
      expect(isOrderTransitionAllowed(OrderStatus.TRANSFER_INITIATED, OrderStatus.PAYOUT_RELEASED)).toBe(false);
      // Cannot transition from one status to identical status
      expect(isOrderTransitionAllowed(OrderStatus.ESCROW_LOCKED, OrderStatus.ESCROW_LOCKED)).toBe(false);
    });

    it('strictly forbids transitions out of terminal states (PAYOUT_RELEASED, REFUNDED, EXPIRED)', () => {
      for (const terminalState of TERMINAL_ORDER_STATES) {
        for (const targetState of Object.values(OrderStatus)) {
          expect(isOrderTransitionAllowed(terminalState, targetState)).toBe(false);
        }
        expect(getNextAllowedOrderStatuses(terminalState)).toEqual([]);
      }
    });
  });
});
