import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    const exists = await this.prisma.unit.findUnique({
      where: {
        code: createUnitDto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Unit code already exists');
    }

    return this.prisma.unit.create({
      data: createUnitDto,
    });
  }

  async findAll() {
    return this.prisma.unit.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    await this.findOne(id);

    if (updateUnitDto.code) {
      const exists = await this.prisma.unit.findFirst({
        where: {
          code: updateUnitDto.code,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('Unit code already exists');
      }
    }

    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.unit.delete({
      where: { id },
    });
  }
}