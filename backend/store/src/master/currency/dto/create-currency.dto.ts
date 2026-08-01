import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(10)
  code!: string;

  @IsString()
  @MaxLength(10)
  symbol!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  decimalPlaces?: number;

  @IsOptional()
  @IsBoolean()
  isBase?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}