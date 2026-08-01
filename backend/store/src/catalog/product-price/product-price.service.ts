import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';

@Injectable()
export class ProductPriceService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateProductPriceDto) {
    const exists = await this.prisma.productPrice.findFirst({
      where: {
        variantId: createDto.variantId,
        priceListId: createDto.priceListId,
      },
    });

    if (exists) {
      throw new BadRequestException(
        'Price already exists for this variant and price list',
      );
    }

    const { variantId, priceListId, ...priceData } = createDto;

    return this.prisma.productPrice.create({
      data: {
        ...priceData,

        variant: {
          connect: {
            id: variantId,
          },
        },

        priceList: {
          connect: {
            id: priceListId,
          },
        },
      },

      include: {
        variant: true,
        priceList: true,
      },
    });
  }

  findAll() {
    return this.prisma.productPrice.findMany({
      include: {
        variant: true,
        priceList: true,
      },
    });
  }

  async findOne(id: string) {
    const price = await this.prisma.productPrice.findUnique({
      where: { id },
      include: {
        variant: true,
        priceList: true,
      },
    });

    if (!price) {
      throw new NotFoundException('Product Price not found');
    }

    return price;
  }

  async update(id: string, dto: UpdateProductPriceDto) {
    await this.findOne(id);

    const { variantId, priceListId, ...priceData } = dto;

    return this.prisma.productPrice.update({
      where: { id },

      data: {
        ...priceData,

        variant: variantId
          ? {
              connect: {
                id: variantId,
              },
            }
          : undefined,

        priceList: priceListId
          ? {
              connect: {
                id: priceListId,
              },
            }
          : undefined,
      },

      include: {
        variant: true,
        priceList: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.productPrice.delete({
      where: { id },
    });
  }
}