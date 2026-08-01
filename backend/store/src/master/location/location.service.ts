import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLocationDto) {
    const exists = await this.prisma.location.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Location code already exists');
    }

    return this.prisma.location.create({
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        isActive: dto.isActive,
        warehouse: {
          connect: {
            id: dto.warehouseId,
          },
        },
      },
      include: {
        warehouse: true,
      },
    });
  }

  async findAll() {
    return this.prisma.location.findMany({
      include: {
        warehouse: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: {
        warehouse: true,
      },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async update(id: string, dto: UpdateLocationDto) {
    await this.findOne(id);

    const { warehouseId, ...data } = dto;

    if (dto.code) {
      const exists = await this.prisma.location.findFirst({
        where: {
          code: dto.code,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('Location code already exists');
      }
    }

    return this.prisma.location.update({
      where: { id },
      data: {
        ...data,
        ...(warehouseId && {
          warehouse: {
            connect: {
              id: warehouseId,
            },
          },
        }),
      },
      include: {
        warehouse: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.location.delete({
      where: { id },
    });
  }
}