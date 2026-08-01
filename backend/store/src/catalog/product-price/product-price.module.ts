import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ProductPriceController } from './product-price.controller';
import { ProductPriceService } from './product-price.service';

@Module({
  controllers: [ProductPriceController],
  providers: [ProductPriceService, PrismaService],
  exports: [ProductPriceService],
})
export class ProductPriceModule {}