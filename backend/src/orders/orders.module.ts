import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RootfinSyncService } from './rootfin-sync.service';

@Module({
  imports: [PrismaModule, UsersModule, EmailModule],
  providers: [OrdersService, RootfinSyncService],
  controllers: [OrdersController],
  exports: [OrdersService, RootfinSyncService],
})
export class OrdersModule {}
