/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { FieldRequiresOtherField } from 'src/common/FieldRequiresOtherField';

export class FilterTransactionDto {
  @ApiProperty({
    required: false,
    minimum: 1,
    maximum: 12,
    example: 1,
    description: 'Month of the year the transaction was made',
  })
  @Validate(FieldRequiresOtherField, ['year'], {
    message: 'year is required because month is set',
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  @Type(() => Number)
  month?: number;

  @ApiProperty({
    required: false,
    minimum: 1000,
    maximum: 9999,
    example: 2029,
    description: 'Year the transaction was made',
  })
  @Validate(FieldRequiresOtherField, ['month'], {
    message: 'month is required because year is set',
  })
  @IsInt()
  @Min(1000)
  @Max(9999)
  @IsOptional()
  @Type(() => Number)
  year?: number;

  @ApiProperty({
    required: false,
    example: false,
    description: 'Filter by Bezos related transactions',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isBezos?: boolean;
}
