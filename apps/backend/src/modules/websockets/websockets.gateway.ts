// apps/backend/src/modules/websockets/websockets.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  OrderStatus,
  UserRole,
  PROGRESS_MESSAGES,
  WebSocketOrderUpdatePayload,
  WebSocketListingUpdatePayload,
  WebSocketInventoryUpdatePayload,
  WebSocketAdminAlertPayload,
} from '@ticketpass/shared';

interface AuthenticatedSocket extends Socket {
  data: {
    userId?: string;
    email?: string;
    role?: UserRole;
  };
}

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketsGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const authHeader = client.handshake.auth?.token || client.handshake.headers?.authorization;
      if (!authHeader) {
        this.logger.warn(`Client connection rejected: Missing authorization token.`);
        client.disconnect();
        return;
      }

      const token = authHeader.replace(/^Bearer\s+/i, '');
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync<{ userId: string; email: string; role: UserRole }>(
        token,
        { secret },
      );

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, role: true, isBanned: true },
      });

      if (!user || user.isBanned) {
        client.emit('error', { message: 'Account banned or inactive.' });
        client.disconnect();
        return;
      }

      client.data.userId = user.id;
      client.data.email = user.email;
      client.data.role = user.role as unknown as UserRole;

      // Automatically join user personal notification room
      client.join(`user:${user.id}`);

      // If administrator, join admin monitoring room
      if (user.role === (UserRole.ADMIN as string) || user.role === (UserRole.SUPER_ADMIN as string)) {
        client.join('admin');
      }

      this.logger.log(`WS Client Connected: ${user.id} (${user.email})`);
    } catch {
      this.logger.warn('WS Client authentication failed.');
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`WS Client Disconnected: ${client.data.userId || client.id}`);
  }

  @SubscribeMessage('subscribe:order')
  async handleSubscribeOrder(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { orderId: string },
  ) {
    const userId = client.data.userId;
    const userRole = client.data.role;

    if (!userId || !data.orderId) {
      client.emit('error', { message: 'Authentication required to subscribe to order updates.' });
      return;
    }

    // Strict Authorization: User MUST be buyer, seller, or admin
    const order = await this.prisma.order.findUnique({
      where: { id: data.orderId },
      select: { buyerId: true, sellerId: true },
    });

    if (!order) {
      client.emit('error', { message: 'Order not found.' });
      return;
    }

    const isAuthorized =
      order.buyerId === userId ||
      order.sellerId === userId ||
      userRole === UserRole.ADMIN ||
      userRole === UserRole.SUPER_ADMIN;

    if (!isAuthorized) {
      this.logger.warn(`Unauthorized order socket subscription attempt by ${userId} for order ${data.orderId}`);
      client.emit('error', { message: 'Access denied: You are not authorized to monitor this order.' });
      return;
    }

    client.join(`order:${data.orderId}`);
    client.emit('subscribed', { room: `order:${data.orderId}` });
    this.logger.log(`User ${userId} subscribed to order room: order:${data.orderId}`);
  }

  @SubscribeMessage('subscribe-order')
  handleSubscribeOrderDash(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { orderId: string },
  ) {
    return this.handleSubscribeOrder(client, data);
  }

  @SubscribeMessage('subscribe:event')
  handleSubscribeEvent(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { eventId: string },
  ) {
    if (data.eventId) {
      client.join(`event:${data.eventId}`);
      client.emit('subscribed', { room: `event:${data.eventId}` });
    }
  }

  // Server broadcast helpers
  broadcastOrderUpdate(payload: WebSocketOrderUpdatePayload) {
    const progressMessage = PROGRESS_MESSAGES[payload.status] || payload.message;
    const body = {
      ...payload,
      message: progressMessage,
    };
    this.server.to(`order:${payload.orderId}`).emit('order:update', body);
    this.server.to(`order:${payload.orderId}`).emit('order-update', body);
  }

  broadcastListingUpdate(eventId: string, payload: WebSocketListingUpdatePayload) {
    this.server.to(`event:${eventId}`).emit('listing:update', payload);
  }

  broadcastInventoryUpdate(payload: WebSocketInventoryUpdatePayload) {
    this.server.to(`event:${payload.eventId}`).emit('inventory:update', payload);
  }

  broadcastAdminAlert(payload: WebSocketAdminAlertPayload) {
    this.server.to('admin').emit('admin:alert', payload);
  }
}
