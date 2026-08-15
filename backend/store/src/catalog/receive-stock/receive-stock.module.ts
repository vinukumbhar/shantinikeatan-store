import { Module } from '@nestjs/common';

import { ReceiveStockController } from './receive-stock.controller';
import { ReceiveStockService } from './receive-stock.service';

@Module({
  controllers: [
    ReceiveStockController,
  ],

  providers: [
    ReceiveStockService,
  ],

  exports: [
    ReceiveStockService,
  ],
})
export class ReceiveStockModule {}