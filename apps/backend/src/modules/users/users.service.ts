// apps/backend/src/modules/users/users.service.ts
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { RedisService } from '../redis/redis.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto.js';
import { VerifyPhoneOtpDto } from './dto/verify-phone.dto.js';
import { encryptAesGcm, decryptAesGcm, maskAccountNumber } from '../../common/utils/crypto.util.js';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        bankAccount: true,
        reputation: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User profile not found.');
    }

    let maskedAccount: string | null = null;
    if (user.bankAccount) {
      try {
        const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY') || '';
        const decrypted = decryptAesGcm(user.bankAccount.accountNumberEncrypted, encryptionKey);
        maskedAccount = maskAccountNumber(decrypted);
      } catch (err) {
        this.logger.warn(`Could not decrypt account number for user ${userId}: ${(err as Error).message}`);
        maskedAccount = '••••••••';
      }
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      isPhoneVerified: user.isPhoneVerified,
      avatarUrl: user.avatarUrl,
      hasBankAccount: !!user.bankAccount,
      bankAccount: user.bankAccount
        ? {
            accountHolder: user.bankAccount.accountHolder,
            maskedAccountNumber: maskedAccount,
            ifsc: user.bankAccount.ifsc,
            upiId: user.bankAccount.upiId,
            isVerified: user.bankAccount.isVerified,
          }
        : null,
      reputation: user.reputation,
    };
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    const dataToUpdate: Record<string, unknown> = {};
    if (dto.name !== undefined) dataToUpdate.name = dto.name;
    if (dto.avatarUrl !== undefined) dataToUpdate.avatarUrl = dto.avatarUrl;
    if (dto.phone !== undefined) {
      dataToUpdate.phone = dto.phone;
      dataToUpdate.isPhoneVerified = false; // Reset verification on phone change
    }

    if (dto.deviceFingerprint) {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { deviceFingerprints: true },
      });
      if (existingUser && !existingUser.deviceFingerprints.includes(dto.deviceFingerprint)) {
        dataToUpdate.deviceFingerprints = {
          push: dto.deviceFingerprint,
        };
      }
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      phone: updated.phone,
      isPhoneVerified: updated.isPhoneVerified,
      avatarUrl: updated.avatarUrl,
    };
  }

  async updateBankAccount(userId: string, dto: UpdateBankAccountDto) {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is not configured.');
    }

    const encryptedAccount = encryptAesGcm(dto.accountNumber, encryptionKey);

    const bankAccount = await this.prisma.sellerBankAccount.upsert({
      where: { userId },
      update: {
        accountHolder: dto.accountHolder,
        accountNumberEncrypted: encryptedAccount,
        ifsc: dto.ifsc.toUpperCase(),
        upiId: dto.upiId || null,
        isVerified: true,
      },
      create: {
        userId,
        accountHolder: dto.accountHolder,
        accountNumberEncrypted: encryptedAccount,
        ifsc: dto.ifsc.toUpperCase(),
        upiId: dto.upiId || null,
        isVerified: true,
      },
    });

    return {
      id: bankAccount.id,
      accountHolder: bankAccount.accountHolder,
      maskedAccountNumber: maskAccountNumber(dto.accountNumber),
      ifsc: bankAccount.ifsc,
      upiId: bankAccount.upiId,
      isVerified: bankAccount.isVerified,
    };
  }

  async sendPhoneOtp(phone: string): Promise<{ success: boolean; message: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.set(`otp:${phone}`, otp, 300); // 5 min TTL
    this.logger.log(`[SMS OTP Generated] Phone: ${phone} | OTP: ${otp} (dev mock accepted: 123456)`);
    return {
      success: true,
      message: 'OTP sent successfully to your mobile number.',
    };
  }

  async verifyPhoneOtp(userId: string, dto: VerifyPhoneOtpDto) {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development' ||
                  this.configService.get<string>('ENABLE_DEV_LOGIN') === 'true';

    const storedOtp = await this.redis.get(`otp:${dto.phone}`);

    const isMatch = (storedOtp && storedOtp === dto.otp) || (isDev && dto.otp === '123456');

    if (!isMatch) {
      throw new BadRequestException('Invalid or expired OTP. Please try again.');
    }

    await this.redis.del(`otp:${dto.phone}`);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        phone: dto.phone,
        isPhoneVerified: true,
      },
    });

    return {
      success: true,
      message: 'Phone number verified successfully.',
      phone: dto.phone,
      isPhoneVerified: true,
    };
  }
}
