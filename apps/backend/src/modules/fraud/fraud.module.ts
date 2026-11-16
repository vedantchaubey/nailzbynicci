// apps/backend/src/modules/fraud/fraud.module.ts
import { Module } from '@nestjs/common';
import { FraudService } from './fraud.service.js';
import { FraudController } from './fraud.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [FraudController],
  providers: [FraudService],
  exports: [FraudService],
})
export class FraudModule {}
