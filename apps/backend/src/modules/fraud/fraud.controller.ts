// apps/backend/src/modules/fraud/fraud.controller.ts
import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FraudService } from './fraud.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@ticketpass/shared';

@ApiTags('Fraud & Security')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fraud')
export class FraudController {
  constructor(private readonly fraudService: FraudService) {}

  @Get('flags')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'List all unresolved fraud flags (Admin only)' })
  @ApiResponse({ status: 200, description: 'Active fraud alerts' })
  async getFlags() {
    return this.fraudService.getUnresolvedFlags();
  }

  @Post('flags/:id/resolve')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Resolve a fraud alert (Admin only)' })
  @ApiResponse({ status: 200, description: 'Flag marked as resolved' })
  async resolveFlag(@Param('id') id: string, @CurrentUser('userId') adminId: string) {
    return this.fraudService.resolveFlag(id, adminId);
  }
}
