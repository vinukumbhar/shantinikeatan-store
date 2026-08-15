import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { PriceListItemController } from './price-list-item.controller';
import { PriceListItemService } from './price-list-item.service';

@Module({
  controllers: [PriceListItemController],
  providers: [PriceListItemService, PrismaService],
  exports: [PriceListItemService],
})
export class PriceListItemModule {}