import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { BarcodeType } from '@prisma/client';

export class CreateBarcodeDto {
  @IsString()
  variantId: string;

  @IsString()
  barcode: string;

  @IsEnum(BarcodeType)
  type: BarcodeType;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}