// apps/backend/src/common/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../modules/prisma/prisma.service.js';
import { AuthenticatedUser } from '../decorators/current-user.decorator.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication token missing or malformed.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authentication token missing.');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync<AuthenticatedUser>(token, { secret });

      // Verify user existence and ban status in database
      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true, role: true, isBanned: true, banReason: true },
      });

      if (!user) {
        throw new UnauthorizedException('User account not found.');
      }

      if (user.isBanned) {
        throw new ForbiddenException(`Your account has been suspended: ${user.banReason || 'Policy violation'}`);
      }

      // Attach user object to request
      (request as any).user = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      return true;
    } catch (err: unknown) {
      if (err instanceof ForbiddenException || err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Invalid or expired authentication session.');
    }
  }
}
