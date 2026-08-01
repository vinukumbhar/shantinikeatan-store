import { PrismaClient } from '@prisma/client';

export async function seedAttributeValue(prisma: PrismaClient) {
  console.log('🌱 Seeding Attribute Values...');

  const attributes = await prisma.attribute.findMany();

  const attributeMap = Object.fromEntries(
    attributes.map((a) => [a.code, a.id]),
  );

  const values = [
    // =====================
    // Color
    // =====================
    { attribute: 'COLOR', name: 'Black', skuCode: 'BLK' },
    { attribute: 'COLOR', name: 'White', skuCode: 'WHT' },
    { attribute: 'COLOR', name: 'Blue', skuCode: 'BLU' },
    { attribute: 'COLOR', name: 'Navy Blue', skuCode: 'NVY' },
    { attribute: 'COLOR', name: 'Dark Blue', skuCode: 'DBL' },
    { attribute: 'COLOR', name: 'Red', skuCode: 'RED' },
    { attribute: 'COLOR', name: 'Green', skuCode: 'GRN' },
    { attribute: 'COLOR', name: 'Yellow', skuCode: 'YLW' },
    { attribute: 'COLOR', name: 'Grey', skuCode: 'GRY' },
    { attribute: 'COLOR', name: 'Brown', skuCode: 'BRN' },
    { attribute: 'COLOR', name: 'Pink', skuCode: 'PNK' },

    // =====================
    // Size
    // =====================
    { attribute: 'SIZE', name: 'Extra Small', skuCode: 'XS' },
    { attribute: 'SIZE', name: 'Small', skuCode: 'S' },
    { attribute: 'SIZE', name: 'Medium', skuCode: 'M' },
    { attribute: 'SIZE', name: 'Large', skuCode: 'L' },
    { attribute: 'SIZE', name: 'Extra Large', skuCode: 'XL' },
    { attribute: 'SIZE', name: 'Double XL', skuCode: 'XXL' },
    { attribute: 'SIZE', name: 'Triple XL', skuCode: 'XXXL' },

    // =====================
    // Material
    // =====================
    { attribute: 'MATERIAL', name: 'Cotton', skuCode: 'COT' },
    { attribute: 'MATERIAL', name: 'Polyester', skuCode: 'POLY' },
    { attribute: 'MATERIAL', name: 'Denim', skuCode: 'DEN' },
    { attribute: 'MATERIAL', name: 'Leather', skuCode: 'LTH' },
    { attribute: 'MATERIAL', name: 'Canvas', skuCode: 'CNV' },

    // =====================
    // Gender
    // =====================
    { attribute: 'GENDER', name: 'Men', skuCode: 'MEN' },
    { attribute: 'GENDER', name: 'Women', skuCode: 'WMN' },
    { attribute: 'GENDER', name: 'Unisex', skuCode: 'UNI' },
    { attribute: 'GENDER', name: 'Boys', skuCode: 'BOY' },
    { attribute: 'GENDER', name: 'Girls', skuCode: 'GRL' },

    // =====================
    // Fit
    // =====================
    { attribute: 'FIT', name: 'Slim Fit', skuCode: 'SLM' },
    { attribute: 'FIT', name: 'Regular Fit', skuCode: 'REG' },
    { attribute: 'FIT', name: 'Relaxed Fit', skuCode: 'RLX' },

    // =====================
    // Sleeve
    // =====================
    { attribute: 'SLEEVE', name: 'Half Sleeve', skuCode: 'HS' },
    { attribute: 'SLEEVE', name: 'Full Sleeve', skuCode: 'FS' },
    { attribute: 'SLEEVE', name: 'Sleeveless', skuCode: 'SLV' },

    // =====================
    // Collar
    // =====================
    { attribute: 'COLLAR', name: 'Round Neck', skuCode: 'RN' },
    { attribute: 'COLLAR', name: 'Polo', skuCode: 'PL' },
    { attribute: 'COLLAR', name: 'Mandarin', skuCode: 'MDR' },

    // =====================
    // Pattern
    // =====================
    { attribute: 'PATTERN', name: 'Plain', skuCode: 'PLN' },
    { attribute: 'PATTERN', name: 'Striped', skuCode: 'STR' },
    { attribute: 'PATTERN', name: 'Checked', skuCode: 'CHK' },
    { attribute: 'PATTERN', name: 'Printed', skuCode: 'PRT' },

    // =====================
    // Shoe Size
    // =====================
    { attribute: 'SHOE_SIZE', name: '6', skuCode: '6' },
    { attribute: 'SHOE_SIZE', name: '7', skuCode: '7' },
    { attribute: 'SHOE_SIZE', name: '8', skuCode: '8' },
    { attribute: 'SHOE_SIZE', name: '9', skuCode: '9' },
    { attribute: 'SHOE_SIZE', name: '10', skuCode: '10' },

    // =====================
    // Capacity
    // =====================
    { attribute: 'CAPACITY', name: '20 L', skuCode: '20L' },
    { attribute: 'CAPACITY', name: '30 L', skuCode: '30L' },
    { attribute: 'CAPACITY', name: '40 L', skuCode: '40L' },

    // =====================
    // Storage
    // =====================
    { attribute: 'STORAGE', name: '128 GB', skuCode: '128G' },
    { attribute: 'STORAGE', name: '256 GB', skuCode: '256G' },
    { attribute: 'STORAGE', name: '512 GB', skuCode: '512G' },
    { attribute: 'STORAGE', name: '1 TB', skuCode: '1TB' },

    // =====================
    // RAM
    // =====================
    { attribute: 'RAM', name: '4 GB', skuCode: '4G' },
    { attribute: 'RAM', name: '8 GB', skuCode: '8G' },
    { attribute: 'RAM', name: '16 GB', skuCode: '16G' },
    { attribute: 'RAM', name: '32 GB', skuCode: '32G' },

    // =====================
    // Processor
    // =====================
    { attribute: 'PROCESSOR', name: 'Intel i3', skuCode: 'I3' },
    { attribute: 'PROCESSOR', name: 'Intel i5', skuCode: 'I5' },
    { attribute: 'PROCESSOR', name: 'Intel i7', skuCode: 'I7' },
    { attribute: 'PROCESSOR', name: 'AMD Ryzen 5', skuCode: 'R5' },
    { attribute: 'PROCESSOR', name: 'AMD Ryzen 7', skuCode: 'R7' },

    // =====================
    // Warranty
    // =====================
    { attribute: 'WARRANTY', name: '6 Months', skuCode: '6M' },
    { attribute: 'WARRANTY', name: '1 Year', skuCode: '1Y' },
    { attribute: 'WARRANTY', name: '2 Years', skuCode: '2Y' },

    // =====================
    // Finish
    // =====================
    { attribute: 'FINISH', name: 'Matte', skuCode: 'MAT' },
    { attribute: 'FINISH', name: 'Glossy', skuCode: 'GLS' },

    // =====================
    // Origin
    // =====================
    { attribute: 'ORIGIN', name: 'India', skuCode: 'IND' },
    { attribute: 'ORIGIN', name: 'China', skuCode: 'CHN' },
    { attribute: 'ORIGIN', name: 'Vietnam', skuCode: 'VNM' },
  ];

 let counter = 1;

for (const value of values) {
  const attributeId = attributeMap[value.attribute];

  if (!attributeId) {
    console.warn(`⚠️ Attribute '${value.attribute}' not found`);
    continue;
  }

  const code = `AV${counter.toString().padStart(6, '0')}`;

  await prisma.attributeValue.upsert({
    where: {
      attributeId_skuCode: {
        attributeId,
        skuCode: value.skuCode,
      },
    },
    update: {
      name: value.name,
      skuCode: value.skuCode,
      isActive: true,
    },
    create: {
      code,
      name: value.name,
      skuCode: value.skuCode,
      attributeId,
      isActive: true,
    },
  });

  counter++;
}

console.log(`✅ ${values.length} Attribute Values Seeded`);
}