import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentMethodDto) {
    const exists = await this.prisma.paymentMethod.findUnique({
      where: { code: dto.code },
    });

    if (exists) {
      throw new BadRequestException('Payment method code already exists');
    }

    if (dto.isDefault) {
      await this.prisma.paymentMethod.updateMany({
        data: { isDefault: false },
      });
    }

    return this.prisma.paymentMethod.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.paymentMethod.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }

    return paymentMethod;
  }

  async update(id: string, dto: UpdatePaymentMethodDto) {
    await this.findOne(id);

    if (dto.code) {
      const exists = await this.prisma.paymentMethod.findFirst({
        where: {
          code: dto.code,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('Payment method code already exists');
      }
    }

    if (dto.isDefault) {
      await this.prisma.paymentMethod.updateMany({
        where: {
          NOT: { id },
        },
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.paymentMethod.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}