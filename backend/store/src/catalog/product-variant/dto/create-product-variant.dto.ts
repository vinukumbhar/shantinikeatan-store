import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
   MaxLength,

} from "class-validator";
import { Type } from "class-transformer";

class VariantAttributeDto {
  @IsString()
  attributeId!: string;

  @IsString()
  attributeValueId!: string;
}

export class CreateProductVariantDto {
  @IsString()
  productId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  sku!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantAttributeDto)
  attributes!: VariantAttributeDto[];

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsInt()
  lowStockLimit?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImageIds?: string[];

  @IsOptional()
  @IsString()
  thumbnailImageId?: string;

  @IsOptional()
  @IsString()
  heroImageId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}