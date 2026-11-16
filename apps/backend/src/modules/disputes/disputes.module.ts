// apps/backend/src/modules/disputes/disputes.module.ts
import { Module } from '@nestjs/common';
import { DisputesService } from './disputes.service.js';
import { DisputesController } from './disputes.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { ReputationModule } from '../reputation/reputation.module.js';

@Module({
  imports: [AuthModule, OrdersModule, ReputationModule],
  controllers: [DisputesController],
  providers: [DisputesService],
  exports: [DisputesService],
})
export class DisputesModule {}
