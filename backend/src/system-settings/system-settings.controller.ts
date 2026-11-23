import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../generated/prisma/client.js';
import { SystemSettingsService } from './system-settings.service';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  value: string;
}

export class SyncInstagramFeedDto {
  @IsString()
  @IsOptional()
  feedUrl?: string;
}

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly settingsService: SystemSettingsService) {}

  @Public()
  @Get()
  async getSettings() {
    return this.settingsService.getAllSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateSetting(@Body() dto: UpdateSettingDto) {
    return this.settingsService.setSetting(dto.key, dto.value);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('instagram/sync')
  @HttpCode(HttpStatus.OK)
  async syncInstagramFeed(@Body() dto: SyncInstagramFeedDto) {
    return this.settingsService.syncInstagramFeed(dto?.feedUrl);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('instagram/disconnect')
  @HttpCode(HttpStatus.OK)
  async disconnectInstagramFeed() {
    return this.settingsService.disconnectInstagramFeed();
  }
}
