// apps/backend/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { SessionExchangeDto } from './dto/session-exchange.dto.js';
import { UserRole } from '@ticketpass/shared';

interface ClerkJwtPayload {
  sub: string;
  email?: string;
  email_address?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  picture?: string;
  image_url?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private jwks?: jwksClient.JwksClient;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const jwksUri = this.configService.get<string>('CLERK_JWKS_URL');
    if (jwksUri) {
      this.jwks = jwksClient({
        jwksUri,
        cache: true,
        rateLimit: true,
      });
    }
  }

  async exchangeSession(dto: SessionExchangeDto): Promise<{ accessToken: string; user: Record<string, unknown> }> {
    const enableDevLogin = this.configService.get<string>('ENABLE_DEV_LOGIN') === 'true';

    // 1. Dev Mode Login Switcher (bypasses Clerk for seamless local testing)
    if (enableDevLogin && dto.devEmail) {
      this.logger.log(`Dev login bypass requested for email: ${dto.devEmail}`);
      let user = await this.prisma.user.findUnique({
        where: { email: dto.devEmail },
        include: { reputation: true, bankAccount: true },
      });

      if (!user) {
        // Auto-provision dev user if not already in DB
        const role = dto.devRole === 'ADMIN' ? UserRole.ADMIN : UserRole.USER;
        user = await this.prisma.user.create({
          data: {
            clerkId: `dev_${dto.devEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
            email: dto.devEmail,
            name: dto.devEmail.split('@')[0].replace('.', ' ').toUpperCase(),
            role,
            isPhoneVerified: true,
            reputation: {
              create: {
                level: 'TRUSTED',
                score: 85.0,
                totalListings: 5,
                completedSales: 5,
              },
            },
          },
          include: { reputation: true, bankAccount: true },
        });
      }

      if (user.isBanned) {
        throw new ForbiddenException(`Account suspended: ${user.banReason}`);
      }

      const accessToken = this.generateInternalJwt(user.id, user.email, user.name, user.role as unknown as UserRole);
      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          isPhoneVerified: user.isPhoneVerified,
          avatarUrl: user.avatarUrl,
          hasBankAccount: !!user.bankAccount,
          reputationScore: user.reputation?.score ?? 50.0,
          sellerLevel: user.reputation?.level ?? 'NEW',
        },
      };
    }

    // 2. Production Clerk Token Exchange
    if (!dto.clerkToken) {
      throw new UnauthorizedException('Clerk authentication token is required.');
    }

    const clerkClaims = await this.verifyClerkToken(dto.clerkToken);
    const email = clerkClaims.email || clerkClaims.email_address;
    if (!email) {
      throw new UnauthorizedException('Clerk token missing email claim.');
    }

    const name = clerkClaims.name || `${clerkClaims.first_name || ''} ${clerkClaims.last_name || ''}`.trim() || email.split('@')[0];
    const avatarUrl = clerkClaims.picture || clerkClaims.image_url || null;

    // Upsert User in database
    const user = await this.prisma.user.upsert({
      where: { clerkId: clerkClaims.sub },
      update: {
        email,
        name,
        avatarUrl,
      },
      create: {
        clerkId: clerkClaims.sub,
        email,
        name,
        avatarUrl,
        role: UserRole.USER,
        reputation: {
          create: {
            level: 'NEW',
            score: 50.0,
          },
        },
      },
      include: {
        bankAccount: true,
        reputation: true,
      },
    });

    if (user.isBanned) {
      throw new ForbiddenException(`Account suspended: ${user.banReason}`);
    }

    const accessToken = this.generateInternalJwt(user.id, user.email, user.name, user.role as unknown as UserRole);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        isPhoneVerified: user.isPhoneVerified,
        avatarUrl: user.avatarUrl,
        hasBankAccount: !!user.bankAccount,
        reputationScore: user.reputation?.score ?? 50.0,
        sellerLevel: user.reputation?.level ?? 'NEW',
      },
    };
  }

  private async verifyClerkToken(token: string): Promise<ClerkJwtPayload> {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header.kid) {
      throw new UnauthorizedException('Invalid Clerk JWT header.');
    }

    if (!this.jwks) {
      // In local development if JWKS is not configured, decode directly
      return decoded.payload as ClerkJwtPayload;
    }

    try {
      const key = await this.jwks.getSigningKey(decoded.header.kid);
      const signingKey = key.getPublicKey();
      const verified = jwt.verify(token, signingKey) as ClerkJwtPayload;
      return verified;
    } catch (err) {
      this.logger.error(`Clerk JWKS token verification failed: ${(err as Error).message}`);
      throw new UnauthorizedException('Clerk session signature verification failed.');
    }
  }

  generateInternalJwt(userId: string, email: string, name: string, role: UserRole): string {
    const payload = { userId, email, name, role };
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { secret, expiresIn: '7d' });
  }

  async getMe(userId: string): Promise<Record<string, unknown>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        bankAccount: true,
        reputation: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
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
            ifsc: user.bankAccount.ifsc,
            upiId: user.bankAccount.upiId,
            isVerified: user.bankAccount.isVerified,
          }
        : null,
      reputation: user.reputation,
    };
  }
}
