// apps/backend/src/modules/disputes/disputes.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DisputesService } from './disputes.service.js';
import { OpenDisputeDto } from './dto/open-dispute.dto.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Disputes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post('orders/:id/dispute')
  @ApiOperation({ summary: 'Open dispute on an active order (freezes payout immediately)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 201, description: 'Dispute opened and order transitioned to DISPUTED' })
  async openDispute(
    @Param('id') orderId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: OpenDisputeDto,
  ) {
    return this.disputesService.openDispute(orderId, userId, dto);
  }

  @Get('disputes/me')
  @ApiOperation({ summary: 'List all disputes involving current user' })
  @ApiResponse({ status: 200, description: 'User dispute records' })
  async getMyDisputes(@CurrentUser('userId') userId: string) {
    return this.disputesService.getMyDisputes(userId);
  }

  @Post('disputes/:id/evidence')
  @ApiOperation({ summary: 'Append screenshot or statement evidence to active dispute' })
  @ApiParam({ name: 'id', description: 'Dispute ID' })
  @ApiResponse({ status: 200, description: 'Evidence attached' })
  async addEvidence(
    @Param('id') disputeId: string,
    @CurrentUser('userId') userId: string,
    @Body() evidenceData: Record<string, unknown>,
  ) {
    return this.disputesService.addEvidence(disputeId, userId, evidenceData);
  }
}
