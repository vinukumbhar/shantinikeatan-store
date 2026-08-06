// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';

// import { PrismaService } from '../../prisma/prisma.service';

// import { CreateProductVariantDto } from './dto/create-product-variant.dto';
// import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

// @Injectable()
// export class ProductVariantService {
//   constructor(private readonly prisma: PrismaService) {}

//   // async create(dto: CreateProductVariantDto) {
//   //   const exists = await this.prisma.productVariant.findUnique({
//   //     where: {
//   //       sku: dto.sku,
//   //     },
//   //   });

//   //   if (exists) {
//   //     throw new BadRequestException('SKU already exists');
//   //   }

//   //   const {
//   //     productId,
//   //     attributes,
//   //     ...variantData
//   //   } = dto;

//   //   return this.prisma.productVariant.create({
//   //     data: {
//   //       ...variantData,

//   //       product: {
//   //         connect: {
//   //           id: productId,
//   //         },
//   //       },

//   //       attributes: {
//   //         create: attributes.map((item) => ({
//   //           attribute: {
//   //             connect: {
//   //               id: item.attributeId,
//   //             },
//   //           },
//   //           attributeValue: {
//   //             connect: {
//   //               id: item.attributeValueId,
//   //             },
//   //           },
//   //         })),
//   //       },
//   //     },

//   //     include: {
//   //       product: true,
//   //       attributes: {
//   //         include: {
//   //           attribute: true,
//   //           attributeValue: true,
//   //         },
//   //       },
//   //     },
//   //   });
//   // }

//   async create(dto: CreateProductVariantDto) {
//   const {
//     productId,
//     attributes,
//     ...variantData
//   } = dto;

//   return this.prisma.productVariant.create({
//     data: {
//       ...variantData,

//       product: {
//         connect: {
//           id: productId,
//         },
//       },

//       attributes: {
//         create: attributes.map((item) => ({
//           attribute: {
//             connect: {
//               id: item.attributeId,
//             },
//           },
//           attributeValue: {
//             connect: {
//               id: item.attributeValueId,
//             },
//           },
//         })),
//       },
//     },

//     include: {
//       product: true,
//       attributes: {
//         include: {
//           attribute: true,
//           attributeValue: true,
//         },
//       },
//     },
//   });
// }

//   async findAll() {
//     return this.prisma.productVariant.findMany({
//       include: {
//         product: true,
//         attributes: {
//           include: {
//             attribute: true,
//             attributeValue: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//   }

//   async findOne(id: string) {
//     const variant =
//       await this.prisma.productVariant.findUnique({
//         where: {
//           id,
//         },
//         include: {
//           product: true,
//           attributes: {
//             include: {
//               attribute: true,
//               attributeValue: true,
//             },
//           },
//         },
//       });

//     if (!variant) {
//       throw new NotFoundException(
//         'Product Variant not found',
//       );
//     }

//     return variant;
//   }

//  async update(
//   id: string,
//   dto: UpdateProductVariantDto,
// ) {
//   await this.findOne(id);

//   const {
//     productId,
//     attributes,
//     ...variantData
//   } = dto;

//   return this.prisma.productVariant.update({
//     where: {
//       id,
//     },

//     data: {
//       ...variantData,

//       product: productId
//         ? {
//             connect: {
//               id: productId,
//             },
//           }
//         : undefined,

//       ...(attributes && {
//         attributes: {
//           deleteMany: {},

//           create: attributes.map((item) => ({
//             attribute: {
//               connect: {
//                 id: item.attributeId,
//               },
//             },
//             attributeValue: {
//               connect: {
//                 id: item.attributeValueId,
//               },
//             },
//           })),
//         },
//       }),
//     },

//     include: {
//       product: true,
//       attributes: {
//         include: {
//           attribute: true,
//           attributeValue: true,
//         },
//       },
//     },
//   });
// }

//   async remove(id: string) {
//     await this.findOne(id);

//     return this.prisma.productVariant.delete({
//       where: {
//         id,
//       },
//     });
//   }
// }

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

  async create(dto: CreateProductVariantDto) {
    // FIXED: Use findFirst since sku is not marked @unique in your schema.prisma
    const exists = await this.prisma.productVariant.findFirst({
      where: { sku: dto.sku },
    });
    if (exists) {
      throw new BadRequestException('SKU already exists');
    }

    const {
      productId,
      attributes,
      galleryImageIds,
      ...variantData
    } = dto;

    return this.prisma.productVariant.create({
      data: {
        ...variantData,
        productId, 

        ...(galleryImageIds && galleryImageIds.length > 0 && {
          galleryImages: {
            connect: galleryImageIds.map((id) => ({ id })),
          },
        }),

        attributes: attributes && {
          create: attributes.map((item) => ({
            attributeId: item.attributeId,
            attributeValueId: item.attributeValueId,
          })),
        },
      },
      include: {
        product: true,
        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,
        attributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
      },
    });
  }


  async findAll() {
    return this.prisma.productVariant.findMany({
      include: {
        product: true,
        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,
        attributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id },
      include: {
        product: true,
        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,
        attributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product Variant not found');
    }

    return variant;
  }

  async update(id: string, dto: UpdateProductVariantDto) {
    await this.findOne(id);

    const {
      productId,
      attributes,
      galleryImageIds,
      ...variantData
    } = dto;

    return this.prisma.productVariant.update({
      where: { id },
      data: {
        ...variantData,
        productId: productId || undefined, // Simple assignment overrides cleanly

        // Clean collection reset updates using Prisma's structural 'set' command
        ...(galleryImageIds && {
          galleryImages: {
            set: galleryImageIds.map((imgId) => ({ id: imgId })),
          },
        }),

        ...(attributes && {
          attributes: {
            deleteMany: {},
            create: attributes.map((item) => ({
              attributeId: item.attributeId,
              attributeValueId: item.attributeValueId,
            })),
          },
        }),
      },
      include: {
        product: true,
        thumbnailImage: true,
        heroImage: true,
        galleryImages: true,
        attributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.productVariant.delete({
      where: { id },
    });
  }

  // Optimized custom image path helper method for the frontend layout grid view
  async findVariantSummaryList(productId: string) {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      select: {
        id: true,
        name: true,
        sku: true,
        isActive: true,
        thumbnailImage: {
          select: { path: true },
        },
        galleryImages: {
          select: { path: true },
        },
      },
    });

    return variants.map((v) => ({
      id: v.id,
      name: v.name ?? 'Default Variant',
      sku: v.sku,
      isActive: v.isActive,
      thumbnailPath: v.thumbnailImage?.path || null,
      galleryPaths: v.galleryImages.map((img) => img.path),
    }));
  }
}
