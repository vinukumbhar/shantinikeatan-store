import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedVariantAttribute() {
  const data = [
    // White Shirt S
    { variant: 'UNI-SHIRT-WHITE-S', attribute: 'COLOR', value: 'WHT' },
    { variant: 'UNI-SHIRT-WHITE-S', attribute: 'SIZE', value: 'S' },

    // White Shirt M
    { variant: 'UNI-SHIRT-WHITE-M', attribute: 'COLOR', value: 'WHT' },
    { variant: 'UNI-SHIRT-WHITE-M', attribute: 'SIZE', value: 'M' },

    // White Shirt L
    { variant: 'UNI-SHIRT-WHITE-L', attribute: 'COLOR', value: 'WHT' },
    { variant: 'UNI-SHIRT-WHITE-L', attribute: 'SIZE', value: 'L' },

    // Shoe 7
    { variant: 'SHOE-7', attribute: 'COLOR', value: 'BLK' },
    { variant: 'SHOE-7', attribute: 'SHOE_SIZE', value: '7' },

    // Shoe 8
    { variant: 'SHOE-8', attribute: 'COLOR', value: 'BLK' },
    { variant: 'SHOE-8', attribute: 'SHOE_SIZE', value: '8' },

    // Shoe 9
    { variant: 'SHOE-9', attribute: 'COLOR', value: 'BLK' },
    { variant: 'SHOE-9', attribute: 'SHOE_SIZE', value: '9' },
  ];

  for (const item of data) {
    const variant = await prisma.productVariant.findFirst({
      where: {
        sku: item.variant,
      },
    });

    if (!variant) continue;

    const attribute = await prisma.attribute.findFirst({
      where: {
        code: item.attribute,
      },
    });

    if (!attribute) continue;

    const attributeValue = await prisma.attributeValue.findFirst({
      where: {
        attributeId: attribute.id,
        skuCode: item.value,
      },
    });

    if (!attributeValue) continue;

    await prisma.variantAttribute.create({
      data: {
        variantId: variant.id,
        attributeId: attribute.id,
        attributeValueId: attributeValue.id,
      },
    });
  }

  console.log('✅ Variant Attributes Seeded');
}