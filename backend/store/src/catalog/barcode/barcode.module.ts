import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { BarcodeController } from './barcode.controller';
import { BarcodeService } from './barcode.service';

@Module({
  controllers: [BarcodeController],
  providers: [BarcodeService, PrismaService],
  exports: [BarcodeService],
})
export class BarcodeModule {}