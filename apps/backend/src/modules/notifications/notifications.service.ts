// apps/backend/src/modules/notifications/notifications.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationType } from '@ticketpass/shared';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    body: string,
    metadata?: Record<string, unknown>,
    orderId?: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, phone: true, name: true },
    });

    if (!user) {
      this.logger.warn(`Cannot send notification: User ${userId} not found.`);
      return null;
    }

    // Persist notification in DB
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        orderId: orderId || null,
        type,
        title,
        body,
        metadata: (metadata || {}) as object,
      },
    });

    // Adapter dispatch: In dev or default configuration, log to console
    const smsProvider = this.configService.get<string>('SMS_PROVIDER') || 'CONSOLE';
    this.logger.log(
      `[Notification Sent via ${smsProvider}] To: ${user.name} (${user.email} | ${user.phone}) | Type: ${type} | Title: "${title}" | Body: "${body}"`,
    );

    return notification;
  }

  async getMyNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new NotFoundException('Notification not found.');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}
