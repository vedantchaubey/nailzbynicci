// apps/backend/src/modules/discovery/discovery.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiscoveryService } from './discovery.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';

@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get('events/:id/venue-map')
  async getVenueMap(@Param('id') eventId: string) {
    return this.discoveryService.getVenueMap(eventId);
  }

  @Get('events/:id/waiting-room')
  async getWaitingRoom(@Param('id') eventId: string, @Request() req: any) {
    return this.discoveryService.getWaitingRoomStatus(eventId, req?.user?.id);
  }

  // Wishlist
  @Get('wishlist')
  @UseGuards(JwtAuthGuard)
  async getWishlist(@Request() req: any) {
    return this.discoveryService.getWishlist(req.user.id);
  }

  @Post('wishlist/:eventId')
  @UseGuards(JwtAuthGuard)
  async addToWishlist(@Param('eventId') eventId: string, @Request() req: any) {
    return this.discoveryService.addToWishlist(req.user.id, eventId);
  }

  @Delete('wishlist/:eventId')
  @UseGuards(JwtAuthGuard)
  async removeFromWishlist(@Param('eventId') eventId: string, @Request() req: any) {
    return this.discoveryService.removeFromWishlist(req.user.id, eventId);
  }

  // Price Alerts
  @Get('alerts/price')
  @UseGuards(JwtAuthGuard)
  async getPriceAlerts(@Request() req: any) {
    return this.discoveryService.getPriceAlerts(req.user.id);
  }

  @Post('alerts/price')
  @UseGuards(JwtAuthGuard)
  async createPriceAlert(@Body() body: any, @Request() req: any) {
    return this.discoveryService.createPriceAlert(req.user.id, body);
  }

  @Delete('alerts/price/:id')
  @UseGuards(JwtAuthGuard)
  async deletePriceAlert(@Param('id') alertId: string, @Request() req: any) {
    return this.discoveryService.deletePriceAlert(alertId, req.user.id);
  }
}
