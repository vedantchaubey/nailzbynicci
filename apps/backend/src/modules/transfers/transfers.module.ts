// apps/backend/src/modules/transfers/transfers.module.ts
import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service.js';
import { TransfersController } from './transfers.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PayoutsModule } from '../payouts/payouts.module.js';

@Module({
  imports: [AuthModule, OrdersModule, PayoutsModule],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
