import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceListItemDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsString()
  priceListId: string;

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