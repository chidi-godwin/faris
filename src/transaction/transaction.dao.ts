import { Injectable } from '@nestjs/common';
import { MerchantRepository } from 'src/merchant/merchant.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from './dto/transaction.interface';

@Injectable()
export class TransactionRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly merchantRepository: MerchantRepository,
  ) {}

  async createFromTransactions(transactions: Transaction[]) {
    const createdTransactions = [];
    for (const transaction of transactions) {
      // find or create Merchant
      const merchant = await this.merchantRepository.findByNameOrCreate(
        transaction.merchant_name,
        { name: transaction.merchant_name },
      );

      // Create transaction
      const transactionData = await this.prismaService.transaction.upsert({
        where: {
          id: transaction.id,
        },
        create: {
          id: transaction.id,
          amount: transaction.amount,
          date: new Date(transaction.date),
          merchant: {
            connect: {
              id: merchant.id,
            },
          },
        },
        update: {},
      });

      createdTransactions.push(transactionData);
    }
    return createdTransactions;
  }
}
