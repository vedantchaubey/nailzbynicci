// apps/backend/src/modules/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { PaymentsController } from './payments.controller.js';
import { PlatformHeldEscrowProvider } from './escrow/platform-held-escrow.provider.js';
import { RouteEscrowProvider } from './escrow/route-escrow.provider.js';
import { AuthModule } from '../auth/auth.module.js';
import { OrdersModule } from '../orders/orders.module.js';

@Module({
  imports: [AuthModule, OrdersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PlatformHeldEscrowProvider, RouteEscrowProvider],
  exports: [PaymentsService, PlatformHeldEscrowProvider, RouteEscrowProvider],
})
export class PaymentsModule {}
