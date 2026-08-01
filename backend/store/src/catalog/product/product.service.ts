import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // async create(createProductDto: CreateProductDto) {
  //   const exists = await this.prisma.product.findUnique({
  //     where: {
  //       code: createProductDto.code,
  //     },
  //   });

  //   if (exists) {
  //     throw new BadRequestException('Product code already exists');
  //   }

  //   return this.prisma.product.create({
  //     data: createProductDto,
  //   });
  // }

  //   async create(createProductDto: CreateProductDto) {
  //   // Get last product
  //   const lastProduct = await this.prisma.product.findFirst({
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     select: {
  //       code: true,
  //     },
  //   });

  //   let nextNumber = 1;

  //   if (lastProduct?.code) {
  //     nextNumber =
  //       parseInt(lastProduct.code.replace(/[^\d]/g, ''), 10) + 1;
  //   }

  //   const productCode = `PR${String(nextNumber).padStart(6, '0')}`;

  //   const existingSku = createProductDto.sku
  //     ? await this.prisma.product.findUnique({
  //         where: {
  //           sku: createProductDto.sku,
  //         },
  //       })
  //     : null;

  //   if (existingSku) {
  //     throw new BadRequestException('Product SKU already exists');
  //   }

  //   return this.prisma.product.create({
  //     data: {
  //       ...createProductDto,
  //       code: productCode,
  //     },
  //   });
  // }

  async create(createProductDto: CreateProductDto) {
  // Get last product
  const lastProduct = await this.prisma.product.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      code: true,
    },
  });

  let nextNumber = 1;

  if (lastProduct?.code) {
    nextNumber =
      parseInt(lastProduct.code.replace(/[^\d]/g, ''), 10) + 1;
  }

  const productCode = `PR${String(nextNumber).padStart(6, '0')}`;

  return this.prisma.product.create({
    data: {
      ...createProductDto,
      code: productCode,
    },
  });
}

  findAll() {
    return this.prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        unit: true,
        tax: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        unit: true,
        tax: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}