import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsBoolean()
  @IsOptional()
  isBezosRelated?: boolean;
}
