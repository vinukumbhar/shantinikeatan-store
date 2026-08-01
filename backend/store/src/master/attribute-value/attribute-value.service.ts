import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';

@Injectable()
export class AttributeValueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateAttributeValueDto) {
    if (createDto.code) {
      const exists = await this.prisma.attributeValue.findUnique({
        where: { code: createDto.code },
      });

      if (exists) {
        throw new BadRequestException('Attribute Value code already exists');
      }
    }

    return this.prisma.attributeValue.create({
      data: {
        name: createDto.name,
        code: createDto.code,
        description: createDto.description,
        isActive: createDto.isActive,
        attribute: {
          connect: {
            id: createDto.attributeId,
          },
        },
      },
      include: {
        attribute: true,
      },
    });
  }

  async findAll() {
    return this.prisma.attributeValue.findMany({
      include: {
        attribute: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const value = await this.prisma.attributeValue.findUnique({
      where: { id },
      include: {
        attribute: true,
      },
    });

    if (!value) {
      throw new NotFoundException('Attribute Value not found');
    }

    return value;
  }

  async update(id: string, updateDto: UpdateAttributeValueDto) {
    await this.findOne(id);

    const { attributeId, ...data } = updateDto;

    return this.prisma.attributeValue.update({
      where: { id },
      data: {
        ...data,
        ...(attributeId && {
          attribute: {
            connect: {
              id: attributeId,
            },
          },
        }),
      },
      include: {
        attribute: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.attributeValue.delete({
      where: { id },
    });
  }
}