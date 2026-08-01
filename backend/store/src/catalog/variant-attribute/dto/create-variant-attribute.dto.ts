import { IsOptional, IsString } from 'class-validator';

export class CreateVariantAttributeDto {
  @IsString()
  variantId: string;

  @IsString()
  attributeId: string;

  @IsString()
  attributeValueId: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}