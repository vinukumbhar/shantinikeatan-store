import { PrismaClient } from '@prisma/client';

export async function seedProductPrice(prisma: PrismaClient) {
  console.log('🌱 Seeding Product Prices...');

  const variants = await prisma.productVariant.findMany({
    include: {
      product: true,
    },
  });

  const variantMap = Object.fromEntries(
    variants.map((v) => [
      v.sku,
      {
        variantId: v.id,
        productId: v.productId,
      },
    ]),
  );

  const priceLists = Object.fromEntries(
    (await prisma.priceList.findMany()).map((p: any) => [p.code, p.id]),
  );

  const prices = [
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

    // Add remaining variants here...
  ];

  for (const row of prices) {
    const variant = variantMap[row.variant];

    if (!variant) {
      console.warn(`Variant not found: ${row.variant}`);
      continue;
    }

    for (const [code, price] of Object.entries(row.prices)) {
      const priceListId = priceLists[code];

      if (!priceListId) {
        console.warn(`Price List not found: ${code}`);
        continue;
      }

      await prisma.priceListItem.create({
        data: {
          priceListId,
          productId: variant.productId,
          variantId: variant.variantId,
          stock: 0,
          costPrice: price,
          sellingPrice: price,
          mrp: price,
        },
      });
    }
  }

  console.log('✅ Product Prices Seeded');
}