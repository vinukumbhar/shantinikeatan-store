import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  controllers: [ProductImageController],
  providers: [ProductImageService, PrismaService],
  exports: [ProductImageService],
})
export class ProductImageModule {}