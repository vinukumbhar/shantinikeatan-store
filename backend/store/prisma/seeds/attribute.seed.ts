import { PrismaClient } from '@prisma/client';

export async function seedAttribute(prisma: PrismaClient) {
  console.log('🌱 Seeding Attributes...');

  const attributes = [
    // Product Variants
    { name: 'Color', code: 'COLOR' },
    { name: 'Size', code: 'SIZE' },
    { name: 'Material', code: 'MATERIAL' },

    // Clothing
    { name: 'Gender', code: 'GENDER' },
    { name: 'Fit', code: 'FIT' },
    { name: 'Sleeve Type', code: 'SLEEVE' },
    { name: 'Collar Type', code: 'COLLAR' },
    { name: 'Pattern', code: 'PATTERN' },

    // Footwear
    { name: 'Shoe Size', code: 'SHOE_SIZE' },

    // Bags
    { name: 'Capacity', code: 'CAPACITY' },

    // Electronics
    { name: 'Storage', code: 'STORAGE' },
    { name: 'RAM', code: 'RAM' },
    { name: 'Processor', code: 'PROCESSOR' },

    // General
    { name: 'Weight', code: 'WEIGHT' },
    { name: 'Length', code: 'LENGTH' },
    { name: 'Width', code: 'WIDTH' },
    { name: 'Height', code: 'HEIGHT' },

    // Inventory
    { name: 'Warranty', code: 'WARRANTY' },
    { name: 'Country of Origin', code: 'ORIGIN' },
    { name: 'Finish', code: 'FINISH' },
  ];

  for (const attribute of attributes) {
    await prisma.attribute.upsert({
      where: {
        code: attribute.code,
      },
      update: attribute,
      create: attribute,
    });
  }

  console.log(`✅ ${attributes.length} Attributes Seeded`);
}