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
  constructor(private readonly prisma: PrismaService) {}

async create(dto: CreateProductDto) {
  const lastProduct = await this.prisma.product.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { code: true },
  });

  let nextNumber = 1;

  if (lastProduct?.code) {
    nextNumber =
      parseInt(lastProduct.code.replace(/[^\d]/g, ''), 10) + 1;
  }

  const productCode = `PR${String(nextNumber).padStart(6, '0')}`;

  const {
    brandId,
    unitId,
    taxId,

    thumbnailImageId,
    heroImageId,

    galleryImageIds, 

    ...productData
  } = dto;

  return this.prisma.product.create({
    data: {
      ...productData,
      code: productCode,

      brand: brandId
        ? {
            connect: { id: brandId },
          }
        : undefined,

      unit: unitId
        ? {
            connect: { id: unitId },
          }
        : undefined,

      tax: taxId
        ? {
            connect: { id: taxId },
          }
        : undefined,

      thumbnailImage: thumbnailImageId
        ? {
            connect: { id: thumbnailImageId },
          }
        : undefined,

      heroImage: heroImageId
        ? {
            connect: { id: heroImageId },
          }
        : undefined,
    },

    include: {
      brand: true,
      unit: true,
      tax: true,
      thumbnailImage: true,
      heroImage: true,
      galleryImages: true,
    },
  });
}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        brand: true,
        unit: true,
        tax: true,

        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,

        variants: {
          include: {
            thumbnailImage: true,
            heroImage: true,
            galleryImages: true,

            attributes: true,
            barcodes: true,
            prices: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllSummaries() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        sku: true,
        isActive: true,

        thumbnailImage: {
          select: {
            path: true,
          },
        },

        _count: {
          select: {
            variants: true,
          },
        },
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      code: product.code,
      sku: product.sku,
      isActive: product.isActive,
      thumbnailPath: product.thumbnailImage?.path ?? null,
      variantCount: product._count.variants,
    }));
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        brand: true,
        unit: true,
        tax: true,

        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,

        variants: {
          include: {
            thumbnailImage: true,
            heroImage: true,
            galleryImages: true,

            attributes: {
              include: {
                attribute: true,
                attributeValue: true,
              },
            },

            barcodes: true,
            prices: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

 async update(id: string, dto: UpdateProductDto) {
  await this.findOne(id);

  if (dto.sku) {
    const existingSku = await this.prisma.product.findFirst({
      where: {
        sku: dto.sku,
        NOT: { id },
      },
    });

    if (existingSku) {
      throw new BadRequestException(
        'Product SKU already exists',
      );
    }
  }

  const {
    brandId,
    unitId,
    taxId,

    thumbnailImageId,
    heroImageId,

    galleryImageIds, 

    ...productData
  } = dto;

  return this.prisma.product.update({
    where: { id },

    data: {
      ...productData,

      brand:
        brandId === undefined
          ? undefined
          : brandId
            ? { connect: { id: brandId } }
            : { disconnect: true },

      unit:
        unitId === undefined
          ? undefined
          : unitId
            ? { connect: { id: unitId } }
            : { disconnect: true },

      tax:
        taxId === undefined
          ? undefined
          : taxId
            ? { connect: { id: taxId } }
            : { disconnect: true },

      thumbnailImage:
        thumbnailImageId === undefined
          ? undefined
          : thumbnailImageId
            ? { connect: { id: thumbnailImageId } }
            : { disconnect: true },

      heroImage:
        heroImageId === undefined
          ? undefined
          : heroImageId
            ? { connect: { id: heroImageId } }
            : { disconnect: true },
    },

    include: {
      brand: true,
      unit: true,
      tax: true,
      thumbnailImage: true,
      heroImage: true,
      galleryImages: true,
    },
  });
}

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}