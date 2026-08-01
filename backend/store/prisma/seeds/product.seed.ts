import { PrismaClient } from '@prisma/client';

export async function seedProduct(prisma: PrismaClient) {
  console.log('🌱 Seeding Products...');

  const brands = Object.fromEntries(
    (await prisma.brand.findMany()).map((b) => [b.code, b.id]),
  );

  const categories = Object.fromEntries(
    (await prisma.category.findMany()).map((c) => [c.code, c.id]),
  );

  const units = Object.fromEntries(
    (await prisma.unit.findMany()).map((u) => [u.code, u.id]),
  );

  const taxes = Object.fromEntries(
    (await prisma.tax.findMany()).map((t) => [t.code, t.id]),
  );

  const products = [
    {
      name: 'School Shirt',
      code: 'PRD0001',
      sku: 'UNI-SHIRT',
      brand: 'PETER',
      category: 'SCHOOL_SHIRT',
    },
    {
      name: 'School Pant',
      code: 'PRD0002',
      sku: 'UNI-PANT',
      brand: 'PETER',
      category: 'SCHOOL_PANT',
    },
    {
      name: 'School Tie',
      code: 'PRD0003',
      sku: 'UNI-TIE',
      brand: 'PETER',
      category: 'SCHOOL_TIE',
    },
    {
      name: 'School Belt',
      code: 'PRD0004',
      sku: 'UNI-BELT',
      brand: 'PETER',
      category: 'SCHOOL_BELT',
    },
    {
      name: 'Sports Shoe',
      code: 'PRD0005',
      sku: 'SHOE-SPORT',
      brand: 'NIKE',
      category: 'SPORT_SHOES',
    },
    {
      name: 'School Shoe',
      code: 'PRD0006',
      sku: 'SHOE-SCHOOL',
      brand: 'BATA',
      category: 'SCHOOL_SHOES',
    },
    {
      name: 'Running Shoe',
      code: 'PRD0007',
      sku: 'SHOE-RUN',
      brand: 'ADIDAS',
      category: 'SPORT_SHOES',
    },
    {
      name: 'School Bag',
      code: 'PRD0008',
      sku: 'BAG-SCHOOL',
      brand: 'CELLO',
      category: 'SCHOOL_BAGS',
    },
    {
      name: 'Laptop Bag',
      code: 'PRD0009',
      sku: 'BAG-LAPTOP',
      brand: 'HP',
      category: 'LAPTOP_BAGS',
    },
    {
      name: 'Notebook',
      code: 'PRD0010',
      sku: 'NOTEBOOK',
      brand: 'CLASSMATE',
      category: 'NOTEBOOKS',
    },
    {
      name: 'Blue Pen',
      code: 'PRD0011',
      sku: 'PEN-BLUE',
      brand: 'CELLO',
      category: 'PENS',
    },
    {
      name: 'Pencil',
      code: 'PRD0012',
      sku: 'PENCIL',
      brand: 'APSARA',
      category: 'PENCILS',
    },
    {
      name: 'Geometry Box',
      code: 'PRD0013',
      sku: 'GEOMETRY',
      brand: 'CAMLIN',
      category: 'GEOMETRY',
    },
    {
      name: 'HP Laptop',
      code: 'PRD0014',
      sku: 'HP-LAPTOP',
      brand: 'HP',
      category: 'LAPTOPS',
    },
    {
      name: 'Wireless Mouse',
      code: 'PRD0015',
      sku: 'MOUSE',
      brand: 'LOGITECH',
      category: 'ACCESSORIES',
    },
    {
      name: 'Cricket Bat',
      code: 'PRD0016',
      sku: 'BAT',
      brand: 'PUMA',
      category: 'CRICKET',
    },
    {
      name: 'Football',
      code: 'PRD0017',
      sku: 'FOOTBALL',
      brand: 'PUMA',
      category: 'FOOTBALL',
    },
    {
      name: 'Badminton Racket',
      code: 'PRD0018',
      sku: 'RACKET',
      brand: 'PUMA', // Change to YONEX if you've added that brand
      category: 'BADMINTON',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        code: product.code,
      },

      update: {
        name: product.name,
        sku: product.sku,

        brandId: brands[product.brand],
        categoryId: categories[product.category],
        unitId: units['PCS'],
        taxId: taxes['GST18'],

        manufacturer: product.brand,
        hasVariants: true,
        trackInventory: true,
        allowBackorder: false,

        isActive: true,
      },

      create: {
        name: product.name,
        code: product.code,
        sku: product.sku,

        brandId: brands[product.brand],
        categoryId: categories[product.category],
        unitId: units['PCS'],
        taxId: taxes['GST18'],

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