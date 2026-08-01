import { PrismaClient, BarcodeType } from '@prisma/client';

export async function seedBarcode(prisma: PrismaClient) {
  console.log('🌱 Seeding Barcodes...');

  const variants = await prisma.productVariant.findMany();

  const variantMap = Object.fromEntries(
    variants.map((v) => [v.sku, v.id]),
  );

  const barcodes = [
    {
      variantSku: 'UNI-SHIRT-WHITE-S',
      barcode: '8901000000001',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'UNI-SHIRT-WHITE-M',
      barcode: '8901000000002',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'UNI-SHIRT-WHITE-L',
      barcode: '8901000000003',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'SHOE-7',
      barcode: '8901000000010',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'SHOE-8',
      barcode: '8901000000011',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'SHOE-9',
      barcode: '8901000000012',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'NOTEBOOK-200',
      barcode: '8901000000020',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
    {
      variantSku: 'NOTEBOOK-400',
      barcode: '8901000000021',
      type: BarcodeType.EAN13,
      isPrimary: true,
    },
  ];

  for (const item of barcodes) {
    await prisma.barcode.upsert({
      where: {
        barcode: item.barcode,
      },
      update: {},
      create: {
        variantId: variantMap[item.variantSku],
        barcode: item.barcode,
        type: item.type,
        isPrimary: item.isPrimary,
      },
    });
  }

  console.log(`✅ ${barcodes.length} Barcodes Seeded`);
}