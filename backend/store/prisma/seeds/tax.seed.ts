import { PrismaClient, TaxType } from '@prisma/client';

export async function seedTax(prisma: PrismaClient) {
  console.log('🌱 Seeding Taxes...');

  const taxes = [
    {
      name: 'GST 0%',
      code: 'GST0',
      rate: 0,
      type: TaxType.GST,
      
    },
    {
      name: 'GST 5%',
      code: 'GST5',
      rate: 5,
      type: TaxType.GST,
     
    },
    {
      name: 'GST 12%',
      code: 'GST12',
      rate: 12,
      type: TaxType.GST,
    
    },
    {
      name: 'GST 18%',
      code: 'GST18',
      rate: 18,
      type: TaxType.GST,
     
    },
    {
      name: 'GST 28%',
      code: 'GST28',
      rate: 28,
      type: TaxType.GST,
      
    },
  ];

  for (const tax of taxes) {
    await prisma.tax.upsert({
      where: {
        code: tax.code,
      },
      update: tax,
      create: tax,
    });
  }

  console.log(`✅ ${taxes.length} Taxes Seeded`);
}