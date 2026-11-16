// apps/backend/test/webhook-idempotency.spec.ts

class MockWebhookEventStore {
  private processedEvents = new Set<string>();

  async processWebhookEvent(
    eventId: string,
    action: () => Promise<void>,
  ): Promise<{ processed: boolean; duplicate: boolean }> {
    if (this.processedEvents.has(eventId)) {
      return { processed: false, duplicate: true };
    }

    await action();
    this.processedEvents.add(eventId);
    return { processed: true, duplicate: false };
  }
}

describe('Razorpay Webhook Idempotency', () => {
  let webhookStore: MockWebhookEventStore;
  let executionCount: number;

  beforeEach(() => {
    webhookStore = new MockWebhookEventStore();
    executionCount = 0;
  });

  it('processes a new webhook event once and ignores duplicate deliveries', async () => {
    const eventId = 'evt_payment_captured_12345';
    const mockAction = async () => {
      executionCount++;
    };

    // First arrival
    const firstAttempt = await webhookStore.processWebhookEvent(eventId, mockAction);
    expect(firstAttempt.processed).toBe(true);
    expect(firstAttempt.duplicate).toBe(false);
    expect(executionCount).toBe(1);

    // Duplicate webhook delivery from Razorpay retry queue
    const secondAttempt = await webhookStore.processWebhookEvent(eventId, mockAction);
    expect(secondAttempt.processed).toBe(false);
    expect(secondAttempt.duplicate).toBe(true);
    expect(executionCount).toBe(1); // Action was NOT re-executed!

    // Third attempt
    const thirdAttempt = await webhookStore.processWebhookEvent(eventId, mockAction);
    expect(thirdAttempt.duplicate).toBe(true);
    expect(executionCount).toBe(1);
  });
});
