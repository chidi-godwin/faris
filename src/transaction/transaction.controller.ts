import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadQueryRequestExample,
  BezosTransactionListResponseExample,
  DownloadedTransactionsResponseExample,
  RetrieveTransactionError,
  TransactionListResponseExample,
  TransactionResponseExample,
} from './dto/examples/response.example';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Download transactions',
    description: 'Download Transactions from external API and store in DB',
  })
  @ApiResponse({
    status: 201,
    description:
      'The transactions have been successfully downloaded and saved.',
    content: {
      'application/json': {
        examples: {
          'Transactions Downloaded': {
            value: DownloadedTransactionsResponseExample,
          },
        },
      },
    },
  })
  @Post('download')
  async pollTransactions() {
    return this.transactionService.pollTransactions();
  }

  @ApiOperation({
    summary: 'Get all transactions',
    description:
      'Get all transactions filter by date (month and year) and Bezos related',
  })
  @ApiResponse({
    status: 200,
    description: 'The transactions have been successfully retrieved.',
    content: {
      'application/json': {
        examples: {
          'List all transactions (request without query params)': {
            value: TransactionListResponseExample,
            description: 'request without query params',
          },
          'List all transactions for a specific month and year: ': {
            value: TransactionListResponseExample,
            description: 'query: month=1&year=2029',
          },
          'List all bezos related transactions for a specific month and year: ':
            {
              value: BezosTransactionListResponseExample,
              description: 'query: month=1&year=2029&isBezos=true',
            },
          'List all bezos related transactions: ': {
            value: BezosTransactionListResponseExample,
            description: 'query: isBezos=true',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Query Request',
    content: {
      'application/json': {
        examples: {
          'Bad Query Request': {
            value: BadQueryRequestExample,
          },
        },
      },
    },
  })
  @Get()
  async findAll(@Query() filterDto: FilterTransactionDto) {
    return this.transactionService.findAll(filterDto);
  }

  @ApiOperation({
    summary: 'Get a transaction by id',
    description: 'Get a transaction by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Transaction id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully retrieved.',
    content: {
      'application/json': {
        examples: {
          Transaction: {
            value: TransactionResponseExample,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Transaction with specified ID not found',
    content: {
      'application/json': {
        examples: {
          'Transaction Not Found': {
            value: RetrieveTransactionError,
          },
        },
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Mark a transaction as Bezos related',
    description:
      'Mark a transaction as Bezos related. Tnis actions marks all other related transactions from the same merchant as bezos related',
  })
  @ApiParam({
    name: 'id',
    description: 'Transaction id',
    example: 1,
  })
  @ApiParam({
    name: 'flag',
    description: 'Flag to mark transaction as Bezos related',
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The transaction has been successfully marked.',
    content: {
      'application/json': {
        examples: {
          Transaction: {
            value: TransactionResponseExample,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Transaction with specified ID not found',
    content: {
      'application/json': {
        examples: {
          'Transaction Not Found': {
            value: RetrieveTransactionError,
          },
        },
      },
    },
  })
  @Patch('/mark-as-bezos-related/:id/:flag')
  async markTransactionAsBezosRelated(
    @Param('id') id: string,
    @Param('flag', ParseBoolPipe) flag: boolean,
  ) {
    return this.transactionService.markTransactionAsBezosRelated(+id, flag);
  }
}
