// apps/backend/test/websocket-authorization.spec.ts
import { UserRole } from '@ticketpass/shared';

interface MockOrder {
  id: string;
  buyerId: string;
  sellerId: string;
}

function authorizeOrderRoomSubscription(
  order: MockOrder,
  requestingUserId: string,
  requestingUserRole: UserRole,
): boolean {
  if (order.buyerId === requestingUserId) return true;
  if (order.sellerId === requestingUserId) return true;
  if (requestingUserRole === UserRole.ADMIN || requestingUserRole === UserRole.SUPER_ADMIN) return true;
  return false;
}

describe('WebSocket Room Authorization', () => {
  const order: MockOrder = {
    id: 'ord_secret_777',
    buyerId: 'user_buyer_11',
    sellerId: 'user_seller_22',
  };

  it('permits the order buyer to join the private order room', () => {
    const isAllowed = authorizeOrderRoomSubscription(order, 'user_buyer_11', UserRole.USER);
    expect(isAllowed).toBe(true);
  });

  it('permits the order seller to join the private order room', () => {
    const isAllowed = authorizeOrderRoomSubscription(order, 'user_seller_22', UserRole.USER);
    expect(isAllowed).toBe(true);
  });

  it('permits system administrators to join any order room for dispute oversight', () => {
    const isAllowed = authorizeOrderRoomSubscription(order, 'user_admin_99', UserRole.ADMIN);
    expect(isAllowed).toBe(true);
  });

  it('strictly blocks unauthorized strangers from intercepting the order room', () => {
    const strangerUserId = 'user_stranger_666';
    const isAllowed = authorizeOrderRoomSubscription(order, strangerUserId, UserRole.USER);
    expect(isAllowed).toBe(false);
  });
});
