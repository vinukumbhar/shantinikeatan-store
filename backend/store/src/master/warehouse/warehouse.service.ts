import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWarehouseDto) {
    const exists = await this.prisma.warehouse.findUnique({
      where: { code: dto.code },
    });

    if (exists) {
      throw new BadRequestException('Warehouse code already exists');
    }

    if (dto.isDefault) {
      await this.prisma.warehouse.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.warehouse.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.warehouse.findMany({
      include: {
        locations: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: {
        locations: true,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return warehouse;
  }

  async update(id: string, dto: UpdateWarehouseDto) {
    await this.findOne(id);

    if (dto.code) {
      const exists = await this.prisma.warehouse.findFirst({
        where: {
          code: dto.code,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('Warehouse code already exists');
      }
    }

    if (dto.isDefault) {
      await this.prisma.warehouse.updateMany({
        where: {
          NOT: { id },
        },
        data: {
          isDefault: false,
        },
      });
    }

    return this.prisma.warehouse.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.warehouse.delete({
      where: { id },
    });
  }
}