// apps/backend/src/modules/finance/finance.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FinanceService } from './finance.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole } from '@ticketpass/shared';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('invoices/me')
  @UseGuards(JwtAuthGuard)
  async getMyInvoices(@Request() req: any) {
    return this.financeService.getUserInvoices(req.user.id);
  }

  @Get('invoices/order/:orderId')
  @UseGuards(JwtAuthGuard)
  async getInvoiceByOrder(@Param('orderId') orderId: string, @Request() req: any) {
    const isAdmin = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPER_ADMIN;
    return this.financeService.getInvoiceByOrderId(orderId, req.user.id, isAdmin);
  }

  @Post('invoices/order/:orderId/generate')
  @UseGuards(JwtAuthGuard)
  async generateInvoice(@Param('orderId') orderId: string) {
    return this.financeService.generateInvoicesForOrder(orderId);
  }

  @Get('fees/active')
  async getActiveFees() {
    return this.financeService.getActiveFeeConfig();
  }

  @Post('coupons/validate')
  @UseGuards(JwtAuthGuard)
  async validateCoupon(
    @Body() body: { code: string; orderAmountPaise: number },
    @Request() req: any,
  ) {
    return this.financeService.validateCoupon(body.code, req.user.id, body.orderAmountPaise);
  }

  @Get('admin/reconciliation')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getReconciliation() {
    return this.financeService.getReconciliationSummary();
  }

  @Put('admin/fees')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async updateFees(@Body() body: any) {
    return this.financeService.updateFeeConfig(body);
  }
}
