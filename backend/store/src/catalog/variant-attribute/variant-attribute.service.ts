import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';

@Injectable()
export class VariantAttributeService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateVariantAttributeDto) {
    const exists = await this.prisma.variantAttribute.findFirst({
      where: {
        variantId: createDto.variantId,
        attributeId: createDto.attributeId,
      },
    });

    if (exists) {
      throw new BadRequestException(
        'Attribute already assigned to this variant',
      );
    }

    const {
      variantId,
      attributeId,
      attributeValueId,
      ...data
    } = createDto;

    return this.prisma.variantAttribute.create({
      data: {
        ...data,

        variant: {
          connect: {
            id: variantId,
          },
        },

        attribute: {
          connect: {
            id: attributeId,
          },
        },

        attributeValue: {
          connect: {
            id: attributeValueId,
          },
        },
      },

      include: {
        variant: true,
        attribute: true,
        attributeValue: true,
      },
    });
  }

  findAll() {
    return this.prisma.variantAttribute.findMany({
      include: {
        variant: true,
        attribute: true,
        attributeValue: true,
      },
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.variantAttribute.findUnique({
      where: { id },

      include: {
        variant: true,
        attribute: true,
        attributeValue: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Variant Attribute not found');
    }

    return result;
  }

  async update(id: string, updateDto: UpdateVariantAttributeDto) {
    await this.findOne(id);

    const {
      variantId,
      attributeId,
      attributeValueId,
      ...data
    } = updateDto;

    return this.prisma.variantAttribute.update({
      where: { id },

      data: {
        ...data,

        variant: variantId
          ? {
              connect: {
                id: variantId,
              },
            }
          : undefined,

        attribute: attributeId
          ? {
              connect: {
                id: attributeId,
              },
            }
          : undefined,

        attributeValue: attributeValueId
          ? {
              connect: {
                id: attributeValueId,
              },
            }
          : undefined,
      },

      include: {
        variant: true,
        attribute: true,
        attributeValue: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.variantAttribute.delete({
      where: { id },
    });
  }
}