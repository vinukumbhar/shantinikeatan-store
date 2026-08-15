import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ReceiveStockService } from './receive-stock.service';

import { CreateReceiveStockDto } from './dto/create-receive-stock.dto';
import { UpdateReceiveStockDto } from './dto/update-receive-stock.dto';

@Controller('receive-stock')
export class ReceiveStockController {
  constructor(
    private readonly receiveStockService: ReceiveStockService,
  ) {}

  // =========================================================
  // RECEIVE STOCK
  // =========================================================

  @Post()
  create(
    @Body() dto: CreateReceiveStockDto,
  ) {
    return this.receiveStockService.create(dto);
  }

  // =========================================================
  // UPDATE RECEIVED STOCK
  // =========================================================

  @Patch(':priceListItemId')
  update(
    @Param('priceListItemId')
    priceListItemId: string,

    @Body()
    dto: UpdateReceiveStockDto,
  ) {
    return this.receiveStockService.update(
      priceListItemId,
      dto,
    );
  }
}