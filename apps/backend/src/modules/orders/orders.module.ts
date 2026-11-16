// apps/backend/src/modules/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { OrderStateMachine } from './state-machine/order-state-machine.js';
import { AuthModule } from '../auth/auth.module.js';
import { FraudModule } from '../fraud/fraud.module.js';

@Module({
  imports: [AuthModule, FraudModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderStateMachine],
  exports: [OrdersService, OrderStateMachine],
})
export class OrdersModule {}
