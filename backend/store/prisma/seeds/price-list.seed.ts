import { PrismaClient } from '@prisma/client';

export async function seedPriceList(prisma: PrismaClient) {
  console.log('🌱 Seeding Price Lists...');

  const baseCurrency = await prisma.currency.findFirst({
    where: {
      isBase: true,
    },
  });

  if (!baseCurrency) {
    throw new Error('Base Currency not found.');
  }

  const priceLists = [
    {
      name: 'Retail Price',
      code: 'RETAIL',
      description: 'Default retail selling price',
      currencyId: baseCurrency.id,
      isDefault: true,
      isActive: true,
    },
    {
      name: 'Wholesale Price',
      code: 'WHOLESALE',
      description: 'Wholesale customer pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
    {
      name: 'Distributor Price',
      code: 'DISTRIBUTOR',
      description: 'Distributor pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
    {
      name: 'School Price',
      code: 'SCHOOL',
      description: 'Special school pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
    {
      name: 'Online Store',
      code: 'ONLINE',
      description: 'E-Commerce pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
    {
      name: 'Employee Price',
      code: 'EMPLOYEE',
      description: 'Internal employee discount pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
    {
      name: 'Festival Offer',
      code: 'FESTIVAL',
      description: 'Seasonal promotional pricing',
      currencyId: baseCurrency.id,
      isDefault: false,
      isActive: true,
    },
  ];

  for (const list of priceLists) {
    await prisma.priceList.upsert({
      where: {
        code: list.code,
      },
      update: list,
      create: list,
    });
  }

  console.log(`✅ ${priceLists.length} Price Lists Seeded`);
}