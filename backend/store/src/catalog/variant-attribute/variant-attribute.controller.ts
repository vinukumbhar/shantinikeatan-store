import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { VariantAttributeService } from './variant-attribute.service';

import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';

@Controller('variant-attributes')
export class VariantAttributeController {
  constructor(
    private readonly variantAttributeService: VariantAttributeService,
  ) {}

  @Post()
  create(@Body() dto: CreateVariantAttributeDto) {
    return this.variantAttributeService.create(dto);
  }

  @Get()
  findAll() {
    return this.variantAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantAttributeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateVariantAttributeDto,
  ) {
    return this.variantAttributeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantAttributeService.remove(id);
  }
}