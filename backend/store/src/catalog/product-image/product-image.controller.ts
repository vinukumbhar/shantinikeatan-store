import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

import { ProductImageService } from './product-image.service';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Controller('product-images')
export class ProductImageController {
  constructor(
    private readonly productImageService: ProductImageService,
  ) { }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = './uploads/products';
          // Automatically create the directory if it does not exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const timestamp = Date.now();
          const ext = extname(file.originalname);
          const name = file.originalname.replace(ext, '');

          callback(null, `${name}-${timestamp}${ext}`);
        },
      }),
    }),
  )
  upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateProductImageDto,
  ) {
    return this.productImageService.upload(files, dto);
  }

  @Get()
  findAll() {
    return this.productImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productImageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductImageDto,
  ) {
    return this.productImageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImageService.remove(id);
  }
}
