import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReceiveStockDto {
  /**
   * Product Variant receiving stock
   */
  @IsString()
  variantId: string;

  /**
   * Existing Price List selected by user
   */
  @IsString()
  priceListId: string;

  /**
   * Quantity received
   */
  @IsInt()
  @Min(1)
  quantity: number;

  /**
   * Cost Price
   */
  @IsNumber()
  @Min(0)
  costPrice: number;

  /**
   * MRP
   */
  @IsNumber()
  @Min(0)
  mrp: number;

  /**
   * Selling Price
   */
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  /**
   * Optional currency
   */
  @IsOptional()
  @IsString()
  currencyId?: string;

  /**
   * Optional invoice number
   */
  @IsOptional()
  @IsString()
  invoiceNo?: string;

  /**
   * Optional supplier
   */
  @IsOptional()
  @IsString()
  supplier?: string;
}