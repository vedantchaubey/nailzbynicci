// apps/backend/src/modules/payouts/payouts.module.ts
import { Module } from '@nestjs/common';
import { PayoutsService } from './payouts.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { ReputationModule } from '../reputation/reputation.module.js';

@Module({
  imports: [OrdersModule, PaymentsModule, ReputationModule],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
