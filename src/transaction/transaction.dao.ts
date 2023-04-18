import { Injectable } from '@nestjs/common';
import { MerchantRepository } from 'src/merchant/merchant.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from './dto/transaction.interface';
import { FilterTransactionDto } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionRepository {
  private readonly include;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly merchantRepository: MerchantRepository,
  ) {
    this.include = {
      merchant: {
        select: {
          name: true,
          isBezosRelated: true,
        },
      },
    };
  }

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

  async findAll(filter: FilterTransactionDto) {
    return this.prismaService.transaction.findMany({
      where: {
        date: {
          gte:
            filter.year && filter.month
              ? new Date(filter.year, filter.month - 1)
              : undefined,
          lte:
            filter.year && filter.month
              ? new Date(filter.year, filter.month)
              : undefined,
        },
        merchant: {
          isBezosRelated: filter.isBezos,
        },
      },
      include: this.include,
      orderBy: [
        {
          date: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });
  }

  async aggregate() {
    return this.prismaService.transaction.aggregate({
      _sum: {
        amount: true,
      },
      _count: true,
    });
  }

  async updateMerchantBezosFlag(id: number, flag: boolean) {
    return this.prismaService.transaction.update({
      where: {
        id,
      },
      data: {
        merchant: {
          update: {
            isBezosRelated: flag,
          },
        },
      },
      include: this.include,
    });
  }

  async findById(id: number) {
    return this.prismaService.transaction.findUniqueOrThrow({
      where: {
        id,
      },
      include: this.include,
    });
  }
}
