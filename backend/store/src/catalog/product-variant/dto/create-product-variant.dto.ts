import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
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

  @IsString()
  sku!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantAttributeDto)
  attributes!: VariantAttributeDto[];

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