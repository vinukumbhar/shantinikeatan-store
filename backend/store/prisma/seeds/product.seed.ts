import { PrismaClient } from '@prisma/client';

export async function seedProduct(prisma: PrismaClient) {
  console.log('🌱 Seeding Products...');

  const brands = Object.fromEntries(
    (await prisma.brand.findMany()).map((b) => [b.code, b.id]),
  );

  const units = Object.fromEntries(
    (await prisma.unit.findMany()).map((u) => [u.code, u.id]),
  );

  const taxes = Object.fromEntries(
    (await prisma.tax.findMany()).map((t) => [t.code, t.id]),
  );

  const defaultCategoryIds = [
    "cmsbty2z9001evj7g4jgrs9w0",
    "cmsbty2zb001fvj7gynskzlbn",
  ];

  const products = [
    { name: "School Shirt", sku: "UNI-SHIRT", brand: "PETER", categoryIds: defaultCategoryIds },
    { name: "School Pant", sku: "UNI-PANT", brand: "PETER", categoryIds: defaultCategoryIds },
    { name: "School Tie", sku: "UNI-TIE", brand: "PETER", categoryIds: defaultCategoryIds },
    { name: "School Belt", sku: "UNI-BELT", brand: "PETER", categoryIds: defaultCategoryIds },

    { name: "Sports Shoe", sku: "SHOE-SPORT", brand: "NIKE", categoryIds: defaultCategoryIds },
    { name: "School Shoe", sku: "SHOE-SCHOOL", brand: "BATA", categoryIds: defaultCategoryIds },
    { name: "Running Shoe", sku: "SHOE-RUN", brand: "ADIDAS", categoryIds: defaultCategoryIds },

    { name: "School Bag", sku: "BAG-SCHOOL", brand: "CELLO", categoryIds: defaultCategoryIds },
    { name: "Laptop Bag", sku: "BAG-LAPTOP", brand: "HP", categoryIds: defaultCategoryIds },

    { name: "Notebook", sku: "NOTEBOOK", brand: "CLASSMATE", categoryIds: defaultCategoryIds },
    { name: "Blue Pen", sku: "PEN-BLUE", brand: "CELLO", categoryIds: defaultCategoryIds },
    { name: "Pencil", sku: "PENCIL", brand: "APSARA", categoryIds: defaultCategoryIds },
    { name: "Geometry Box", sku: "GEOMETRY", brand: "CAMLIN", categoryIds: defaultCategoryIds },

    { name: "HP Laptop", sku: "HP-LAPTOP", brand: "HP", categoryIds: defaultCategoryIds },
    { name: "Wireless Mouse", sku: "MOUSE", brand: "LOGITECH", categoryIds: defaultCategoryIds },

    { name: "Cricket Bat", sku: "BAT", brand: "PUMA", categoryIds: defaultCategoryIds },
    { name: "Football", sku: "FOOTBALL", brand: "PUMA", categoryIds: defaultCategoryIds },
    { name: "Badminton Racket", sku: "RACKET", brand: "PUMA", categoryIds: defaultCategoryIds },
  ];
  let nextNumber = 1;

  for (const product of products) {
    const brandId = brands[product.brand];

    if (!brandId) {
      throw new Error(`Brand not found: ${product.brand}`);
    }

    const code = `PR${String(nextNumber++).padStart(6, '0')}`;

    await prisma.product.create({
      data: {
        name: product.name,
        code,
        sku: product.sku,

        brandId,
        categoryIds: product.categoryIds,

        unitId: units["PCS"],
        taxId: taxes["GST18"],

        manufacturer: product.brand,

        hasVariants: true,
        trackInventory: true,
        allowBackorder: false,
        isActive: true,
      },
    });
  }

  console.log(`✅ ${products.length} Products Seeded`);
}