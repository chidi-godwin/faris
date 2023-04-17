import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MerchantRepository } from './merchant.dao';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService, MerchantRepository],
  exports: [MerchantRepository],
  imports: [PrismaModule],
})
export class MerchantModule {}
