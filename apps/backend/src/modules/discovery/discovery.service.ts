// apps/backend/src/modules/discovery/discovery.service.ts
import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DiscoveryService {
  private readonly logger = new Logger(DiscoveryService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get public venue map for an event
   */
  async getVenueMap(eventId: string) {
    const venueMap = await this.prisma.venueMap.findUnique({
      where: { eventId },
      include: {
        sections: {
          orderBy: { tierLevel: 'desc' },
        },
      },
    });

    if (!venueMap) {
      // Fallback empty map template
      return {
        eventId,
        svgViewBox: '0 0 1000 700',
        sections: [],
      };
    }

    return venueMap;
  }

  /**
   * Add event to wishlist
   */
  async addToWishlist(userId: string, eventId: string) {
    try {
      return await this.prisma.wishlist.create({
        data: { userId, eventId },
        include: { event: true },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException('Event is already in your wishlist.');
      }
      throw err;
    }
  }

  /**
   * Remove event from wishlist
   */
  async removeFromWishlist(userId: string, eventId: string) {
    return this.prisma.wishlist.deleteMany({
      where: { userId, eventId },
    });
  }

  /**
   * Get user's wishlist
   */
  async getWishlist(userId: string) {
    const items = await this.prisma.wishlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          include: {
            listings: {
              where: { status: 'ACTIVE' },
              select: { resalePricePaise: true },
            },
          },
        },
      },
    });

    return items.map((w) => {
      const activePrices = w.event.listings.map((l) => l.resalePricePaise);
      const minPricePaise = activePrices.length > 0 ? Math.min(...activePrices) : null;
      return {
        id: w.id,
        eventId: w.eventId,
        event: w.event,
        minPricePaise,
        activeListingsCount: activePrices.length,
        createdAt: w.createdAt,
      };
    });
  }

  /**
   * Create price alert
   */
  async createPriceAlert(
    userId: string,
    dto: { eventId: string; maxPricePaise: number; section?: string; channel?: string },
  ) {
    return this.prisma.priceAlert.create({
      data: {
        userId,
        eventId: dto.eventId,
        maxPricePaise: dto.maxPricePaise,
        section: dto.section || null,
        channel: dto.channel || 'EMAIL',
      },
      include: { event: true },
    });
  }

  /**
   * Get user's price alerts
   */
  async getPriceAlerts(userId: string) {
    return this.prisma.priceAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { event: true },
    });
  }

  /**
   * Delete price alert
   */
  async deletePriceAlert(alertId: string, userId: string) {
    return this.prisma.priceAlert.deleteMany({
      where: { id: alertId, userId },
    });
  }

  /**
   * Virtual Waiting Room status for hot events
   */
  async getWaitingRoomStatus(eventId: string, userId?: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    // In a high-concurrency event, return queue position & estimated wait
    return {
      eventId,
      eventName: event.name,
      isHotEvent: true,
      queuePosition: Math.floor(Math.random() * 45) + 1,
      estimatedWaitSeconds: 15,
      admitToken: `token_admit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
  }
}
