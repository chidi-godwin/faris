import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.dao';
import { HttpService } from '@nestjs/axios';
import { MerchantModule } from '../merchant/merchant.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: TransactionRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        TransactionRepository,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: [] })),
          },
        },
      ],
      imports: [MerchantModule, ConfigModule, PrismaModule],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get(TransactionRepository);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  describe('pollTransactions', () => {
    it('should download transactions from external API', async () => {
      const data = [
        {
          amount: 50.42,
          category: ['Food and Drink', 'Restaurants'],
          date: '2029-01-01',
          merchant_name: 'Crepevine',
          id: 0,
        },
        {
          amount: 19.43,
          category: ['Shops', 'Supermarkets and Groceries'],
          date: '2029-01-03',
          merchant_name: 'Whole Foods',
          id: 1,
        },
      ];

      const mockResponse = {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      const repoData = [
        {
          id: 1,
          amount: 19.43,
          date: '2029-01-03T00:00:00.000Z',
          merchantId: 3,
          merchant: {
            name: 'Whole Foods',
            isBezosRelated: true,
          },
        },
        {
          id: 0,
          amount: 50.42,
          date: '2029-01-01T00:00:00.000Z',
          merchantId: 5,
          merchant: {
            name: 'Crepevine',
            isBezosRelated: false,
          },
        },
      ];

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: mockResponse } as AxiosResponse));

      const repoSpy = jest
        .spyOn(transactionRepository, 'createFromTransactions')
        .mockResolvedValueOnce(repoData);

      const result = await transactionService.pollTransactions();

      expect(repoSpy).toHaveBeenCalled();
      expect(result).toEqual(repoData);
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const data = [
        {
          id: 1,
          amount: 19.43,
          date: '2029-01-03T00:00:00.000Z',
          merchantId: 3,
          merchant: {
            name: 'Whole Foods',
            isBezosRelated: true,
          },
        },
        {
          id: 0,
          amount: 50.42,
          date: '2029-01-01T00:00:00.000Z',
          merchantId: 5,
          merchant: {
            name: 'Crepevine',
            isBezosRelated: false,
          },
        },
      ];

      const repoSpy = jest
        .spyOn(transactionRepository, 'findAll')
        .mockResolvedValueOnce(data as any);

      jest.spyOn(transactionRepository, 'aggregate').mockResolvedValueOnce({
        _sum: {
          amount: 69.85,
        },
      } as any);

      const result = await transactionService.findAll({});

      expect(repoSpy).toHaveBeenCalled();
      expect(result).toEqual({
        transactions: data,
        totalAmount: '69.85',
        percentageOfTotalSpend: '100.0',
        count: 2,
      });
    });
  });
});
