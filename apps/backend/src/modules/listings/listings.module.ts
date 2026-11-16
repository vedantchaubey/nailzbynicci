// apps/backend/src/modules/listings/listings.module.ts
import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { ListingsController } from './listings.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { FraudModule } from '../fraud/fraud.module.js';
import { ReputationModule } from '../reputation/reputation.module.js';

@Module({
  imports: [AuthModule, FraudModule, ReputationModule],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
