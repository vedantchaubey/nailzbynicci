// apps/backend/src/modules/listings/listings.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ListingsService } from './listings.service.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { ActivateListingDto } from './dto/activate-listing.dto.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { KycVerifiedGuard } from '../kyc/guards/kyc-verified.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new resale ticket listing (DRAFT + 20% security deposit required)' })
  @ApiResponse({ status: 201, description: 'Listing draft created with security deposit order' })
  async createListing(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateListingDto,
  ) {
    return this.listingsService.createListing(userId, dto);
  }

  @Post(':id/activate')
  @UseGuards(JwtAuthGuard, KycVerifiedGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activate listing after verifying 20% seller deposit payment and DigiLocker KYC' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing activated and visible on marketplace' })
  async activateListing(
    @CurrentUser('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: ActivateListingDto,
  ) {
    return this.listingsService.activateListing(userId, id, dto);
  }

  @Post(':id/reserve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reserve listing for 5 minutes during checkout (atomic Redis lock)' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing reserved' })
  async reserveListing(
    @CurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.listingsService.reserveListing(id, userId);
  }

  @Delete(':id/reserve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Release buyer checkout reservation back to ACTIVE' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Reservation released' })
  async releaseReservation(
    @CurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.listingsService.releaseReservation(id, userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all resale listings created by the authenticated seller' })
  @ApiResponse({ status: 200, description: 'Seller listings' })
  async getMyListings(@CurrentUser('userId') userId: string) {
    return this.listingsService.getMyListings(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single listing detail' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing details' })
  async getListingById(@Param('id') id: string) {
    return this.listingsService.getListingById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove an unreserved and unsold listing' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing removed' })
  async deleteListing(
    @CurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.listingsService.deleteListing(userId, id);
  }
}
