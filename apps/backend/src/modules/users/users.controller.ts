// apps/backend/src/modules/users/users.controller.ts
import { Controller, Get, Patch, Put, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto.js';
import { SendPhoneOtpDto, VerifyPhoneOtpDto } from './dto/verify-phone.dto.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile details' })
  async getMe(@CurrentUser('userId') userId: string) {
    return this.usersService.getMe(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update profile details' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  async updateMe(@CurrentUser('userId') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(userId, dto);
  }

  @Put('me/bank-account')
  @ApiOperation({ summary: 'Save seller bank account or UPI details (AES-256 encrypted at rest)' })
  @ApiResponse({ status: 200, description: 'Bank account registered successfully' })
  async updateBankAccount(@CurrentUser('userId') userId: string, @Body() dto: UpdateBankAccountDto) {
    return this.usersService.updateBankAccount(userId, dto);
  }

  @Post('me/phone/send-otp')
  @ApiOperation({ summary: 'Send OTP for mobile number verification' })
  @ApiResponse({ status: 200, description: 'OTP dispatched' })
  async sendOtp(@Body() dto: SendPhoneOtpDto) {
    return this.usersService.sendPhoneOtp(dto.phone);
  }

  @Post('me/phone/verify')
  @ApiOperation({ summary: 'Verify OTP to complete phone registration (dev accepts 123456)' })
  @ApiResponse({ status: 200, description: 'Phone number verified' })
  async verifyOtp(@CurrentUser('userId') userId: string, @Body() dto: VerifyPhoneOtpDto) {
    return this.usersService.verifyPhoneOtp(userId, dto);
  }
}
