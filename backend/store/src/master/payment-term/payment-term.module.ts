import { Module } from '@nestjs/common';
import { PaymentTermController } from './payment-term.controller';
import { PaymentTermService } from './payment-term.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentTermController],
  providers: [PaymentTermService, PrismaService],
  exports: [PaymentTermService],
})
export class PaymentTermModule {}