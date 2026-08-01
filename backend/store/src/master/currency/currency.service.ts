import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const exists = await this.prisma.currency.findUnique({
      where: {
        code: createCurrencyDto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Currency code already exists');
    }

    if (createCurrencyDto.isBase) {
      await this.prisma.currency.updateMany({
        data: {
          isBase: false,
        },
      });
    }

    return this.prisma.currency.create({
      data: createCurrencyDto,
    });
  }

  async findAll() {
    return this.prisma.currency.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

async findMcurrency() {
  return this.prisma.currency.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

  async findOne(id: string) {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return currency;
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    await this.findOne(id);

    if (updateCurrencyDto.code) {
      const exists = await this.prisma.currency.findFirst({
        where: {
          code: updateCurrencyDto.code,
          NOT: {
            id,
          },
        },
      });

      if (exists) {
        throw new BadRequestException('Currency code already exists');
      }
    }

    if (updateCurrencyDto.isBase) {
      await this.prisma.currency.updateMany({
        where: {
          NOT: {
            id,
          },
        },
        data: {
          isBase: false,
        },
      });
    }

    return this.prisma.currency.update({
      where: { id },
      data: updateCurrencyDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.currency.delete({
      where: { id },
    });
  }
}