import { PrismaClient } from '@prisma/client';

export async function seedWarehouse(prisma: PrismaClient) {
  console.log('🌱 Seeding Warehouses...');

  const warehouses = [
    {
      name: 'Main Warehouse',
      code: 'MAIN',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pincode: '411001',
      isDefault: true,
    },
    {
      name: 'Retail Store',
      code: 'STORE',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pincode: '411002',
      isDefault: false,
    },
    {
      name: 'Online Fulfillment Center',
      code: 'ONLINE',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      isDefault: false,
    },
    {
      name: 'Returns Warehouse',
      code: 'RETURN',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pincode: '411003',
      isDefault: false,
    },
    {
      name: 'School Store Warehouse',
      code: 'SCHOOL',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India',
      pincode: '416003',
      isDefault: false,
    },
  ];

  for (const warehouse of warehouses) {
    await prisma.warehouse.upsert({
      where: {
        code: warehouse.code,
      },
      update: warehouse,
      create: warehouse,
    });
  }

  console.log(`✅ ${warehouses.length} Warehouses Seeded`);
}