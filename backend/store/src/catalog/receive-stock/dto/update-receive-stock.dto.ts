import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateReceiveStockDto {
  /**
   * Total stock quantity for this PriceListItem
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  /**
   * Cost Price
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  costPrice?: number;

  /**
   * MRP
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  mrp?: number;

  /**
   * Selling Price
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  sellingPrice?: number;

  /**
   * Currency
   */
  @IsOptional()
  @IsString()
  currencyId?: string;
}