import { PrismaClient } from "@prisma/client";

export async function seedProductVariant(prisma: PrismaClient) {
  console.log("🌱 Seeding Product Variants...");

  const products = Object.fromEntries(
    (await prisma.product.findMany()).map((p) => [p.sku, p.id])
  );

  const variants = [
    {
      productSku: "UNI-SHIRT",
      name: "White Small",
      sku: "UNI-SHIRT-WHITE-S",
      costPrice: 450,
      sellingPrice: 599,
    },
    {
      productSku: "UNI-SHIRT",
      name: "White Medium",
      sku: "UNI-SHIRT-WHITE-M",
      costPrice: 450,
      sellingPrice: 599,
    },
    {
      productSku: "UNI-SHIRT",
      name: "White Large",
      sku: "UNI-SHIRT-WHITE-L",
      costPrice: 450,
      sellingPrice: 599,
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 7",
      sku: "SHOE-7",
      costPrice: 900,
      sellingPrice: 1099,
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 8",
      sku: "SHOE-8",
      costPrice: 900,
      sellingPrice: 1099,
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 9",
      sku: "SHOE-9",
      costPrice: 900,
      sellingPrice: 1099,
    },
    {
      productSku: "NOTEBOOK",
      name: "200 Pages",
      sku: "NOTEBOOK-200",
      costPrice: 70,
      sellingPrice: 100,
    },
    {
      productSku: "NOTEBOOK",
      name: "400 Pages",
      sku: "NOTEBOOK-400",
      costPrice: 110,
      sellingPrice: 150,
    },
  ];

  for (const variant of variants) {
    await prisma.productVariant.upsert({
      where: {
        sku: variant.sku,
      },

      update: {
        name: variant.name,
        productId: products[variant.productSku],
        costPrice: variant.costPrice,
        sellingPrice: variant.sellingPrice,
        isActive: true,
      },

      create: {
        productId: products[variant.productSku],
        name: variant.name,
        sku: variant.sku,
        costPrice: variant.costPrice,
        sellingPrice: variant.sellingPrice,
        isActive: true,
      },
    });
  }

  console.log(`✅ ${variants.length} Product Variants Seeded`);
}