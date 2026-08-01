import { PrismaClient } from '@prisma/client';

import { seedCompany } from './seeds/company.seed';
import { seedCurrency } from './seeds/currency.seed';
import { seedTax } from './seeds/tax.seed';
import { seedUnit } from './seeds/unit.seed';
import { seedBrand } from './seeds/brand.seed';
import { seedCategory } from './seeds/category.seed';
import { seedAttribute } from './seeds/attribute.seed';
import { seedAttributeValue } from './seeds/attribute-value.seed';
import { seedWarehouse } from './seeds/warehouse.seed';
import { seedLocation } from './seeds/location.seed';
import { seedPaymentMethod } from './seeds/payment-method.seed';
import { seedPaymentTerm } from './seeds/payment-term.seed';

import { seedPriceList } from './seeds/price-list.seed';
import { seedProduct } from './seeds/product.seed';
import { seedProductVariant } from './seeds/product-variant.seed';
import { seedVariantAttribute } from './seeds/variant-attribute.seed';
import { seedBarcode } from './seeds/barcode.seed';
import { seedProductImage } from './seeds/product-image.seed';
import { seedProductPrice } from './seeds/product-price.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('========================================');
  console.log('🌱 ERP Database Seeding Started');
  console.log('========================================');

  try {
    // ==========================
    // MASTER DATA
    // ==========================

    console.log('\n📦 Seeding Master Data...\n');

    await seedCompany(prisma);
    await seedCurrency(prisma);
    await seedTax(prisma);
    await seedUnit(prisma);
    await seedBrand(prisma);
    await seedCategory(prisma);
    await seedAttribute(prisma);
    await seedAttributeValue(prisma);
    await seedWarehouse(prisma);
    await seedLocation(prisma);
    await seedPaymentMethod(prisma);
    await seedPaymentTerm(prisma);

    // ==========================
    // CATALOG
    // ==========================

    console.log('\n🛍️ Seeding Catalog...\n');

    await seedPriceList(prisma);
    await seedProduct(prisma);
    await seedProductVariant(prisma);
    await seedVariantAttribute(prisma);
    await seedBarcode(prisma);
    await seedProductImage(prisma);
    await seedProductPrice(prisma);

    console.log('\n========================================');
    console.log('✅ Database Seed Completed Successfully');
    console.log('========================================');
  } catch (error) {
    console.error('❌ Seed Failed');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();