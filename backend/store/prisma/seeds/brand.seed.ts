import { PrismaClient } from '@prisma/client';

export async function seedBrand(prisma: PrismaClient) {
  console.log('🌱 Seeding Brands...');

  const brands = [
    // Sports & Apparel
    { name: 'Nike', code: 'NIKE' ,isActive: true},
    { name: 'Adidas', code: 'ADIDAS' ,isActive: true},
    { name: 'Puma', code: 'PUMA' ,isActive: true},
    { name: 'Reebok', code: 'REEBOK',isActive: true },
    { name: 'Campus', code: 'CAMPUS' ,isActive: true},
    { name: 'Bata', code: 'BATA' ,isActive: true},
    { name: 'Liberty', code: 'LIBERTY',isActive: true },

    // Clothing
    { name: 'Raymond', code: 'RAYMOND' ,isActive: true},
    { name: 'Peter England', code: 'PETER',isActive: true },
    { name: 'Allen Solly', code: 'ALLEN',isActive: true },

    // Stationery
    { name: 'Classmate', code: 'CLASSMATE',isActive: true },
    { name: 'Camlin', code: 'CAMLIN' ,isActive: true},
    { name: 'Apsara', code: 'APSARA' ,isActive: true},
    { name: 'Cello', code: 'CELLO',isActive: true },

    // Electronics
    { name: 'HP', code: 'HP' ,isActive: true},
    { name: 'Dell', code: 'DELL' ,isActive: true},
    { name: 'Logitech', code: 'LOGITECH' ,isActive: true},

    // FMCG
    { name: 'Nestle', code: 'NESTLE' ,isActive: true},
    { name: 'Amul', code: 'AMUL' ,isActive: true},
    { name: 'Parle', code: 'PARLE',isActive: true },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: {
        code: brand.code,
      },
      update: brand,
      create: brand,
    });
  }

  console.log(`✅ ${brands.length} Brands Seeded`);
}