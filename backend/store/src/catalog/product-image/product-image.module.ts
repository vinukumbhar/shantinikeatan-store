import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

import { PrismaService } from '../../prisma/prisma.service';

import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/products',

        filename: (_, file, callback) => {
          const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
            extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  ],

  controllers: [ProductImageController],

  providers: [ProductImageService, PrismaService],

  exports: [ProductImageService],
})
export class ProductImageModule {}