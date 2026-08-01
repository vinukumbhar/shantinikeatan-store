import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  productId: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}