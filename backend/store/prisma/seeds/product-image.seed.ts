import { PrismaClient } from "@prisma/client";

export async function seedProductImage(prisma: PrismaClient) {
  console.log("🌱 Seeding Product Images...");

  const products = Object.fromEntries(
    (await prisma.product.findMany()).map((p) => [p.sku, p.id])
  );

  const images = [
    {
      product: "UNI-SHIRT",
      imageUrl: "/products/shirt/front.png",
      altText: "School Shirt Front",
      sortOrder: 1,
      isPrimary: true,
    },
    {
      product: "UNI-SHIRT",
      imageUrl: "/products/shirt/back.png",
      altText: "School Shirt Back",
      sortOrder: 2,
      isPrimary: false,
    },
    {
      product: "SHOE-SCHOOL",
      imageUrl: "/products/shoe/front.png",
      altText: "School Shoe",
      sortOrder: 1,
      isPrimary: true,
    },
    {
      product: "NOTEBOOK",
      imageUrl: "/products/notebook/front.png",
      altText: "Notebook",
      sortOrder: 1,
      isPrimary: true,
    },
  ];

  for (const image of images) {
    await prisma.productImage.create({
      data: {
        productId: products[image.product],
        imageUrl: image.imageUrl,
        altText: image.altText,
        sortOrder: image.sortOrder,
        isPrimary: image.isPrimary,
      },
    });
  }

  console.log(`✅ ${images.length} Product Images Seeded`);
}