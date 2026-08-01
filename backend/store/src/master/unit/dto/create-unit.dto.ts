import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(20)
  code!: string;

  @IsString()
  @MaxLength(20)
  shortName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}