import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AttributeController],
  providers: [AttributeService, PrismaService],
  exports: [AttributeService],
})
export class AttributeModule {}