import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';

@Injectable()
export class BarcodeService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateBarcodeDto) {
    const exists = await this.prisma.barcode.findUnique({
      where: {
        barcode: createDto.barcode,
      },
    });

    if (exists) {
      throw new BadRequestException('Barcode already exists');
    }

    if (createDto.isPrimary) {
      await this.prisma.barcode.updateMany({
        where: {
          variantId: createDto.variantId,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const { variantId, ...barcodeData } = createDto;

    return this.prisma.barcode.create({
      data: {
        ...barcodeData,

        variant: {
          connect: {
            id: variantId,
          },
        },
      },

      include: {
        variant: true,
      },
    });
  }

  findAll() {
    return this.prisma.barcode.findMany({
      include: {
        variant: true,
      },
    });
  }

  async findOne(id: string) {
    const barcode = await this.prisma.barcode.findUnique({
      where: { id },
      include: {
        variant: true,
      },
    });

    if (!barcode) {
      throw new NotFoundException('Barcode not found');
    }

    return barcode;
  }

  async update(id: string, dto: UpdateBarcodeDto) {
    await this.findOne(id);

    const { variantId, ...barcodeData } = dto;

    if (dto.isPrimary && variantId) {
      await this.prisma.barcode.updateMany({
        where: {
          variantId,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.barcode.update({
      where: { id },

      data: {
        ...barcodeData,

        variant: variantId
          ? {
              connect: {
                id: variantId,
              },
            }
          : undefined,
      },

      include: {
        variant: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.barcode.delete({
      where: { id },
    });
  }
}