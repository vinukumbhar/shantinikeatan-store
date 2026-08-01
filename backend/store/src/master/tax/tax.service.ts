import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Injectable()
export class TaxService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaxDto: CreateTaxDto) {
    const exists = await this.prisma.tax.findUnique({
      where: {
        code: createTaxDto.code,
      },
    });

    if (exists) {
      throw new BadRequestException('Tax code already exists');
    }

    return this.prisma.tax.create({
      data: createTaxDto,
    });
  }

  async findAll() {
    return this.prisma.tax.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const tax = await this.prisma.tax.findUnique({
      where: { id },
    });

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return tax;
  }

  async update(id: string, updateTaxDto: UpdateTaxDto) {
    await this.findOne(id);

    if (updateTaxDto.code) {
      const exists = await this.prisma.tax.findFirst({
        where: {
          code: updateTaxDto.code,
          NOT: {
            id,
          },
        },
      });

      if (exists) {
        throw new BadRequestException('Tax code already exists');
      }
    }

    return this.prisma.tax.update({
      where: { id },
      data: updateTaxDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.tax.delete({
      where: { id },
    });
  }
}