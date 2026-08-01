import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BarcodeService } from './barcode.service';

import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';

@Controller('barcodes')
export class BarcodeController {
  constructor(private readonly barcodeService: BarcodeService) {}

  @Post()
  create(@Body() dto: CreateBarcodeDto) {
    return this.barcodeService.create(dto);
  }

  @Get()
  findAll() {
    return this.barcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barcodeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBarcodeDto,
  ) {
    return this.barcodeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barcodeService.remove(id);
  }
}