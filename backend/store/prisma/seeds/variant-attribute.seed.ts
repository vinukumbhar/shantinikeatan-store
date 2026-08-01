import { PrismaClient } from '@prisma/client';

export async function seedVariantAttribute(prisma: PrismaClient) {
  console.log('🌱 Seeding Variant Attributes...');

  const variants = Object.fromEntries(
    (await prisma.productVariant.findMany()).map((v) => [v.sku, v.id]),
  );

  const attributes = Object.fromEntries(
    (await prisma.attribute.findMany()).map((a) => [a.code, a.id]),
  );

  const values = Object.fromEntries(
    (await prisma.attributeValue.findMany()).map((v) => [v.name, v.id]),
  );

  const data = [
    // =====================================
    // School Shirt White S
    // =====================================

    {
      variant: 'UNI-SHIRT-WHITE-S',
      attribute: 'COLOR',
      value: 'White',
    },
   
    
  ];

  for (const item of data) {
  const variantId = variants[item.variant];
  const attributeId = attributes[item.attribute];
  const attributeValueId = values[item.value];

  if (!variantId) {
    throw new Error(`Variant not found: ${item.variant}`);
  }

  if (!attributeId) {
    throw new Error(`Attribute not found: ${item.attribute}`);
  }

  if (!attributeValueId) {
    throw new Error(`Attribute Value not found: ${item.value}`);
  }

  await prisma.variantAttribute.upsert({
  where: {
    variantId_attributeId: {
      variantId,
      attributeId,
    },
  },
  update: {
    attributeValueId,
  },
  create: {
    variantId,
    attributeId,
    attributeValueId,
  },
});
}
}