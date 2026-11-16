// apps/backend/src/modules/support/support.service.ts
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SupportService {
  private readonly logger = new Logger(SupportService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * List public help articles by category or all
   */
  async getHelpArticles(category?: string) {
    return this.prisma.helpArticle.findMany({
      where: {
        isPublished: true,
        category: category || undefined,
      },
      orderBy: { orderIndex: 'asc' },
    });
  }

  /**
   * Get single help article by slug
   */
  async getHelpArticleBySlug(slug: string) {
    const article = await this.prisma.helpArticle.findUnique({
      where: { slug },
    });

    if (!article) throw new NotFoundException('Help article not found');
    return article;
  }

  /**
   * Vote helpfulness on an article
   */
  async voteArticle(slug: string, helpful: boolean) {
    return this.prisma.helpArticle.update({
      where: { slug },
      data: helpful
        ? { helpfulCount: { increment: 1 } }
        : { unhelpfulCount: { increment: 1 } },
    });
  }

  /**
   * Create support ticket
   */
  async createTicket(
    userId: string,
    dto: {
      category: string;
      subject: string;
      content: string;
      orderId?: string;
      eventId?: string;
      priority?: string;
    },
  ) {
    const count = await this.prisma.supportTicket.count();
    const ticketNumber = `TK-${(10000 + count + 1).toString()}`;

    // Auto-elevate priority if order is within 24 hours of event
    let priority = dto.priority || 'NORMAL';
    if (dto.orderId) {
      const order = await this.prisma.order.findUnique({
        where: { id: dto.orderId },
        include: { listing: { include: { event: true } } },
      });
      if (order?.listing?.event?.date) {
        const hoursUntilEvent =
          (new Date(order.listing.event.date).getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursUntilEvent <= 24 && hoursUntilEvent >= -6) {
          priority = 'HIGH';
        }
      }
    }

    const ticket = await this.prisma.supportTicket.create({
      data: {
        ticketNumber,
        userId,
        orderId: dto.orderId || null,
        eventId: dto.eventId || null,
        category: dto.category,
        subject: dto.subject,
        priority,
        status: 'OPEN',
        messages: {
          create: [
            {
              senderId: userId,
              senderType: 'USER',
              content: dto.content,
            },
          ],
        },
      },
      include: { messages: true },
    });

    this.logger.log(`Created Support Ticket ${ticket.ticketNumber} for user ${userId} [Priority: ${priority}]`);
    return ticket;
  }

  /**
   * Day-of-Event "Entry Problem" Priority Escalation (SLA 15 minutes)
   */
  async reportEntryProblem(userId: string, orderId: string, details: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: { include: { event: true } } },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId) {
      throw new BadRequestException('Only the purchasing buyer can file an entry problem.');
    }

    const ticketNumber = `URGENT-ENTRY-${Date.now().toString().slice(-6)}`;

    // Create URGENT support ticket with 15-min SLA
    const ticket = await this.prisma.supportTicket.create({
      data: {
        ticketNumber,
        userId,
        orderId,
        eventId: order.listing.eventId,
        category: 'DAY_OF_EVENT_ENTRY',
        subject: `URGENT ENTRY DENIAL at ${order.listing.event.venue}`,
        priority: 'URGENT',
        status: 'OPEN',
        slaDueAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
        messages: {
          create: [
            {
              senderId: userId,
              senderType: 'USER',
              content: `[Day of Event Entry Problem Report]\nOrder: #${order.id}\nEvent: ${order.listing.event.name}\nVenue: ${order.listing.event.venue}\nDetails: ${details}`,
            },
            {
              senderId: 'system',
              senderType: 'SYSTEM',
              content: `Alert dispatched to On-Call Turnstile Operations Desk. SLA target: 15 minutes. Buyer Guarantee claim window open.`,
            },
          ],
        },
      },
      include: { messages: true },
    });

    // Also update order status or create dispute record if not already disputed
    const existingDispute = await this.prisma.dispute.findUnique({ where: { orderId } });
    if (!existingDispute) {
      await this.prisma.dispute.create({
        data: {
          orderId,
          raisedById: userId,
          reason: 'DAY_OF_EVENT_ENTRY_DENIED',
          description: details,
          status: 'OPEN',
          evidence: [{ type: 'ENTRY_PROBLEM_REPORT', ticketId: ticket.id, reportedAt: new Date() }],
        },
      });
    }

    this.logger.warn(`[URGENT] Day-of-Event Entry Problem reported for order ${orderId} by user ${userId}`);
    return ticket;
  }

  /**
   * Get user's tickets
   */
  async getUserTickets(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        order: { select: { id: true, status: true, listing: { select: { event: true } } } },
      },
    });
  }

  /**
   * Get single ticket by ID
   */
  async getTicketById(ticketId: string, userId: string, isAdmin = false) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        order: { include: { listing: { include: { event: true } } } },
      },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');
    if (!isAdmin && ticket.userId !== userId) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  /**
   * Add message to a support ticket
   */
  async addMessage(
    ticketId: string,
    senderId: string,
    senderType: 'USER' | 'ADMIN',
    content: string,
    attachmentUrls: string[] = [],
  ) {
    const ticket = await this.prisma.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    const message = await this.prisma.supportMessage.create({
      data: {
        ticketId,
        senderId,
        senderType,
        content,
        attachmentUrls,
      },
    });

    // If user replied, mark waiting admin; if admin replied, mark waiting user
    const newStatus = senderType === 'USER' ? 'IN_PROGRESS' : 'WAITING_USER';
    await this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: newStatus },
    });

    return message;
  }

  /**
   * Admin: List all tickets with filtering
   */
  async getAdminTickets(status?: string, priority?: string) {
    return this.prisma.supportTicket.findMany({
      where: {
        status: status || undefined,
        priority: priority || undefined,
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });
  }
}
