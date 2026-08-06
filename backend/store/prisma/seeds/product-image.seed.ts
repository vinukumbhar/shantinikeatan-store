import { PrismaClient } from "@prisma/client";

export async function seedProductImage(prisma: PrismaClient) {
  console.log("🌱 Seeding Product Images...");

  const products = Object.fromEntries(
    (await prisma.product.findMany()).map((p) => [p.sku, p.id]),
  );

  const images = [
    {
      product: "UNI-SHIRT",
      path: "/products/shirt/front.png",
    },
    {
      product: "UNI-SHIRT",
      path: "/products/shirt/back.png",
    },
    {
      product: "SHOE-SCHOOL",
      path: "/products/shoe/front.png",
    },
    {
      product: "NOTEBOOK",
      path: "/products/notebook/front.png",
    },
  ];

  for (const image of images) {
    const productId = products[image.product];

    if (!productId) {
      throw new Error(`Product not found: ${image.product}`);
    }

    await prisma.productImage.create({
      data: {
        productId,
        path: image.path,
      },
    });
  }

  console.log(`✅ ${images.length} Product Images Seeded`);
}