import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Injectable()
export class AttributeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const exists = await this.prisma.attribute.findUnique({
      where: {
        code: createAttributeDto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Attribute code already exists');
    }

    return this.prisma.attribute.create({
      data: createAttributeDto,
    });
  }

  async findAll() {
    return this.prisma.attribute.findMany({
      include: {
        values: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const attribute = await this.prisma.attribute.findUnique({
      where: { id },
      include: {
        values: true,
      },
    });

    if (!attribute) {
      throw new NotFoundException('Attribute not found');
    }

    return attribute;
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    await this.findOne(id);

    if (updateAttributeDto.code) {
      const exists = await this.prisma.attribute.findFirst({
        where: {
          code: updateAttributeDto.code,
          NOT: {
            id,
          },
        },
      });

      if (exists) {
        throw new BadRequestException('Attribute code already exists');
      }
    }

    return this.prisma.attribute.update({
      where: { id },
      data: updateAttributeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.attribute.delete({
      where: { id },
    });
  }
}