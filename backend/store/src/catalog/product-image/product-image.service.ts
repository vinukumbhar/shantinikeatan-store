import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateProductImageDto) {
    if (createDto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: {
          productId: createDto.productId,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const { productId, ...imageData } = createDto;

    return this.prisma.productImage.create({
      data: {
        ...imageData,
        product: {
          connect: {
            id: productId,
          },
        },
      },
      include: {
        product: true,
      },
    });
  }

  findAll() {
    return this.prisma.productImage.findMany({
      include: {
        product: true,
      },
    });
  }

  async findOne(id: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!image) {
      throw new NotFoundException('Product Image not found');
    }

    return image;
  }

  async update(id: string, dto: UpdateProductImageDto) {
    await this.findOne(id);

    const { productId, ...imageData } = dto;

    if (dto.isPrimary && productId) {
      await this.prisma.productImage.updateMany({
        where: {
          productId,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.productImage.update({
      where: { id },
      data: {
        ...imageData,
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
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.productImage.delete({
      where: { id },
    });
  }
}