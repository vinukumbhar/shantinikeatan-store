import { PrismaClient } from '@prisma/client';

export async function seedCurrency(prisma: PrismaClient) {
  console.log('🌱 Seeding Currencies...');

  const currencies = [
    {
      name: 'Indian Rupee',
      code: 'INR',
      symbol: '₹',
      isBase: true,
    },
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      isBase: false,
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      isBase: false,
    },
    {
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
      isBase: false,
    },
    {
      name: 'UAE Dirham',
      code: 'AED',
      symbol: 'د.إ',
      isBase: false,
    },
  ];

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: {
        code: currency.code,
      },
      update: currency,
      create: currency,
    });
  }

  console.log(`✅ ${currencies.length} Currencies Seeded`);
}