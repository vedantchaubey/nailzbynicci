// apps/backend/src/modules/discovery/discovery.module.ts
import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service.js';
import { DiscoveryController } from './discovery.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DiscoveryController],
  providers: [DiscoveryService],
  exports: [DiscoveryService],
})
export class DiscoveryModule {}
