import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentTermDto } from './dto/create-payment-term.dto';
import { UpdatePaymentTermDto } from './dto/update-payment-term.dto';

@Injectable()
export class PaymentTermService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentTermDto: CreatePaymentTermDto) {
    const exists = await this.prisma.paymentTerm.findUnique({
      where: {
        code: createPaymentTermDto.code,
      },
    });

    if (exists) {
      throw new ConflictException('Payment Term code already exists');
    }

    if (createPaymentTermDto.isDefault) {
      await this.prisma.paymentTerm.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.paymentTerm.create({
      data: createPaymentTermDto,
    });
  }

  async findAll() {
    return this.prisma.paymentTerm.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const paymentTerm = await this.prisma.paymentTerm.findUnique({
      where: {
        id,
      },
    });

    if (!paymentTerm) {
      throw new NotFoundException('Payment Term not found');
    }

    return paymentTerm;
  }

  async update(id: string, updatePaymentTermDto: UpdatePaymentTermDto) {
    await this.findOne(id);

    if (updatePaymentTermDto.code) {
      const exists = await this.prisma.paymentTerm.findFirst({
        where: {
          code: updatePaymentTermDto.code,
          NOT: {
            id,
          },
        },
      });

      if (exists) {
        throw new ConflictException('Payment Term code already exists');
      }
    }

    if (updatePaymentTermDto.isDefault) {
      await this.prisma.paymentTerm.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.paymentTerm.update({
      where: {
        id,
      },
      data: updatePaymentTermDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.paymentTerm.delete({
      where: {
        id,
      },
    });
  }
}