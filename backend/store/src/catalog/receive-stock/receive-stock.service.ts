import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateReceiveStockDto } from './dto/create-receive-stock.dto';
import { UpdateReceiveStockDto } from './dto/update-receive-stock.dto';

@Injectable()
export class ReceiveStockService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================================================
  // CREATE / RECEIVE STOCK
  // =========================================================

  async create(dto: CreateReceiveStockDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Find Product Variant
      const variant = await tx.productVariant.findUnique({
        where: {
          id: dto.variantId,
        },
      });

      if (!variant) {
        throw new NotFoundException('Product variant not found');
      }

      // 2. Find Selected Price List
      const priceList = await tx.priceList.findUnique({
        where: {
          id: dto.priceListId,
        },
      });

      if (!priceList) {
        throw new NotFoundException('Price list not found');
      }

      // 3. Find PriceListItem for this Variant inside selected PriceList
      const existingItem = await tx.priceListItem.findFirst({
        where: {
          priceListId: dto.priceListId,
          variantId: dto.variantId,
        },
      });

      // CASE 1: Variant does NOT exist in selected PriceList -> Create PriceListItem with Prices
      if (!existingItem) {
        const priceListItem = await tx.priceListItem.create({
          data: {
            priceListId: dto.priceListId,
            productId: variant.productId,
            variantId: dto.variantId,
            stock: dto.quantity,
            costPrice: dto.costPrice,
            mrp: dto.mrp,
            sellingPrice: dto.sellingPrice,
            currencyId: dto.currencyId,
          },
        });

        const updatedVariant = await tx.productVariant.update({
          where: {
            id: dto.variantId,
          },
          data: {
            stock: {
              increment: dto.quantity,
            },
          },
        });

        return {
          message: 'Stock received successfully',
          action: 'PRICE_LIST_ITEM_CREATED',
          priceList,
          priceListItem,
          variant: updatedVariant,
        };
      }

      // CASE 2: Variant ALREADY EXISTS in selected PriceList -> Increment ONLY Stock
      const priceListItem = await tx.priceListItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          stock: {
            increment: dto.quantity,
          },
        },
      });

      const updatedVariant = await tx.productVariant.update({
        where: {
          id: dto.variantId,
        },
        data: {
          stock: {
            increment: dto.quantity,
          },
        },
      });

      return {
        message: 'Stock updated for existing price list item',
        action: 'STOCK_ADDED',
        priceList,
        priceListItem,
        variant: updatedVariant,
      };
    });
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(priceListItemId: string) {
    const item = await this.prisma.priceListItem.findUnique({
      where: {
        id: priceListItemId,
      },
      include: {
        priceList: true,
        product: true,
        variant: true,
        currency: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Price list item not found');
    }

    return item;
  }

  // =========================================================
  // UPDATE
  // =========================================================

  async update(priceListItemId: string, dto: UpdateReceiveStockDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Find PriceListItem
      const existingItem = await tx.priceListItem.findUnique({
        where: {
          id: priceListItemId,
        },
      });

      if (!existingItem) {
        throw new NotFoundException('Price list item not found');
      }

      // 2. Make sure Variant exists
      if (!existingItem.variantId) {
        throw new BadRequestException(
          'Price list item is not linked to a variant',
        );
      }

      // 3. Calculate Stock Difference
      const oldStock = existingItem.stock;
      const newStock = dto.quantity !== undefined ? dto.quantity : oldStock;
      const stockDifference = newStock - oldStock;

      // 4. Update PriceListItem
      const updatedItem = await tx.priceListItem.update({
        where: {
          id: priceListItemId,
        },
        data: {
          ...(dto.quantity !== undefined && { stock: dto.quantity }),
          ...(dto.costPrice !== undefined && { costPrice: dto.costPrice }),
          ...(dto.mrp !== undefined && { mrp: dto.mrp }),
          ...(dto.sellingPrice !== undefined && { sellingPrice: dto.sellingPrice }),
          ...(dto.currencyId !== undefined && { currencyId: dto.currencyId }),
        },
        include: {
          priceList: true,
          product: true,
          variant: true,
          currency: true,
        },
      });

      // 5. Update ProductVariant Stock
      let updatedVariant: Awaited<
        ReturnType<typeof tx.productVariant.update>
      > | null = null;

      if (stockDifference !== 0) {
        updatedVariant = await tx.productVariant.update({
          where: {
            id: existingItem.variantId,
          },
          data: {
            stock: {
              increment: stockDifference,
            },
          },
        });
      }

      // 6. Return
      return {
        message: 'Stock information updated successfully',
        priceListItem: updatedItem,
        variant: updatedVariant,
      };
    });
  }
}