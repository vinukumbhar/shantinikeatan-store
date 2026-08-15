import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreatePriceListItemDto } from './dto/create-price-list-item.dto';
import { UpdatePriceListItemDto } from './dto/update-price-list-item.dto';

@Injectable()
export class PriceListItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePriceListItemDto) {
    const exists = await this.prisma.priceListItem.findFirst({
      where: {
        priceListId: dto.priceListId,
        productId: dto.productId,
        variantId: dto.variantId ?? null,
      },
    });

    if (exists) {
      throw new BadRequestException(
        'This product already exists in the selected price list',
      );
    }

    return this.prisma.priceListItem.create({
      data: {
        priceListId: dto.priceListId,
        productId: dto.productId,
        variantId: dto.variantId,
        stock: dto.stock,
        sellingPrice: dto.sellingPrice,
        costPrice: dto.costPrice,
        mrp: dto.mrp,
        currencyId: dto.currencyId,
      },

      include: {
        product: true,
        variant: true,
        currency: true,
        priceList: true,
      },
    });
  }

  findAll() {
    return this.prisma.priceListItem.findMany({
      include: {
        product: true,
        variant: true,
        currency: true,
        priceList: true,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.priceListItem.findUnique({
      where: { id },

      include: {
        product: true,
        variant: true,
        currency: true,
        priceList: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Price List Item not found');
    }

    return item;
  }

  async update(id: string, dto: UpdatePriceListItemDto) {
    await this.findOne(id);

    return this.prisma.priceListItem.update({
      where: { id },

      data: {
        productId: dto.productId,
        variantId: dto.variantId,
        priceListId: dto.priceListId,
        stock: dto.stock,
        sellingPrice: dto.sellingPrice,
        costPrice: dto.costPrice,
        mrp: dto.mrp,
        currencyId: dto.currencyId,
      },

      include: {
        product: true,
        variant: true,
        currency: true,
        priceList: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.priceListItem.delete({
      where: { id },
    });
  }
}