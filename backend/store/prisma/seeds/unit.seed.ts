import { PrismaClient } from '@prisma/client';

export async function seedUnit(prisma: PrismaClient) {
  console.log('🌱 Seeding Units...');

  const units = [
    {
      name: 'Piece',
      code: 'PCS',
      shortName: 'Pc',
    },
    {
      name: 'Box',
      code: 'BOX',
      shortName: 'Box',
    },
    {
      name: 'Carton',
      code: 'CTN',
      shortName: 'Ctn',
    },
    {
      name: 'Dozen',
      code: 'DOZ',
      shortName: 'Doz',
    },
    {
      name: 'Pair',
      code: 'PAIR',
      shortName: 'Pr',
    },
    {
      name: 'Kilogram',
      code: 'KG',
      shortName: 'Kg',
    },
    {
      name: 'Gram',
      code: 'GM',
      shortName: 'Gm',
    },
    {
      name: 'Liter',
      code: 'LTR',
      shortName: 'Ltr',
    },
    {
      name: 'Milliliter',
      code: 'ML',
      shortName: 'Ml',
    },
    {
      name: 'Meter',
      code: 'MTR',
      shortName: 'Mtr',
    },
    {
      name: 'Centimeter',
      code: 'CM',
      shortName: 'Cm',
    },
    {
      name: 'Roll',
      code: 'ROLL',
      shortName: 'Roll',
    },
    {
      name: 'Pack',
      code: 'PACK',
      shortName: 'Pack',
    },
    {
      name: 'Bundle',
      code: 'BUNDLE',
      shortName: 'Bndl',
    },
    {
      name: 'Set',
      code: 'SET',
      shortName: 'Set',
    },
  ];

  for (const unit of units) {
    await prisma.unit.upsert({
      where: {
        code: unit.code,
      },
      update: unit,
      create: unit,
    });
  }

  console.log(`✅ ${units.length} Units Seeded`);
}