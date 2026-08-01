import { Module } from '@nestjs/common';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PrismaService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}