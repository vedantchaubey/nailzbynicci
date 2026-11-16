// apps/backend/src/modules/orders/orders.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Headers,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiHeader } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { KycVerifiedGuard } from '../kyc/guards/kyc-verified.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthenticatedUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(KycVerifiedGuard)
  @ApiOperation({ summary: 'Create a new order from a reserved listing (Requires DigiLocker KYC)' })
  @ApiHeader({ name: 'X-Idempotency-Key', required: true, description: 'Unique idempotency key' })
  @ApiResponse({ status: 201, description: 'Order created with Razorpay order details' })
  async createOrder(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateOrderDto,
    @Headers('x-idempotency-key') idempotencyKey?: string,
    @Headers('x-device-fingerprint') deviceFingerprint?: string,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('X-Idempotency-Key header is strictly required for order creation.');
    }

    return this.ordersService.createOrder(userId, dto, idempotencyKey, deviceFingerprint);
  }

  @Get('me/buying')
  @ApiOperation({ summary: 'List all tickets purchased by the current user' })
  @ApiResponse({ status: 200, description: 'List of buyer orders' })
  async getBuyingOrders(@CurrentUser('userId') userId: string) {
    return this.ordersService.getBuyerOrders(userId);
  }

  @Get('me/selling')
  @ApiOperation({ summary: 'List all ticket sales for the current seller' })
  @ApiResponse({ status: 200, description: 'List of seller orders' })
  async getSellingOrders(@CurrentUser('userId') userId: string) {
    return this.ordersService.getSellerOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details by ID (Ownership protected)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order details' })
  async getOrderById(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.ordersService.getOrderById(id, user.userId, user.role);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel unpaid order during PAYMENT_PENDING state' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order cancelled' })
  async cancelOrder(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.ordersService.cancelOrder(id, userId);
  }

  @Post(':id/wrong-recipient')
  @ApiOperation({ summary: 'Handle wrong recipient transfer recovery flow (Section 23.1)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async handleWrongRecipient(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() body: { details?: string },
  ) {
    return this.ordersService.handleWrongRecipient(id, userId, body.details);
  }
}
