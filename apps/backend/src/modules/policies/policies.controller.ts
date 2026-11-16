// apps/backend/src/modules/policies/policies.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Headers,
  Ip,
} from '@nestjs/common';
import { PoliciesService } from './policies.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  async getAll() {
    return this.policiesService.getAllCurrentPolicies();
  }

  @Get(':type')
  async getByType(@Param('type') type: string) {
    return this.policiesService.getPolicy(type);
  }

  @Post('consent')
  @UseGuards(JwtAuthGuard)
  async recordConsent(
    @Body() body: { policyType: string; policyVersion: string; context: string },
    @Request() req: any,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.policiesService.recordConsent(
      req.user.id,
      body.policyType,
      body.policyVersion,
      body.context,
      ip,
      userAgent,
    );
  }

  @Get('consent/me')
  @UseGuards(JwtAuthGuard)
  async getMyConsents(@Request() req: any) {
    return this.policiesService.getUserConsents(req.user.id);
  }
}
