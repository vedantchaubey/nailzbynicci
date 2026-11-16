// apps/backend/src/modules/queues/queues.module.ts
import { Module } from '@nestjs/common';
import { QueueTasksService } from './queue-tasks.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { ReputationModule } from '../reputation/reputation.module.js';

@Module({
  imports: [OrdersModule, PaymentsModule, NotificationsModule, ReputationModule],
  providers: [QueueTasksService],
  exports: [QueueTasksService],
})
export class QueuesModule {}
