import {
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePriceListItemDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsInt()
  stock: number;

  @IsNumber()
  sellingPrice: number;

  @IsNumber()
  costPrice: number;

  @IsNumber()
  mrp: number;

  @IsOptional()
  @IsString()
  currencyId?: string;
}

export class CreatePriceListDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  invoiceId?: string;

  @IsOptional()
  @IsString()
  poId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  approvedById?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePriceListItemDto)
  items: CreatePriceListItemDto[];
}