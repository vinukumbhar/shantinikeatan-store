import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const exists = await this.prisma.brand.findFirst({
      where: {
        OR: [
          { name: createBrandDto.name },
          createBrandDto.code ? { code: createBrandDto.code } : {},
        ],
      },
    });

    if (exists) {
      throw new BadRequestException('Brand already exists');
    }

    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    return this.prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);

    if (updateBrandDto.name || updateBrandDto.code) {
      const exists = await this.prisma.brand.findFirst({
        where: {
          id: { not: id },
          OR: [
            updateBrandDto.name
              ? { name: updateBrandDto.name }
              : undefined,
            updateBrandDto.code
              ? { code: updateBrandDto.code }
              : undefined,
          ].filter(Boolean) as any,
        },
      });

      if (exists) {
        throw new BadRequestException(
          'Brand with same name or code already exists',
        );
      }
    }

    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.brand.delete({
      where: { id },
    });
  }
}