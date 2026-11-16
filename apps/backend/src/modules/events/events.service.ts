// apps/backend/src/modules/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueryEventsDto } from './dto/query-events.dto.js';
import { QueryEventListingsDto } from './dto/query-event-listings.dto.js';
import { ListingStatus } from '@ticketpass/shared';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(query: QueryEventsDto) {
    const { city, category, platform, q, page = 1, limit = 20, sort = 'popular' } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      isActive: true,
      date: { gte: new Date() }, // Future events only
    };

    if (city) {
      where.city = { equals: city, mode: 'insensitive' };
    }

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (platform) {
      where.platform = platform;
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { venue: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
      ];
    }

    let orderBy: Record<string, 'asc' | 'desc'> = { date: 'asc' };
    if (sort === 'date_desc') {
      orderBy = { date: 'desc' };
    }

    const [total, events] = await Promise.all([
      this.prisma.event.count({ where }),
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          listings: {
            where: { status: ListingStatus.ACTIVE },
            select: { resalePricePaise: true },
          },
        },
      }),
    ]);

    const items = events.map((event) => {
      const activeListings = event.listings;
      const listingCount = activeListings.length;
      let lowestPricePaise: number | null = null;

      if (listingCount > 0) {
        lowestPricePaise = Math.min(...activeListings.map((l) => l.resalePricePaise));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { listings, ...eventData } = event;
      return {
        ...eventData,
        listingCount,
        lowestPricePaise,
      };
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async findEventByIdOrSlug(identifier: string) {
    let event = await this.prisma.event.findUnique({
      where: { id: identifier },
      include: {
        listings: {
          where: { status: ListingStatus.ACTIVE },
          select: { resalePricePaise: true, section: true },
        },
      },
    });

    if (!event) {
      const term = identifier.replace(/-/g, ' ').trim();
      const firstWord = term.split(' ')[0] || '';
      event = await this.prisma.event.findFirst({
        where: {
          OR: [
            { externalId: identifier },
            { name: { contains: firstWord, mode: 'insensitive' } },
          ],
        },
        include: {
          listings: {
            where: { status: ListingStatus.ACTIVE },
            select: { resalePricePaise: true, section: true },
          },
        },
      });
    }
    return event;
  }

  async getEventById(id: string) {
    const event = await this.findEventByIdOrSlug(id);

    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    const activeListings = event.listings;
    const listingCount = activeListings.length;
    let lowestPricePaise: number | null = null;

    if (listingCount > 0) {
      lowestPricePaise = Math.min(...activeListings.map((l) => l.resalePricePaise));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { listings, ...eventData } = event;
    return {
      ...eventData,
      listingCount,
      lowestPricePaise,
    };
  }

  async getEventListings(eventId: string, query: QueryEventListingsDto) {
    const event = await this.findEventByIdOrSlug(eventId);
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    const realEventId = event.id;

    const where: Record<string, unknown> = {
      eventId: realEventId,
      status: ListingStatus.ACTIVE,
    };

    if (query.section) {
      where.section = { equals: query.section, mode: 'insensitive' };
    }

    if (query.minQty) {
      where.quantity = { gte: query.minQty };
    }

    if (query.maxPrice) {
      where.resalePricePaise = { lte: query.maxPrice };
    }

    if (query.platform) {
      where.platform = query.platform;
    }

    let orderBy: Record<string, 'asc' | 'desc'> = { resalePricePaise: 'asc' };
    if (query.sort === 'price_desc') {
      orderBy = { resalePricePaise: 'desc' };
    }

    const listings = await this.prisma.listing.findMany({
      where,
      orderBy,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            reputation: {
              select: {
                level: true,
                score: true,
                completedSales: true,
              },
            },
          },
        },
      },
    });

    // Compute dynamic badges from real listing attributes
    return listings.map((l) => {
      const tags: string[] = [];
      if (l.quantity === 1) {
        tags.push('Only 1 ticket');
      } else if (l.quantity <= 3) {
        tags.push(`Only ${l.quantity} left`);
      }

      if (l.resalePricePaise <= l.originalPricePaise) {
        tags.push('Best deal');
      } else if (l.resalePricePaise > l.originalPricePaise * 1.5) {
        tags.push('High demand');
      }

      if (l.seller.reputation && l.seller.reputation.completedSales >= 10) {
        tags.push('Top Seller');
      }

      return {
        id: l.id,
        platform: l.platform,
        status: l.status,
        section: l.section,
        row: l.row,
        seats: l.seats,
        quantity: l.quantity,
        originalPricePaise: l.originalPricePaise,
        resalePricePaise: l.resalePricePaise,
        transferWindowOpensAt: l.transferWindowOpensAt,
        tags,
        seller: {
          id: l.seller.id,
          name: l.seller.name,
          level: l.seller.reputation?.level ?? 'NEW',
          score: l.seller.reputation?.score ?? 50.0,
          completedSales: l.seller.reputation?.completedSales ?? 0,
        },
      };
    });
  }

  async getEventSections(eventId: string) {
    const event = await this.findEventByIdOrSlug(eventId);
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    const realEventId = event.id;

    const activeListings = await this.prisma.listing.findMany({
      where: {
        eventId: realEventId,
        status: ListingStatus.ACTIVE,
      },
      select: {
        section: true,
        resalePricePaise: true,
      },
    });

    if (activeListings.length === 0) {
      return [];
    }

    // Group by section
    const sectionMap = new Map<string, number[]>();
    for (const item of activeListings) {
      const prices = sectionMap.get(item.section) || [];
      prices.push(item.resalePricePaise);
      sectionMap.set(item.section, prices);
    }

    // Calculate all prices for percentile tiers
    const allPrices = activeListings.map((l) => l.resalePricePaise).sort((a, b) => a - b);
    const p25 = allPrices[Math.floor(allPrices.length * 0.25)] || allPrices[0];
    const p60 = allPrices[Math.floor(allPrices.length * 0.60)] || allPrices[0];
    const p85 = allPrices[Math.floor(allPrices.length * 0.85)] || allPrices[0];

    const result = Array.from(sectionMap.entries()).map(([section, prices]) => {
      prices.sort((a, b) => a - b);
      const lowestPricePaise = prices[0];
      const medianPricePaise = prices[Math.floor(prices.length / 2)];

      let tier: 'value' | 'mid' | 'premium' | 'vip' = 'mid';
      if (medianPricePaise <= p25) {
        tier = 'value';
      } else if (medianPricePaise <= p60) {
        tier = 'mid';
      } else if (medianPricePaise <= p85) {
        tier = 'premium';
      } else {
        tier = 'vip';
      }

      return {
        section,
        listingCount: prices.length,
        lowestPricePaise,
        medianPricePaise,
        tier,
      };
    });

    return result.sort((a, b) => a.lowestPricePaise - b.lowestPricePaise);
  }
}
