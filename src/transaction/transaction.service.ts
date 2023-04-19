import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TransactionRepository } from './transaction.dao';
import { ConfigService } from '@nestjs/config';
import { Transaction } from './dto/transaction.interface';
import { lastValueFrom } from 'rxjs';
import { FilterTransactionDto } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionService {
  private readonly apiURL: string;
  private readonly aggregation;

  constructor(
    private readonly httpService: HttpService,
    private readonly transactionRepository: TransactionRepository,
    private readonly configService: ConfigService,
  ) {
    this.apiURL = configService.get<string>('api.URL');
    this.aggregation = this.transactionRepository.aggregate();
  }
  async pollTransactions() {
    const transactions = await lastValueFrom(
      this.httpService.get<Transaction[]>(this.apiURL),
    );

    return this.transactionRepository.createFromTransactions(transactions.data);
  }

  async findAll(filter: FilterTransactionDto) {
    const transactions = await this.transactionRepository.findAll(filter);
    const count = transactions.length;
    const totalAmount = transactions
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);

    const {
      _sum: { amount },
    } = await this.aggregation;

    const percentageOfTotalSpend = (
      (parseInt(totalAmount, 10) / amount) *
      100
    ).toFixed(1);

    return { transactions, totalAmount, percentageOfTotalSpend, count };
  }

  async aggregate() {
    return this.transactionRepository.aggregate();
  }

  async findOne(id: number) {
    return this.transactionRepository.findById(id);
  }

  async markTransactionAsBezosRelated(id: number, flag: boolean) {
    return this.transactionRepository.updateMerchantBezosFlag(id, flag);
  }

  async remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
