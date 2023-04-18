import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateBezosMerchantRespnoseExample,
  CreateMerchantRespnoseExample,
  CreateMerchantDuplicateErrorExample,
  MerchantListResponseExample,
  UpdateMerchantNameResponseExample,
  MarkMerchantAsBezosRelatedResponseExample,
} from './dto/examples/response.example';

@ApiTags('Merchants')
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @ApiOperation({
    summary: 'Merchant Creation',
    description: 'Create a new merchant',
  })
  @ApiResponse({
    status: 201,
    description: 'The merchant record has been successfully created.',
    content: {
      'application/json': {
        examples: {
          'Merchant Created': {
            value: CreateMerchantRespnoseExample,
          },
          'Bezos Related Merchant Created': {
            value: CreateBezosMerchantRespnoseExample,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '',
    content: {
      'application/json': {
        examples: {
          'Error: Duplicate entry for name': {
            value: CreateMerchantDuplicateErrorExample,
          },
        },
      },
    },
  })
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @ApiOperation({
    summary: 'Merchant Listing',
    description: 'List all merchants',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of merchants has been successfully retrieved.',
    content: {
      'application/json': {
        examples: {
          'List of merchants': {
            value: MerchantListResponseExample,
          },
        },
      },
    },
  })
  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  @ApiOperation({
    summary: 'Merchant Retrieval',
    description: 'Retrieve a merchant by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the merchant',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The merchant has been successfully retrieved.',
    content: {
      'application/json': {
        examples: {
          Merchant: {
            value: CreateMerchantRespnoseExample,
          },
        },
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOneById(+id);
  }

  @ApiOperation({
    summary: 'Merchant Retrieval',
    description: 'Retrieve a merchant by name',
  })
  @ApiParam({
    name: 'name',
    description: 'Name of the merchant',
    example: 'Amazon',
  })
  @ApiResponse({
    status: 200,
    description: 'The merchant has been successfully retrieved.',
    content: {
      'application/json': {
        examples: {
          Merchant: {
            value: CreateMerchantRespnoseExample,
          },
        },
      },
    },
  })
  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    return this.merchantService.findOneByName(name);
  }

  @ApiOperation({
    summary: 'Merchant Update',
    description: 'Update a merchant by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the merchant',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The merchant detials has been successfully updated.',
    content: {
      'application/json': {
        examples: {
          'Update Merchant Name': {
            value: UpdateMerchantNameResponseExample,
          },
          'Mark Merchant as Bezos Related': {
            value: MarkMerchantAsBezosRelatedResponseExample,
          },
        },
      },
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(+id, updateMerchantDto);
  }

  @ApiOperation({
    summary: 'Merchant Deletion',
    description: 'Delete a merchant by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the merchant',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The merchant has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id);
  }
}
