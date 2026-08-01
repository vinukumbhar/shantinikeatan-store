import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  mrp?: number;

  @IsNumber()
  sellingPrice: number;

  @IsNumber()
  costPrice: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}