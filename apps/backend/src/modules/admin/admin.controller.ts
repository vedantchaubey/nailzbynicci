// apps/backend/src/modules/admin/admin.controller.ts
import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole, OrderStatus, DisputeStatus } from '@ticketpass/shared';

@ApiTags('Admin Oversight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Platform KPI overview (Total escrow ₹, pending payouts, order counts)' })
  @ApiResponse({ status: 200, description: 'Overview metrics' })
  async getOverview() {
    return this.adminService.getOverview();
  }

  @Get('orders')
  @ApiOperation({ summary: 'List orders across platform with pagination and status filter' })
  @ApiQuery({ name: 'status', enum: OrderStatus, required: false })
  @ApiResponse({ status: 200, description: 'Order list' })
  async getOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: OrderStatus,
  ) {
    return this.adminService.getOrders(Number(page), Number(limit), status);
  }

  @Get('disputes')
  @ApiOperation({ summary: 'List all open customer disputes' })
  @ApiResponse({ status: 200, description: 'Dispute list' })
  async getDisputes() {
    return this.adminService.getDisputes();
  }

  @Post('disputes/:id/resolve')
  @ApiOperation({ summary: 'Resolve a customer dispute (auto-refunds buyer or releases payout to seller)' })
  @ApiParam({ name: 'id', description: 'Dispute ID' })
  @ApiResponse({ status: 200, description: 'Dispute resolved' })
  async resolveDispute(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body('resolution') resolution: DisputeStatus,
    @Body('adminNote') adminNote: string,
  ) {
    return this.adminService.resolveDispute(id, adminId, resolution, adminNote);
  }

  @Post('transfers/:id/override')
  @ApiOperation({ summary: 'Administrative override on transfer session (APPROVE or REJECT)' })
  @ApiParam({ name: 'id', description: 'Transfer Session ID' })
  @ApiResponse({ status: 200, description: 'Override applied' })
  async overrideTransfer(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body('action') action: 'APPROVE' | 'REJECT',
    @Body('reason') reason: string,
  ) {
    return this.adminService.overrideTransfer(id, adminId, action, reason);
  }

  @Post('users/:id/ban')
  @ApiOperation({ summary: 'Suspend user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User banned' })
  async banUser(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body('reason') reason?: string,
  ) {
    return this.adminService.setUserBanStatus(id, adminId, true, reason);
  }

  @Post('users/:id/unban')
  @ApiOperation({ summary: 'Restore suspended user account' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User restored' })
  async unbanUser(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
  ) {
    return this.adminService.setUserBanStatus(id, adminId, false);
  }

  @Post('orders/:id/force-refund')
  @ApiOperation({ summary: 'Emergency force-refund on an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order force refunded' })
  async forceRefund(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body('reason') reason: string,
  ) {
    return this.adminService.forceRefundOrder(id, adminId, reason);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Audit log trail with entity filters' })
  @ApiQuery({ name: 'entity', required: false })
  @ApiResponse({ status: 200, description: 'Audit log entries' })
  async getAuditLogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
    @Query('entity') entity?: string,
  ) {
    return this.adminService.getAuditLogs(Number(page), Number(limit), entity);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Platform payout transaction history' })
  @ApiResponse({ status: 200, description: 'Payout records' })
  async getPayouts() {
    return this.adminService.getPayouts();
  }

  @Post('listings/:id/remove')
  @ApiOperation({ summary: 'Takedown a listing' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing removed' })
  async removeListing(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body('reason') reason: string,
  ) {
    return this.adminService.removeListing(id, adminId, reason);
  }

  @Get('escrow')
  @ApiOperation({ summary: 'Escrow account audit and active holding amounts' })
  @ApiResponse({ status: 200, description: 'Escrow balances' })
  async getEscrow() {
    return this.adminService.getEscrowBalances();
  }

  // --- Section 21: KYC Administration Endpoints ---
  @Get('kyc')
  @ApiOperation({ summary: 'List user identity verification records with filters' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'provider', required: false })
  @ApiQuery({ name: 'rejectionReason', required: false })
  @ApiResponse({ status: 200, description: 'KYC records list' })
  async getKycRecords(
    @Query('status') status?: string,
    @Query('provider') provider?: string,
    @Query('rejectionReason') rejectionReason?: string,
  ) {
    return this.adminService.getKycRecords(status, provider, rejectionReason);
  }

  @Get('kyc/:userId')
  @ApiOperation({ summary: 'Get full KYC verification details for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User KYC details' })
  async getKycRecordByUserId(@Param('userId') userId: string) {
    return this.adminService.getKycRecordByUserId(userId);
  }

  @Post('kyc/:userId/force-reverify')
  @ApiOperation({ summary: 'Force-expire user KYC and require re-verification' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async forceReverify(
    @Param('userId') userId: string,
    @CurrentUser('userId') adminId: string,
  ) {
    return this.adminService.forceReverify(userId, adminId);
  }

  @Post('kyc/:userId/manual-approve')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Manually approve user KYC (Super-Admin only, audited)' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Approved manually' })
  async manualApproveKyc(
    @Param('userId') userId: string,
    @CurrentUser('userId') adminId: string,
    @Body('reason') reason: string,
  ) {
    return this.adminService.manualApproveKyc(userId, adminId, reason);
  }

  @Get('blocked-identities')
  @ApiOperation({ summary: 'List identity fingerprints blocked from registering or transacting' })
  @ApiResponse({ status: 200, description: 'Blocked identity fingerprints' })
  async getBlockedIdentities() {
    return this.adminService.getBlockedIdentities();
  }
}
