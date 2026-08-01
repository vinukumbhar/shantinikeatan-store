import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { code, gstNumber, panNumber } = createCompanyDto;

    if (code) {
      const exists = await this.prisma.company.findUnique({
        where: { code },
      });

      if (exists) {
        throw new BadRequestException('Company code already exists');
      }
    }

    if (gstNumber) {
      const exists = await this.prisma.company.findUnique({
        where: { gstNumber },
      });

      if (exists) {
        throw new BadRequestException('GST Number already exists');
      }
    }

    if (panNumber) {
      const exists = await this.prisma.company.findUnique({
        where: { panNumber },
      });

      if (exists) {
        throw new BadRequestException('PAN Number already exists');
      }
    }

    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);

    const { code, gstNumber, panNumber } = updateCompanyDto;

    if (code) {
      const exists = await this.prisma.company.findFirst({
        where: {
          code,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('Company code already exists');
      }
    }

    if (gstNumber) {
      const exists = await this.prisma.company.findFirst({
        where: {
          gstNumber,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('GST Number already exists');
      }
    }

    if (panNumber) {
      const exists = await this.prisma.company.findFirst({
        where: {
          panNumber,
          NOT: { id },
        },
      });

      if (exists) {
        throw new BadRequestException('PAN Number already exists');
      }
    }

    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.company.delete({
      where: { id },
    });
  }
}