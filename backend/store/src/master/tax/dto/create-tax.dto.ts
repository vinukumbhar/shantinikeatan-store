import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaxType } from '@prisma/client';

export class CreateTaxDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(20)
  code!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  rate!: number;

  @IsEnum(TaxType)
  type!: TaxType;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}