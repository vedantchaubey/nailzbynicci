// apps/backend/src/modules/policies/policies.module.ts
import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service.js';
import { PoliciesController } from './policies.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PoliciesController],
  providers: [PoliciesService],
  exports: [PoliciesService],
})
export class PoliciesModule {}
