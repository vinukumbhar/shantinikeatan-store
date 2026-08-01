import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { VariantAttributeController } from './variant-attribute.controller';
import { VariantAttributeService } from './variant-attribute.service';

@Module({
  controllers: [VariantAttributeController],
  providers: [VariantAttributeService, PrismaService],
  exports: [VariantAttributeService],
})
export class VariantAttributeModule {}