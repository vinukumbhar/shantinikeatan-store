import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateProductVariantDto) {
    const exists = await this.prisma.productVariant.findUnique({
      where: {
        sku: createDto.sku,
      },
    });

    if (exists) {
      throw new BadRequestException('SKU already exists');
    }

    const { productId, ...variantData } = createDto;

    return this.prisma.productVariant.create({
      data: {
        ...variantData,
        product: {
          connect: {
            id: productId,
          },
        },
      },
      include: {
        product: true,
        attributes: true,
        barcodes: true,
        prices: true,
      },
    });
  }

  findAll() {
    return this.prisma.productVariant.findMany({
      include: {
        product: true,
        attributes: true,
        barcodes: true,
        prices: true,
      },
    });
  }

  async findOne(id: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        product: true,
        attributes: true,
        barcodes: true,
        prices: true,
      },
    });

    if (!variant) {
      throw new NotFoundException('Product Variant not found');
    }

    return variant;
  }

  async update(id: string, updateDto: UpdateProductVariantDto) {
    await this.findOne(id);

    const { productId, ...variantData } = updateDto;

    return this.prisma.productVariant.update({
      where: { id },
      data: {
        ...variantData,
        product: productId
          ? {
              connect: {
                id: productId,
              },
            }
          : undefined,
      },
      include: {
        product: true,
        attributes: true,
        barcodes: true,
        prices: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.productVariant.delete({
      where: {
        id,
      },
    });
  }
}