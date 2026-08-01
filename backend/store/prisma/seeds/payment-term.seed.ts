import { PrismaClient } from '@prisma/client';

export async function seedPaymentTerm(prisma: PrismaClient) {
  console.log('🌱 Seeding Payment Terms...');

  const paymentTerms = [
    {
      name: 'Cash',
      code: 'CASH',
      dueDays: 0,
      isDefault: true,
    },
    {
      name: 'Advance Payment',
      code: 'ADVANCE',
      dueDays: 0,
      isDefault: false,
    },
    {
      name: 'Due on Receipt',
      code: 'DUE',
      dueDays: 0,
      isDefault: false,
    },
    {
      name: 'Net 7 Days',
      code: 'NET7',
      dueDays: 7,
      isDefault: false,
    },
    {
      name: 'Net 15 Days',
      code: 'NET15',
      dueDays: 15,
      isDefault: false,
    },
    {
      name: 'Net 30 Days',
      code: 'NET30',
      dueDays: 30,
      isDefault: false,
    },
    {
      name: 'Net 45 Days',
      code: 'NET45',
      dueDays: 45,
      isDefault: false,
    },
    {
      name: 'Net 60 Days',
      code: 'NET60',
      dueDays: 60,
      isDefault: false,
    },
    {
      name: 'End of Month',
      code: 'EOM',
      dueDays: 30,
      isDefault: false,
    },
    {
      name: '50% Advance, Balance on Delivery',
      code: '50ADV',
      dueDays: 0,
      isDefault: false,
    },
    {
      name: '100% Advance',
      code: '100ADV',
      dueDays: 0,
      isDefault: false,
    },
    {
      name: 'Credit Account',
      code: 'CREDIT',
      dueDays: 90,
      isDefault: false,
    },
  ];

  for (const term of paymentTerms) {
    await prisma.paymentTerm.upsert({
      where: {
        code: term.code,
      },
      update: term,
      create: term,
    });
  }

  console.log(`✅ ${paymentTerms.length} Payment Terms Seeded`);
}