import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️ Clearing database...");

  await prisma.variantAttribute.deleteMany();
  await prisma.barcode.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.priceList.deleteMany();

  await prisma.attributeValue.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  await prisma.location.deleteMany();
  await prisma.warehouse.deleteMany();

  await prisma.paymentTerm.deleteMany();
  await prisma.paymentMethod.deleteMany();

  await prisma.unit.deleteMany();
  await prisma.tax.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.company.deleteMany();

  console.log("✅ Database cleared successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });