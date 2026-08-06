import { IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  productId: string;

  @IsString()
  path: string;
}