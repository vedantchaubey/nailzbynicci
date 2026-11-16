// apps/backend/src/modules/support/support.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SupportService } from './support.service.js';
import { JwtAuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole } from '@ticketpass/shared';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  // Public help articles
  @Get('articles')
  async getArticles(@Query('category') category?: string) {
    return this.supportService.getHelpArticles(category);
  }

  @Get('articles/:slug')
  async getArticleBySlug(@Param('slug') slug: string) {
    return this.supportService.getHelpArticleBySlug(slug);
  }

  @Post('articles/:slug/vote')
  async voteArticle(@Param('slug') slug: string, @Body() body: { helpful: boolean }) {
    return this.supportService.voteArticle(slug, body.helpful);
  }

  // Authenticated tickets
  @Get('tickets/me')
  @UseGuards(JwtAuthGuard)
  async getMyTickets(@Request() req: any) {
    return this.supportService.getUserTickets(req.user.id);
  }

  @Post('tickets')
  @UseGuards(JwtAuthGuard)
  async createTicket(@Body() body: any, @Request() req: any) {
    return this.supportService.createTicket(req.user.id, body);
  }

  @Post('tickets/entry-problem')
  @UseGuards(JwtAuthGuard)
  async reportEntryProblem(
    @Body() body: { orderId: string; details: string },
    @Request() req: any,
  ) {
    return this.supportService.reportEntryProblem(req.user.id, body.orderId, body.details);
  }

  @Get('tickets/:id')
  @UseGuards(JwtAuthGuard)
  async getTicketById(@Param('id') id: string, @Request() req: any) {
    const isAdmin = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPER_ADMIN;
    return this.supportService.getTicketById(id, req.user.id, isAdmin);
  }

  @Post('tickets/:id/messages')
  @UseGuards(JwtAuthGuard)
  async addMessage(
    @Param('id') id: string,
    @Body() body: { content: string; attachmentUrls?: string[] },
    @Request() req: any,
  ) {
    const isAdmin = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPER_ADMIN;
    return this.supportService.addMessage(
      id,
      req.user.id,
      isAdmin ? 'ADMIN' : 'USER',
      body.content,
      body.attachmentUrls || [],
    );
  }

  // Admin ticket management
  @Get('admin/tickets')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getAdminTickets(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.supportService.getAdminTickets(status, priority);
  }
}
