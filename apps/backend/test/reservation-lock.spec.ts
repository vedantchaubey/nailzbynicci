// apps/backend/test/reservation-lock.spec.ts
import * as crypto from 'crypto';

class MockRedisLockStore {
  private store = new Map<string, { token: string; expiresAt: number }>();

  async acquireLock(key: string, ttlSeconds: number): Promise<string | null> {
    const now = Date.now();
    const existing = this.store.get(key);

    if (existing && existing.expiresAt > now) {
      return null; // Lock is currently held
    }

    const token = crypto.randomUUID();
    this.store.set(key, { token, expiresAt: now + ttlSeconds * 1000 });
    return token;
  }

  async releaseLock(key: string, token: string): Promise<boolean> {
    const existing = this.store.get(key);
    if (!existing) return false;

    if (existing.token === token) {
      this.store.delete(key);
      return true;
    }
    return false; // Token mismatch: cannot release another process's lock
  }
}

describe('Reservation Distributed Locking Concurrency', () => {
  let lockStore: MockRedisLockStore;

  beforeEach(() => {
    lockStore = new MockRedisLockStore();
  });

  it('guarantees mutual exclusion when two buyers race to reserve the same listing', async () => {
    const listingId = 'listing_vip_001';
    const lockKey = `reservation:${listingId}`;

    // Buyer A attempts reservation
    const tokenA = await lockStore.acquireLock(lockKey, 300);
    expect(tokenA).not.toBeNull();
    expect(typeof tokenA).toBe('string');

    // Buyer B races to reserve the same listing concurrently
    const tokenB = await lockStore.acquireLock(lockKey, 300);
    expect(tokenB).toBeNull(); // Blocked!

    // Buyer C also races
    const tokenC = await lockStore.acquireLock(lockKey, 300);
    expect(tokenC).toBeNull(); // Blocked!

    // Buyer A completes checkout or releases reservation
    const released = await lockStore.releaseLock(lockKey, tokenA!);
    expect(released).toBe(true);

    // Now Buyer B can successfully acquire the reservation lock
    const tokenBRetry = await lockStore.acquireLock(lockKey, 300);
    expect(tokenBRetry).not.toBeNull();
  });

  it('prevents an unauthorized process from releasing someone elses lock', async () => {
    const lockKey = 'reservation:listing_002';
    const validToken = await lockStore.acquireLock(lockKey, 300);
    expect(validToken).not.toBeNull();

    // Malicious or rogue process tries to release with wrong token
    const wrongTokenRelease = await lockStore.releaseLock(lockKey, 'unauthorized_token_xyz');
    expect(wrongTokenRelease).toBe(false);

    // Lock remains intact for original holder
    const secondAcquire = await lockStore.acquireLock(lockKey, 300);
    expect(secondAcquire).toBeNull();
  });
});
