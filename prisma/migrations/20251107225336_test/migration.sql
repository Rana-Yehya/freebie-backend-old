/*
  Warnings:

  - You are about to drop the column `imageId` on the `ad_campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageId` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `packaging` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `bannerId` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `logoId` on the `store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[occasionId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mainImageProductId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mainImageBundleId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[packagingId]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ad_campaigns" DROP CONSTRAINT "ad_campaigns_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundles" DROP CONSTRAINT "bundles_mainImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."category" DROP CONSTRAINT "category_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."occasion" DROP CONSTRAINT "occasion_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."packaging" DROP CONSTRAINT "packaging_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_mainImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_logoId_fkey";

-- DropIndex
DROP INDEX "public"."ad_campaigns_imageId_key";

-- DropIndex
DROP INDEX "public"."bundles_mainImageId_key";

-- DropIndex
DROP INDEX "public"."packaging_imageId_key";

-- DropIndex
DROP INDEX "public"."product_mainImageId_key";

-- DropIndex
DROP INDEX "public"."store_bannerId_key";

-- DropIndex
DROP INDEX "public"."store_logoId_key";

-- AlterTable
ALTER TABLE "public"."ad_campaigns" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "public"."bundles" DROP COLUMN "mainImageId";

-- AlterTable
ALTER TABLE "public"."image" ADD COLUMN     "adId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "mainImageBundleId" TEXT,
ADD COLUMN     "mainImageProductId" TEXT,
ADD COLUMN     "occasionId" TEXT,
ADD COLUMN     "packagingId" TEXT,
ADD COLUMN     "storeBannerId" TEXT,
ADD COLUMN     "storeLogoId" TEXT;

-- AlterTable
ALTER TABLE "public"."packaging" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "mainImageId";

-- AlterTable
ALTER TABLE "public"."store" DROP COLUMN "bannerId",
DROP COLUMN "logoId";

-- CreateIndex
CREATE UNIQUE INDEX "image_categoryId_key" ON "public"."image"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "image_occasionId_key" ON "public"."image"("occasionId");

-- CreateIndex
CREATE UNIQUE INDEX "image_adId_key" ON "public"."image"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "image_mainImageProductId_key" ON "public"."image"("mainImageProductId");

-- CreateIndex
CREATE UNIQUE INDEX "image_mainImageBundleId_key" ON "public"."image"("mainImageBundleId");

-- CreateIndex
CREATE UNIQUE INDEX "image_packagingId_key" ON "public"."image"("packagingId");

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "public"."occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_adId_fkey" FOREIGN KEY ("adId") REFERENCES "public"."ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_mainImageProductId_fkey" FOREIGN KEY ("mainImageProductId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_mainImageBundleId_fkey" FOREIGN KEY ("mainImageBundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_storeLogoId_fkey" FOREIGN KEY ("storeLogoId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_storeBannerId_fkey" FOREIGN KEY ("storeBannerId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE CASCADE ON UPDATE CASCADE;
