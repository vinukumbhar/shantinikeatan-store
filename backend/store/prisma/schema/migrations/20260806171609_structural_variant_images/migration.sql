/*
  Warnings:

  - You are about to drop the column `galleryImageIds` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[thumbnailImageId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[heroImageId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "variantId" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "galleryImageIds";

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_thumbnailImageId_key" ON "ProductVariant"("thumbnailImageId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_heroImageId_key" ON "ProductVariant"("heroImageId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_thumbnailImageId_fkey" FOREIGN KEY ("thumbnailImageId") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
