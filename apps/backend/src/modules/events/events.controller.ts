// apps/backend/src/modules/events/events.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventsService } from './events.service.js';
import { QueryEventsDto } from './dto/query-events.dto.js';
import { QueryEventListingsDto } from './dto/query-event-listings.dto.js';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Browse events with search, city, category, and platform filters' })
  @ApiResponse({ status: 200, description: 'Paginated list of upcoming events' })
  async getEvents(@Query() query: QueryEventsDto) {
    return this.eventsService.getEvents(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event metadata, price range, and active listing counts' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event details' })
  async getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Get(':id/listings')
  @ApiOperation({ summary: 'Get available resale listings for an event with sorting and filters' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'List of verified active listings' })
  async getEventListings(@Param('id') id: string, @Query() query: QueryEventListingsDto) {
    return this.eventsService.getEventListings(id, query);
  }

  @Get(':id/sections')
  @ApiOperation({ summary: 'Get stadium / venue section price statistics for interactive SVG map' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Section aggregates with price tiers' })
  async getEventSections(@Param('id') id: string) {
    return this.eventsService.getEventSections(id);
  }
}
