// apps/backend/src/modules/policies/policies.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PoliciesService {
  private readonly logger = new Logger(PoliciesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get active policy document by type
   */
  async getPolicy(type: string) {
    const doc = await this.prisma.policyDocument.findFirst({
      where: {
        type: type.toUpperCase(),
        isCurrent: true,
      },
      orderBy: { effectiveFrom: 'desc' },
    });

    if (!doc) {
      throw new NotFoundException(`Policy document ${type} not found`);
    }

    return doc;
  }

  /**
   * List all current policies
   */
  async getAllCurrentPolicies() {
    return this.prisma.policyDocument.findMany({
      where: { isCurrent: true },
      select: {
        id: true,
        type: true,
        version: true,
        title: true,
        effectiveFrom: true,
      },
    });
  }

  /**
   * Record user consent log
   */
  async recordConsent(
    userId: string,
    policyType: string,
    policyVersion: string,
    context: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const log = await this.prisma.consentLog.create({
      data: {
        userId,
        policyType: policyType.toUpperCase(),
        policyVersion,
        context,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });

    this.logger.log(`Recorded consent for user ${userId} on ${policyType} v${policyVersion} [Context: ${context}]`);
    return log;
  }

  /**
   * Get user's consent history
   */
  async getUserConsents(userId: string) {
    return this.prisma.consentLog.findMany({
      where: { userId },
      orderBy: { consentedAt: 'desc' },
    });
  }
}
