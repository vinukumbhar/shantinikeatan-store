import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeWithValuesDto } from './dto/create-attribute-with-values.dto';
import { UpdateAttributeWithValuesDto } from './dto/update-attribute-with-values.dto';

@Injectable()
export class AttributeService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================================================
  // CREATE ATTRIBUTE
  // =========================================================

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

  // =========================================================
  // CREATE ATTRIBUTE WITH VALUES
  // =========================================================

  async createWithValues(dto: CreateAttributeWithValuesDto) {
    // Check Attribute code
    const attributeExists = await this.prisma.attribute.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (attributeExists) {
      throw new BadRequestException('Attribute code already exists');
    }

    // Find latest AttributeValue code
    const lastValue = await this.prisma.attributeValue.findFirst({
      where: {
        code: {
          not: null,
        },
      },
      orderBy: {
        code: 'desc',
      },
      select: {
        code: true,
      },
    });

    let nextNumber = 1;

    if (lastValue?.code) {
      const match = lastValue.code.match(/^AV(\d+)$/);

      if (match) {
        nextNumber = Number(match[1]) + 1;
      }
    }

    return this.prisma.attribute.create({
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        isActive: dto.isActive ?? true,

        values: {
          create: dto.values.map((value) => {
            const code = `AV${String(nextNumber++).padStart(6, '0')}`;

            return {
              code,
              name: value.name,
              skuCode: value.skuCode,
              description: value.description,
              isActive: value.isActive ?? true,
            };
          }),
        },
      },

      include: {
        values: true,
      },
    });
  }

  // =========================================================
  // UPDATE ATTRIBUTE WITH VALUES
  // =========================================================

  async updateWithValues(
    id: string,
    dto: UpdateAttributeWithValuesDto,
  ) {
    // Check Attribute exists
    const attribute = await this.prisma.attribute.findUnique({
      where: {
        id,
      },
      include: {
        values: true,
      },
    });

    if (!attribute) {
      throw new NotFoundException('Attribute not found');
    }

    // Check duplicate Attribute code
    const duplicateCode = await this.prisma.attribute.findFirst({
      where: {
        code: dto.code,
        NOT: {
          id,
        },
      },
    });

    if (duplicateCode) {
      throw new BadRequestException(
        'Attribute code already exists',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // -----------------------------------------------------
      // Update Attribute
      // -----------------------------------------------------

      await tx.attribute.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          code: dto.code,
          description: dto.description,
          isActive: dto.isActive ?? true,
        },
      });

      // -----------------------------------------------------
      // Existing AttributeValue IDs from request
      // -----------------------------------------------------

      const existingValueIds = dto.values
        .filter((value) => value.id)
        .map((value) => value.id!);

      // -----------------------------------------------------
      // Delete removed AttributeValues
      // -----------------------------------------------------

      await tx.attributeValue.deleteMany({
        where: {
          attributeId: id,

          id: {
            notIn:
              existingValueIds.length > 0
                ? existingValueIds
                : ['__no_existing_values__'],
          },
        },
      });

      // -----------------------------------------------------
      // Find latest AttributeValue code
      // -----------------------------------------------------

      const lastValue = await tx.attributeValue.findFirst({
        where: {
          code: {
            not: null,
          },
        },
        orderBy: {
          code: 'desc',
        },
        select: {
          code: true,
        },
      });

      let nextNumber = 1;

      if (lastValue?.code) {
        const match = lastValue.code.match(/^AV(\d+)$/);

        if (match) {
          nextNumber = Number(match[1]) + 1;
        }
      }

      // -----------------------------------------------------
      // Update existing / create new values
      // -----------------------------------------------------

      for (const value of dto.values) {
        // Existing value
        if (value.id) {
          await tx.attributeValue.update({
            where: {
              id: value.id,
            },

            data: {
              name: value.name,
              skuCode: value.skuCode,
              description: value.description,
              isActive: value.isActive ?? true,
            },
          });
        }

        // New value
        else {
          const code = `AV${String(nextNumber++).padStart(6, '0')}`;

          await tx.attributeValue.create({
            data: {
              code,
              name: value.name,
              skuCode: value.skuCode,
              description: value.description,
              isActive: value.isActive ?? true,

              attribute: {
                connect: {
                  id,
                },
              },
            },
          });
        }
      }

      // -----------------------------------------------------
      // Return updated Attribute
      // -----------------------------------------------------

      return tx.attribute.findUnique({
        where: {
          id,
        },

        include: {
          values: true,
        },
      });
    });
  }

  // =========================================================
  // FIND ALL
  // =========================================================

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

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(id: string) {
    const attribute = await this.prisma.attribute.findUnique({
      where: {
        id,
      },

      include: {
        values: true,
      },
    });

    if (!attribute) {
      throw new NotFoundException('Attribute not found');
    }

    return attribute;
  }

  // =========================================================
  // UPDATE ATTRIBUTE ONLY
  // =========================================================

  async update(
    id: string,
    updateAttributeDto: UpdateAttributeDto,
  ) {
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
        throw new BadRequestException(
          'Attribute code already exists',
        );
      }
    }

    return this.prisma.attribute.update({
      where: {
        id,
      },

      data: updateAttributeDto,
    });
  }

  // =========================================================
  // DELETE ATTRIBUTE
  // =========================================================

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.attribute.delete({
      where: {
        id,
      },
    });
  }
}