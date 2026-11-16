// apps/backend/src/modules/kyc/guards/kyc-verified.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { KycStatus } from '@ticketpass/shared';

@Injectable()
export class KycVerifiedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.userId) {
      throw new ForbiddenException({
        code: 'UNAUTHORIZED',
        message: 'Authentication is required.',
      });
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.userId },
      select: { kycStatus: true, kycVerifiedAt: true, isBanned: true },
    });

    if (!dbUser || dbUser.isBanned) {
      throw new ForbiddenException({
        code: 'ACCOUNT_BANNED',
        message: 'This account is restricted from performing transactions.',
      });
    }

    if (dbUser.kycStatus !== KycStatus.VERIFIED) {
      throw new ForbiddenException({
        code: 'KYC_REQUIRED',
        message: 'Identity verification via DigiLocker is required to continue.',
        currentStatus: dbUser.kycStatus,
      });
    }

    return true;
  }
}
