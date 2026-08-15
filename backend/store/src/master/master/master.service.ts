import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) { }

  async getMasterData() {
    const [categories, brands, units, currencies, attributes, attributeValues] = await Promise.all([
      this.prisma.category.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      }),
      this.prisma.brand.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      }),
      this.prisma.unit.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      }),
      this.prisma.currency.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      }),
      this.prisma.attribute.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          code:true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
      this.prisma.attributeValue.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          attributeId: true,
          skuCode: true,
          code: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    const formattedAttributeValues = attributeValues.map((item) => ({
  ...item,
  code: item.code
    ? String(parseInt(item.code.replace(/\D/g, ""), 10))
    : null,
}));

    return {
      categories,
      brands,
      units,
      currencies,
      attributes,
      // attributeValues,
       attributeValues: formattedAttributeValues,
    };
  }
  

  async getAttributeMaster() {
    const [attributes, attributeValues] = await Promise.all([
      this.prisma.attribute.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.attributeValue.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          attributeId: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return {
      attributes,
      attributeValues,
    };
  }
}