import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Unique name of the merchant',
    example: 'Amazon',
  })
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the merchant is related to Jeff Bezos',
    example: true,
  })
  isBezosRelated?: boolean;
}
