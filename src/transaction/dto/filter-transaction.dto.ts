/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class FilterTransactionDto {
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number = 1;

  @IsInt()
  @Min(1000)
  @Max(9999)
  @IsOptional()
  year?: number = 2029;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @Type(() => Boolean)
  isBezos?: boolean = false;
}
