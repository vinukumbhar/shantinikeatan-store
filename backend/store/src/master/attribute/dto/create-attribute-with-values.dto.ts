import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttributeValueInputDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  // Manual SKU entered by the user
  @IsOptional()
  @IsString()
  @MaxLength(10)
  skuCode?: string;

  // code is NOT provided by the frontend.
  // It is generated automatically by the backend.

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateAttributeWithValuesDto {
  // Attribute name
  @IsString()
  @MaxLength(100)
  name!: string;

  // Attribute code - manually entered
  @IsString()
  @MaxLength(20)
  code!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // Attribute values
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeValueInputDto)
  values!: CreateAttributeValueInputDto[];
}