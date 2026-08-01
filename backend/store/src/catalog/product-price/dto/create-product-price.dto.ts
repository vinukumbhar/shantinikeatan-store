import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductPriceDto {
  @IsString()
  variantId: string;

  @IsString()
  priceListId: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}