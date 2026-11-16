// apps/backend/src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { PayoutsModule } from '../payouts/payouts.module.js';

@Module({
  imports: [AuthModule, OrdersModule, PaymentsModule, PayoutsModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
