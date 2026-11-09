import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { CustomersService } from './customers.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getCustomers() {
    return this.customersService.findAll();
  }

  @Get('sessions')
  async getActiveSessions() {
    return this.customersService.getActiveSessions();
  }

  @Delete('sessions/:sessionId')
  async revokeSession(@Param('sessionId') sessionId: string) {
    return this.customersService.revokeSession(sessionId);
  }

  @Delete(':id/sessions')
  async revokeAllUserSessions(@Param('id') userId: string) {
    return this.customersService.revokeAllUserSessions(userId);
  }

  @Get(':id')
  async getCustomerDetails(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
}
