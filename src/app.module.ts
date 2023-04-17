import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { MerchantModule } from './merchant/merchant.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TransactionModule,
    MerchantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
