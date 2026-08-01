import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('product-variants')
export class ProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductVariantDto) {
    return this.productVariantService.create(dto);
  }

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductVariantDto,
  ) {
    return this.productVariantService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(id);
  }
}