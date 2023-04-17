import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HttpService } from '@nestjs/axios';
import { TransactionRepository } from './transaction.dao';
import { ConfigService } from '@nestjs/config';
import { Transaction } from './dto/transaction.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TransactionService {
  private readonly apiURL;

  constructor(
    private readonly httpService: HttpService,
    private readonly transactionRepository: TransactionRepository,
    private readonly configService: ConfigService,
  ) {
    this.apiURL = configService.get<string>('api.URL');
  }
  async pollTransactions() {
    const transactions = await lastValueFrom(
      this.httpService.get<Transaction[]>(this.apiURL),
    );
    console.log(transactions.data);

    return this.transactionRepository.createFromTransactions(transactions.data);
  }

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
