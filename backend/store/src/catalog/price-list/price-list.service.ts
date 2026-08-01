import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';

@Injectable()
export class PriceListService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreatePriceListDto) {
    const exists = await this.prisma.priceList.findUnique({
      where: {
        code: createDto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Price List already exists');
    }

    if (createDto.isDefault) {
      await this.prisma.priceList.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    const { currencyId, ...priceListData } = createDto;

    return this.prisma.priceList.create({
      data: {
        ...priceListData,

        currency: {
          connect: {
            id: currencyId,
          },
        },
      },

      include: {
        currency: true,
      },
    });
  }

  findAll() {
    return this.prisma.priceList.findMany({
      include: {
        currency: true,
      },
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.priceList.findUnique({
      where: { id },

      include: {
        currency: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Price List not found');
    }

    return result;
  }

  async update(id: string, updateDto: UpdatePriceListDto) {
    await this.findOne(id);

    const { currencyId, ...priceListData } = updateDto;

    if (updateDto.isDefault) {
      await this.prisma.priceList.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.priceList.update({
      where: { id },

      data: {
        ...priceListData,

        currency: currencyId
          ? {
              connect: {
                id: currencyId,
              },
            }
          : undefined,
      },

      include: {
        currency: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.priceList.delete({
      where: { id },
    });
  }
}