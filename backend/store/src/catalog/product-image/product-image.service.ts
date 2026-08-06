import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import sharp from 'sharp';
import { randomUUID } from 'crypto';
import { basename, extname, join } from 'path';
import { promises as fs } from 'fs';


@Injectable()
export class ProductImageService {
  constructor(private readonly prisma: PrismaService) { }

  // async upload(
  //   files: Express.Multer.File[],
  //   dto: CreateProductImageDto,
  // ) {
  //   const product = await this.prisma.product.findUnique({
  //     where: {
  //       id: dto.productId,
  //     },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   if (!files || files.length === 0) {
  //     throw new NotFoundException('No files uploaded');
  //   }

  //   const images = await Promise.all(
  //     files.map(async (file) => {
  //       // Use filename if available (diskStorage), otherwise originalname (memoryStorage)
  //       const fileName =
  //         file.filename ?? file.originalname;

  //       return this.prisma.productImage.create({
  //         data: {
  //           productId: dto.productId,
  //           path: `/uploads/products/${fileName}`,
  //         },
  //       });
  //     }),
  //   );

  //   return images;
  // }

  //   async upload(
  //   files: Express.Multer.File[],
  //   dto: CreateProductImageDto,
  // ) {
  //   const product = await this.prisma.product.findUnique({
  //     where: {
  //       id: dto.productId,
  //     },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   const images = await Promise.all(
  //     files.map(async (file) => {
  //       const name = basename(
  //         file.originalname,
  //         extname(file.originalname),
  //       );

  //       const outputFileName = `${name}.webp`;

  //       const outputPath = join(
  //         process.cwd(),
  //         'uploads',
  //         'products',
  //         outputFileName,
  //       );

  //       await sharp(file.path)
  //         .resize({
  //           width: 1200,
  //           withoutEnlargement: true,
  //         })
  //         .webp({
  //           quality: 80,
  //         })
  //         .toFile(outputPath);

  //       // Remove the uploaded original file
  //       await unlink(file.path);

  //       return this.prisma.productImage.create({
  //         data: {
  //           productId: dto.productId,
  //           path: `/uploads/products/${outputFileName}`,
  //         },
  //       });
  //     }),
  //   );

  //   return images;
  // }

  // async upload(
  //   files: Express.Multer.File[],
  //   dto: CreateProductImageDto,
  // ) {
  //   const product = await this.prisma.product.findUnique({
  //     where: { id: dto.productId },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   await fs.mkdir(
  //     join(process.cwd(), 'uploads/products/large'),
  //     { recursive: true },
  //   );

  //   await fs.mkdir(
  //     join(process.cwd(), 'uploads/products/thumb'),
  //     { recursive: true },
  //   );

  //   const images = await Promise.all(
  //     files.map(async (file) => {
  //       const name = basename(
  //         file.originalname,
  //         extname(file.originalname),
  //       )
  //         .replace(/\s+/g, '-')
  //         .toLowerCase();

  //       // Example: front_7f4c9d2a.webp
  //       const uniqueFileName = `${name}_${randomUUID().slice(0, 8)}.webp`;

  //       const largePath = join(
  //         process.cwd(),
  //         'uploads/products/large',
  //         uniqueFileName,
  //       );

  //       const thumbPath = join(
  //         process.cwd(),
  //         'uploads/products/thumb',
  //         uniqueFileName,
  //       );

  //       // Large Image
  //       await sharp(file.path)
  //         .resize({
  //           width: 1200,
  //           withoutEnlargement: true,
  //         })
  //         .webp({ quality: 80 })
  //         .toFile(largePath);

  //       // Thumbnail
  //       await sharp(file.path)
  //         .resize(300, 300, {
  //           fit: 'cover',
  //         })
  //         .webp({ quality: 75 })
  //         .toFile(thumbPath);

  //       // Delete temporary uploaded file
  //       await fs.unlink(file.path);

  //       return this.prisma.productImage.create({
  //         data: {
  //           productId: dto.productId,
  //           path:  `uploads/products/large/${uniqueFileName}`, // Store only filename
  //         },
  //       });
  //     }),
  //   );

  //   return images;
  // }

  async upload(
  files: Express.Multer.File[],
  dto: CreateProductImageDto,
) {
  const product = await this.prisma.product.findUnique({
    where: { id: dto.productId },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (!files?.length) {
    throw new NotFoundException('No files uploaded');
  }

  const largeDir = join(process.cwd(), 'uploads', 'products', 'large');
  const thumbDir = join(process.cwd(), 'uploads', 'products', 'thumb');

  await Promise.all([
    fs.mkdir(largeDir, { recursive: true }),
    fs.mkdir(thumbDir, { recursive: true }),
  ]);

  const images = await Promise.all(
    files.map(async (file) => {
      const name = basename(
        file.originalname,
        extname(file.originalname),
      )
        .replace(/\s+/g, '-')
        .toLowerCase();

      const uniqueFileName = `${name}_${randomUUID().slice(0, 8)}.webp`;

      const largePath = join(largeDir, uniqueFileName);
      const thumbPath = join(thumbDir, uniqueFileName);

      // Create one Sharp instance and clone it
      const image = sharp(file.path);

      await Promise.all([
        image
          .clone()
          .resize({
            width: 1200,
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(largePath),

        image
          .clone()
          .resize(300, 300, {
            fit: 'cover',
          })
          .webp({ quality: 75 })
          .toFile(thumbPath),
      ]);

      // Try to delete the temporary upload
      try {
        await fs.unlink(file.path);
      } catch (err) {
        console.warn(
          `Could not delete temporary file: ${file.path}`,
          err,
        );
      }

      return this.prisma.productImage.create({
        data: {
          productId: dto.productId,
          path: `uploads/products/large/${uniqueFileName}`,
        },
      });
    }),
  );

  return images;
}

  async findAll() {
    return this.prisma.productImage.findMany();
  }

  async findOne(id: string) {
    const image = await this.prisma.productImage.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  async update(
    id: string,
    dto: UpdateProductImageDto,
  ) {
    await this.findOne(id);

    return this.prisma.productImage.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.productImage.delete({
      where: {
        id,
      },
    });
  }

  



}