import { PrismaClient } from '@prisma/client';

export async function seedCompany(prisma: PrismaClient) {
  console.log('🌱 Seeding Companies...');

  const companies = [
    {
      name: 'ABC Retail Pvt Ltd',
      code: 'ABC',
      email: 'info@abcretail.com',
      phone: '9876543210',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pincode: '411001',
    },
    {
      name: 'Niketan School Store',
      code: 'NSS',
      email: 'store@niketan.edu.in',
      phone: '9876543211',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India',
      pincode: '416003',
    },
    {
      name: 'Campus Uniform House',
      code: 'CUH',
      email: 'sales@campusuniform.com',
      phone: '9876543212',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
    },
    {
      name: 'Smart Stationery Mart',
      code: 'SSM',
      email: 'contact@smartstationery.com',
      phone: '9876543213',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001',
    },
    {
      name: 'Future Fashion Store',
      code: 'FFS',
      email: 'support@futurefashion.com',
      phone: '9876543214',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      pincode: '500001',
    },
  ];

  for (const company of companies) {
    await prisma.company.upsert({
      where: {
        code: company.code,
      },
      update: company,
      create: company,
    });
  }

  console.log(`✅ ${companies.length} Companies Seeded`);
}