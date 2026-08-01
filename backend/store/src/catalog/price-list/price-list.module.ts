import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { PriceListController } from './price-list.controller';
import { PriceListService } from './price-list.service';

@Module({
  controllers: [PriceListController],
  providers: [PriceListService, PrismaService],
  exports: [PriceListService],
})
export class PriceListModule {}