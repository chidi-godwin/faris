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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('download')
  async pollTransactions() {
    return this.transactionService.pollTransactions();
  }

  @Get()
  findAll(@Query() filterDto: FilterTransactionDto) {
    return this.transactionService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch('/mark-as-bezos-related/:id/:flag')
  async markTransactionAsBezosRelated(
    @Param('id') id: string,
    @Param('flag', ParseBoolPipe) flag: boolean,
  ) {
    return this.transactionService.markTransactionAsBezosRelated(+id, flag);
  }
}
