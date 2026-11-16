// apps/backend/src/modules/websockets/websockets.module.ts
import { Global, Module } from '@nestjs/common';
import { WebSocketsGateway } from './websockets.gateway.js';
import { AuthModule } from '../auth/auth.module.js';

@Global()
@Module({
  imports: [AuthModule],
  providers: [WebSocketsGateway],
  exports: [WebSocketsGateway],
})
export class WebSocketsModule {}
