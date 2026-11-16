// apps/backend/src/modules/kyc/kyc.controller.ts
import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { KycService } from './kyc.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Identity Verification (DigiLocker KYC)')
@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post('start')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Initiate DigiLocker OAuth 2.0 PKCE identity verification session' })
  @ApiResponse({ status: 200, description: 'Authorization URL and session ID' })
  async startKyc(
    @CurrentUser('userId') userId: string,
    @Body('redirectTo') redirectTo?: string,
  ) {
    return this.kycService.startKyc(userId, redirectTo);
  }

  @Get('callback')
  @ApiOperation({ summary: 'OAuth 2.0 callback endpoint from DigiLocker / Aggregator' })
  @ApiQuery({ name: 'state', description: 'Session state token' })
  @ApiQuery({ name: 'code', description: 'Authorization code', required: false })
  @ApiQuery({ name: 'error', description: 'Error message if user cancelled', required: false })
  async handleCallback(
    @Query('state') state: string,
    @Query('code') code: string,
    @Query('error') error: string,
    @Res() res: Response,
  ) {
    const result = await this.kycService.handleCallback(state, code, error);
    return res.redirect(result.redirectUrl);
  }

  @Get('status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user identity verification status (masked and DPDP-compliant)' })
  @ApiResponse({ status: 200, description: 'User KYC status summary' })
  async getStatus(@CurrentUser('userId') userId: string) {
    return this.kycService.getKycStatus(userId);
  }

  @Post('withdraw')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Withdraw identity consent and delete personal KYC data under DPDP Act 2023' })
  @ApiResponse({ status: 200, description: 'Consent withdrawn successfully' })
  async withdrawConsent(@CurrentUser('userId') userId: string) {
    await this.kycService.withdrawConsent(userId);
    return { success: true, message: 'Identity verification consent withdrawn. Data removed.' };
  }

  @Post('bank-account/verify')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify seller bank account using penny-drop and KYC name fuzzy matching' })
  @ApiResponse({ status: 200, description: 'Bank verification result and match score' })
  async verifyBankAccount(
    @CurrentUser('userId') userId: string,
    @Body('accountNumber') accountNumber: string,
    @Body('ifsc') ifsc: string,
    @Body('accountHolder') accountHolder: string,
    @Body('upiId') upiId?: string,
  ) {
    return this.kycService.verifyBankAccount(userId, accountNumber, ifsc, accountHolder, upiId);
  }
}
