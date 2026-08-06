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
    },
    {
      productSku: "UNI-SHIRT",
      name: "White Medium",
      sku: "UNI-SHIRT-WHITE-M",
    },
    {
      productSku: "UNI-SHIRT",
      name: "White Large",
      sku: "UNI-SHIRT-WHITE-L",
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 7",
      sku: "SHOE-7",
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 8",
      sku: "SHOE-8",
    },
    {
      productSku: "SHOE-SCHOOL",
      name: "Black Size 9",
      sku: "SHOE-9",
    },
    {
      productSku: "NOTEBOOK",
      name: "200 Pages",
      sku: "NOTEBOOK-200",
    },
    {
      productSku: "NOTEBOOK",
      name: "400 Pages",
      sku: "NOTEBOOK-400",
    },
  ];

  for (const variant of variants) {
    await prisma.productVariant.create({
      data: {
        productId: products[variant.productSku],
        name: variant.name,
        sku: variant.sku,
        isActive: true,
      },
    });
  }

  console.log(`✅ ${variants.length} Product Variants Seeded`);
}