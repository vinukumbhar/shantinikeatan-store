import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceListDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  currencyId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}