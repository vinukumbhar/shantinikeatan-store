import { PrismaClient } from '@prisma/client';

export async function seedCategory(prisma: PrismaClient) {
  console.log('🌱 Seeding Categories...');

  const categories = [
    { name: 'Apparel', code: 'APPAREL' },
    { name: 'Footwear', code: 'FOOTWEAR' },
    { name: 'Stationery', code: 'STATIONERY' },
    { name: 'School Uniform', code: 'UNIFORM' },
    { name: 'Bags', code: 'BAGS' },
    { name: 'Electronics', code: 'ELECTRONICS' },
    { name: 'Sports', code: 'SPORTS' },

    { name: "Men's Wear", code: 'MEN' },
    { name: "Women's Wear", code: 'WOMEN' },
    { name: 'Kids Wear', code: 'KIDS' },

    { name: 'Shirts', code: 'SHIRTS' },
    { name: 'T-Shirts', code: 'TSHIRTS' },
    { name: 'Jeans', code: 'JEANS' },

    { name: 'Sports Shoes', code: 'SPORT_SHOES' },
    { name: 'School Shoes', code: 'SCHOOL_SHOES' },
    { name: 'Sandals', code: 'SANDALS' },

    { name: 'Notebooks', code: 'NOTEBOOKS' },
    { name: 'Pens', code: 'PENS' },
    { name: 'Pencils', code: 'PENCILS' },
    { name: 'Geometry Box', code: 'GEOMETRY' },

    { name: 'School Shirt', code: 'SCHOOL_SHIRT' },
    { name: 'School Pant', code: 'SCHOOL_PANT' },
    { name: 'School Tie', code: 'SCHOOL_TIE' },
    { name: 'School Belt', code: 'SCHOOL_BELT' },

    { name: 'School Bags', code: 'SCHOOL_BAGS' },
    { name: 'Laptop Bags', code: 'LAPTOP_BAGS' },

    { name: 'Laptops', code: 'LAPTOPS' },
    { name: 'Accessories', code: 'ACCESSORIES' },

    { name: 'Cricket', code: 'CRICKET' },
    { name: 'Football', code: 'FOOTBALL' },
    { name: 'Badminton', code: 'BADMINTON' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        code: category.code,
      },
      update: {
        name: category.name,
        isActive: true,
      },
      create: {
        name: category.name,
        code: category.code,
        isActive: true,
      },
    });
  }

  console.log(`✅ ${categories.length} Categories Seeded`);
}