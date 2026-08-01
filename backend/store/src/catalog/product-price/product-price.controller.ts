import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductPriceService } from './product-price.service';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';

@Controller('product-prices')
export class ProductPriceController {
  constructor(
    private readonly productPriceService: ProductPriceService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductPriceDto) {
    return this.productPriceService.create(dto);
  }

  @Get()
  findAll() {
    return this.productPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPriceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductPriceDto,
  ) {
    return this.productPriceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPriceService.remove(id);
  }
}