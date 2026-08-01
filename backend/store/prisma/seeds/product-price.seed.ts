import { PrismaClient } from '@prisma/client';

export async function seedProductPrice(prisma: PrismaClient) {
  console.log('🌱 Seeding Product Prices...');

  const variants = Object.fromEntries(
    (await prisma.productVariant.findMany()).map((v) => [v.sku, v.id]),
  );

  const priceLists = Object.fromEntries(
    (await prisma.priceList.findMany()).map((p) => [p.code, p.id]),
  );

  const prices = [
    // ===============================
    // School Shirt White Small
    // ===============================

    {
      variant: 'UNI-SHIRT-WHITE-S',
      prices: {
        RETAIL: 599,
        WHOLESALE: 550,
        DISTRIBUTOR: 525,
        SCHOOL: 500,
        ONLINE: 575,
        EMPLOYEE: 475,
        FESTIVAL: 549,
      },
    },

    // ===============================
    // School Shirt White Medium
    // ===============================

    {
      variant: 'UNI-SHIRT-WHITE-M',
      prices: {
        RETAIL: 599,
        WHOLESALE: 550,
        DISTRIBUTOR: 525,
        SCHOOL: 500,
        ONLINE: 575,
        EMPLOYEE: 475,
        FESTIVAL: 549,
      },
    },

    // ===============================
    // School Shirt White Large
    // ===============================

    {
      variant: 'UNI-SHIRT-WHITE-L',
      prices: {
        RETAIL: 599,
        WHOLESALE: 550,
        DISTRIBUTOR: 525,
        SCHOOL: 500,
        ONLINE: 575,
        EMPLOYEE: 475,
        FESTIVAL: 549,
      },
    },

    // ===============================
    // School Shoe Size 7
    // ===============================

    {
      variant: 'SHOE-7',
      prices: {
        RETAIL: 1099,
        WHOLESALE: 1049,
        DISTRIBUTOR: 999,
        SCHOOL: 975,
        ONLINE: 1050,
        EMPLOYEE: 950,
        FESTIVAL: 999,
      },
    },

    // ===============================
    // Notebook 200 Pages
    // ===============================

    {
      variant: 'NOTEBOOK-200',
      prices: {
        RETAIL: 100,
        WHOLESALE: 90,
        DISTRIBUTOR: 85,
        SCHOOL: 80,
        ONLINE: 95,
        EMPLOYEE: 75,
        FESTIVAL: 89,
      },
    },
  ];

  for (const variant of prices) {
    for (const [priceListCode, price] of Object.entries(variant.prices)) {
      await prisma.productPrice.upsert({
        where: {
          variantId_priceListId: {
            variantId: variants[variant.variant],
            priceListId: priceLists[priceListCode],
          },
        },

        update: {
          price,
        },

        create: {
          variantId: variants[variant.variant],
          priceListId: priceLists[priceListCode],
          price,
        },
      });
    }
  }

  console.log('✅ Product Prices Seeded');
}