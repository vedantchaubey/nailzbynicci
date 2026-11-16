// apps/backend/src/modules/transfers/interfaces/ownership-signal-provider.interface.ts
import { Order } from '@prisma/client';

export interface ExternalOwnershipSignal {
  provider: string;
  verified: boolean;
  confidenceContribution: number;
  metadata?: Record<string, unknown>;
}

/**
 * Extensible provider interface for pluggable signal sources (e.g., email-parsing, future platform hooks).
 * No fake APIs or simulated external calls.
 */
export interface OwnershipSignalProvider {
  getSignal(order: Order): Promise<ExternalOwnershipSignal | null>;
}
