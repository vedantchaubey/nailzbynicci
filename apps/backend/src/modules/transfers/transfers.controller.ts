// apps/backend/src/modules/transfers/transfers.controller.ts
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TransfersService } from './transfers.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Transfers & Verification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get('transfers/:orderId')
  @ApiOperation({ summary: 'Get live transfer session state, SLA timers, and confidence breakdown' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Transfer session status' })
  async getTransferSession(
    @Param('orderId') orderId: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.transfersService.getTransferSession(orderId, userId);
  }

  @Post('orders/:id/seller/initiate-transfer')
  @ApiOperation({ summary: 'Seller triggers transfer initiated in BMS / District app' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Transfer marked initiated, buyer acceptance window starts' })
  async initiateTransfer(
    @Param('id') orderId: string,
    @CurrentUser('userId') sellerId: string,
    @Body('proofUploadId') proofUploadId?: string,
  ) {
    return this.transfersService.initiateTransferBySeller(orderId, sellerId, proofUploadId);
  }

  @Post('orders/:id/buyer/confirm-acceptance')
  @ApiOperation({ summary: 'Buyer confirms ticket receipt in-app with friction last-4 digit check' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Buyer confirmation recorded and re-scored' })
  async confirmAcceptance(
    @Param('id') orderId: string,
    @CurrentUser('userId') buyerId: string,
    @Body('last4Digits') last4Digits: string,
    @Body('proofUploadId') proofUploadId?: string,
  ) {
    return this.transfersService.confirmAcceptanceByBuyer(orderId, buyerId, last4Digits, proofUploadId);
  }

  @Post('transfers/:orderId/re-verify')
  @ApiOperation({ summary: 'Trigger transfer re-verification confidence engine evaluation' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Re-evaluated confidence score' })
  async reVerify(
    @Param('orderId') orderId: string,
  ) {
    return this.transfersService.evaluateTransferConfidence(orderId);
  }
}
