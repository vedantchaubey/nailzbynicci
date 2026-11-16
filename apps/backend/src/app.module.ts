// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './modules/prisma/prisma.module.js';
import { RedisModule } from './modules/redis/redis.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { EventsModule } from './modules/events/events.module.js';
import { FraudModule } from './modules/fraud/fraud.module.js';
import { ReputationModule } from './modules/reputation/reputation.module.js';
import { UploadsModule } from './modules/uploads/uploads.module.js';
import { ListingsModule } from './modules/listings/listings.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { PayoutsModule } from './modules/payouts/payouts.module.js';
import { TransfersModule } from './modules/transfers/transfers.module.js';
import { DisputesModule } from './modules/disputes/disputes.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { QueuesModule } from './modules/queues/queues.module.js';
import { WebSocketsModule } from './modules/websockets/websockets.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { KycModule } from './modules/kyc/kyc.module.js';
import { FinanceModule } from './modules/finance/finance.module.js';
import { SupportModule } from './modules/support/support.module.js';
import { PoliciesModule } from './modules/policies/policies.module.js';
import { DiscoveryModule } from './modules/discovery/discovery.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120,
      },
    ]),
    ScheduleModule.forRoot(),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    EventsModule,
    FraudModule,
    ReputationModule,
    UploadsModule,
    ListingsModule,
    OrdersModule,
    PaymentsModule,
    PayoutsModule,
    TransfersModule,
    DisputesModule,
    NotificationsModule,
    QueuesModule,
    WebSocketsModule,
    AdminModule,
    KycModule,
    FinanceModule,
    SupportModule,
    PoliciesModule,
    DiscoveryModule,
  ],
})
export class AppModule {}
