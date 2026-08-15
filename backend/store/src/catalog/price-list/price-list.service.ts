import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';

@Injectable()
export class PriceListService {
  constructor(private prisma: PrismaService) {}

  // =========================================================
  // Generate Price List Number
  // PL0001, PL0002, PL0003...
  // =========================================================
  private async generatePriceListNumber(): Promise<string> {
    const lastPriceList = await this.prisma.priceList.findFirst({
      orderBy: {
        number: 'desc',
      },
      select: {
        number: true,
      },
    });

    const nextNumber = lastPriceList
      ? Number(lastPriceList.number.replace('PL', '')) + 1
      : 1;

    return `PL${String(nextNumber).padStart(4, '0')}`;
  }

  // =========================================================
  // CREATE
  // =========================================================
  async create(createDto: CreatePriceListDto) {
    const number = await this.generatePriceListNumber();

    return this.prisma.priceList.create({
      data: {
        number,

        name: createDto.name,
        invoiceId: createDto.invoiceId,
        poId: createDto.poId,
        approvedById: createDto.approvedById,

        date: createDto.date
          ? new Date(createDto.date)
          : undefined,

        items: {
          create: createDto.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            stock: item.stock,
            sellingPrice: item.sellingPrice,
            costPrice: item.costPrice,
            mrp: item.mrp,
            currencyId: item.currencyId,
          })),
        },
      },

      include: {
        items: {
          include: {
            product: true,
            variant: true,
            currency: true,
          },
        },
      },
    });
  }

  // =========================================================
  // FIND ALL
  // =========================================================
  async findAll() {
    return this.prisma.priceList.findMany({
      include: {
        items: {
          include: {
            product: true,
            variant: true,
            currency: true,
          },
        },

        _count: {
          select: {
            items: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =========================================================
// FIND TODAY'S PRICE LISTS
// =========================================================
async findToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return this.prisma.priceList.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
          currency: true,
        },
      },
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

  // =========================================================
  // FIND ONE
  // =========================================================
  async findOne(id: string) {
    const priceList = await this.prisma.priceList.findUnique({
      where: { id },

      include: {
        items: {
          include: {
            product: true,
            variant: true,
            currency: true,
          },
        },

        _count: {
          select: {
            items: true,
          },
        },
      },
    });

    if (!priceList) {
      throw new NotFoundException('Price List not found');
    }

    return priceList;
  }

  // =========================================================
  // UPDATE
  // =========================================================
  async update(
    id: string,
    updateDto: UpdatePriceListDto,
  ) {
    await this.findOne(id);

    return this.prisma.priceList.update({
      where: { id },

      data: {
        // number intentionally NOT updated
        name: updateDto.name,
        invoiceId: updateDto.invoiceId,
        poId: updateDto.poId,
        approvedById: updateDto.approvedById,

        date: updateDto.date
          ? new Date(updateDto.date)
          : undefined,
      },

      include: {
        items: {
          include: {
            product: true,
            variant: true,
            currency: true,
          },
        },

        _count: {
          select: {
            items: true,
          },
        },
      },
    });
  }

  // =========================================================
  // DELETE
  // =========================================================
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.priceList.delete({
      where: { id },
    });
  }
}