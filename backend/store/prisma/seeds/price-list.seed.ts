import { PrismaClient } from '@prisma/client';

export async function seedPriceList(prisma: PrismaClient) {
  console.log('🌱 Seeding Price Lists...');

  const priceLists = [
    {
      name: 'Retail Price',
    },
    {
      name: 'Wholesale Price',
    },
    {
      name: 'Distributor Price',
    },
    {
      name: 'School Price',
    },
    {
      name: 'Online Store',
    },
    {
      name: 'Employee Price',
    },
    {
      name: 'Festival Offer',
    },
  ];

  // Find the last existing Price List number
  const lastPriceList = await prisma.priceList.findFirst({
    orderBy: {
      number: 'desc',
    },
    select: {
      number: true,
    },
  });

  let nextNumber = lastPriceList
    ? Number(lastPriceList.number.replace('PL', '')) + 1
    : 1;

  for (const list of priceLists) {
    const number = `PL${String(nextNumber).padStart(4, '0')}`;

    await prisma.priceList.create({
      data: {
        number,
        name: list.name,
      },
    });

    console.log(`   ✓ ${number} - ${list.name}`);

    nextNumber++;
  }

  console.log(`✅ ${priceLists.length} Price Lists Seeded`);
}