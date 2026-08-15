import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PriceListItemService } from './price-list-item.service';
import { CreatePriceListItemDto } from './dto/create-price-list-item.dto';
import { UpdatePriceListItemDto } from './dto/update-price-list-item.dto';

@Controller('price-list-items')
export class PriceListItemController {
  constructor(
    private readonly priceListItemService: PriceListItemService,
  ) {}

  @Post()
  create(@Body() dto: CreatePriceListItemDto) {
    return this.priceListItemService.create(dto);
  }

  @Get()
  findAll() {
    return this.priceListItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceListItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePriceListItemDto,
  ) {
    return this.priceListItemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceListItemService.remove(id);
  }
}