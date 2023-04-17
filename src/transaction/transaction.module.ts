import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MerchantModule } from 'src/merchant/merchant.module';
import { TransactionRepository } from './transaction.dao';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  imports: [MerchantModule, HttpModule, ConfigModule, PrismaModule],
})
export class TransactionModule {}
