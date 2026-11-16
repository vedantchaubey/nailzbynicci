// apps/backend/src/modules/kyc/kyc.module.ts
import { Module } from '@nestjs/common';
import { KycService } from './kyc.service.js';
import { KycController } from './kyc.controller.js';
import { MockIdentityProvider } from './providers/mock-identity.provider.js';
import { DigiLockerDirectProvider } from './providers/digilocker-direct.provider.js';
import { AggregatorIdentityProvider } from './providers/aggregator-identity.provider.js';
import { MockBankVerificationProvider } from './providers/bank-verification.provider.js';
import { KycVerifiedGuard } from './guards/kyc-verified.guard.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [KycController],
  providers: [
    KycService,
    MockIdentityProvider,
    DigiLockerDirectProvider,
    AggregatorIdentityProvider,
    MockBankVerificationProvider,
    KycVerifiedGuard,
  ],
  exports: [KycService, KycVerifiedGuard],
})
export class KycModule {}
