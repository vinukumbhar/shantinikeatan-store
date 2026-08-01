import { PrismaClient } from '@prisma/client';

export async function seedPaymentMethod(prisma: PrismaClient) {
  console.log('🌱 Seeding Payment Methods...');

  const paymentMethods = [
    {
      name: 'Cash',
      code: 'CASH',
      isDefault: true,
    },
    {
      name: 'UPI',
      code: 'UPI',
      isDefault: false,
    },
    {
      name: 'Credit Card',
      code: 'CCARD',
      isDefault: false,
    },
    {
      name: 'Debit Card',
      code: 'DCARD',
      isDefault: false,
    },
    {
      name: 'Net Banking',
      code: 'NETBANK',
      isDefault: false,
    },
    {
      name: 'Bank Transfer',
      code: 'BANK',
      isDefault: false,
    },
    {
      name: 'Cheque',
      code: 'CHEQUE',
      isDefault: false,
    },
    {
      name: 'Gift Card',
      code: 'GIFT',
      isDefault: false,
    },
    {
      name: 'Store Credit',
      code: 'STORECR',
      isDefault: false,
    },
    {
      name: 'Wallet',
      code: 'WALLET',
      isDefault: false,
    },
    {
      name: 'EMI',
      code: 'EMI',
      isDefault: false,
    },
    {
      name: 'Mixed Payment',
      code: 'MIXED',
      isDefault: false,
    },
  ];

  for (const method of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: {
        code: method.code,
      },
      update: method,
      create: method,
    });
  }

  console.log(`✅ ${paymentMethods.length} Payment Methods Seeded`);
}