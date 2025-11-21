/*
  Warnings:

  - You are about to drop the column `description` on the `ad_campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionId` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `country` table. All the data in the column will be lost.
  - You are about to drop the column `currencyAbbId` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `occasion` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `detailedDescriptionId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `bioId` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameBundleId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descriptionBundleId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stateId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeNameId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeBioId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[currencyAbbId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[currencyNameId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[infoId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[occasionId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descriptionProductId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailedDescriptionProductId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ad_campaigns" DROP CONSTRAINT "ad_campaigns_titleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundles" DROP CONSTRAINT "bundles_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundles" DROP CONSTRAINT "bundles_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."category" DROP CONSTRAINT "category_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."country" DROP CONSTRAINT "country_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."currency" DROP CONSTRAINT "currency_currencyAbbId_fkey";

-- DropForeignKey
ALTER TABLE "public"."currency" DROP CONSTRAINT "currency_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."info" DROP CONSTRAINT "info_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."occasion" DROP CONSTRAINT "occasion_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_detailedDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."state" DROP CONSTRAINT "state_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_bioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_nameId_fkey";

-- DropIndex
DROP INDEX "public"."bundles_descriptionId_key";

-- DropIndex
DROP INDEX "public"."bundles_nameId_key";

-- DropIndex
DROP INDEX "public"."category_nameId_key";

-- DropIndex
DROP INDEX "public"."country_nameId_key";

-- DropIndex
DROP INDEX "public"."currency_currencyAbbId_key";

-- DropIndex
DROP INDEX "public"."currency_nameId_key";

-- DropIndex
DROP INDEX "public"."info_nameId_key";

-- DropIndex
DROP INDEX "public"."occasion_nameId_key";

-- DropIndex
DROP INDEX "public"."product_descriptionId_key";

-- DropIndex
DROP INDEX "public"."product_detailedDescriptionId_key";

-- DropIndex
DROP INDEX "public"."store_bioId_key";

-- DropIndex
DROP INDEX "public"."store_nameId_key";

-- AlterTable
ALTER TABLE "public"."ad_campaigns" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "public"."bundles" DROP COLUMN "descriptionId",
DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."category" DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."country" DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."currency" DROP COLUMN "currencyAbbId",
DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."info" DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."locale" ADD COLUMN     "adId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "countryId" TEXT,
ADD COLUMN     "currencyAbbId" TEXT,
ADD COLUMN     "currencyNameId" TEXT,
ADD COLUMN     "descriptionBundleId" TEXT,
ADD COLUMN     "descriptionProductId" TEXT,
ADD COLUMN     "detailedDescriptionProductId" TEXT,
ADD COLUMN     "infoId" TEXT,
ADD COLUMN     "nameBundleId" TEXT,
ADD COLUMN     "occasionId" TEXT,
ADD COLUMN     "stateId" TEXT,
ADD COLUMN     "storeBioId" TEXT,
ADD COLUMN     "storeNameId" TEXT;

-- AlterTable
ALTER TABLE "public"."occasion" DROP COLUMN "nameId";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "descriptionId",
DROP COLUMN "detailedDescriptionId";

-- AlterTable
ALTER TABLE "public"."store" DROP COLUMN "bioId",
DROP COLUMN "nameId";

-- CreateIndex
CREATE UNIQUE INDEX "locale_adId_key" ON "public"."locale"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_nameBundleId_key" ON "public"."locale"("nameBundleId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_descriptionBundleId_key" ON "public"."locale"("descriptionBundleId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_countryId_key" ON "public"."locale"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_stateId_key" ON "public"."locale"("stateId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_storeNameId_key" ON "public"."locale"("storeNameId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_storeBioId_key" ON "public"."locale"("storeBioId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_currencyAbbId_key" ON "public"."locale"("currencyAbbId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_currencyNameId_key" ON "public"."locale"("currencyNameId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_infoId_key" ON "public"."locale"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_categoryId_key" ON "public"."locale"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_occasionId_key" ON "public"."locale"("occasionId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_descriptionProductId_key" ON "public"."locale"("descriptionProductId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_detailedDescriptionProductId_key" ON "public"."locale"("detailedDescriptionProductId");

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_adId_fkey" FOREIGN KEY ("adId") REFERENCES "public"."ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_nameBundleId_fkey" FOREIGN KEY ("nameBundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_descriptionBundleId_fkey" FOREIGN KEY ("descriptionBundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_storeNameId_fkey" FOREIGN KEY ("storeNameId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_storeBioId_fkey" FOREIGN KEY ("storeBioId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_currencyAbbId_fkey" FOREIGN KEY ("currencyAbbId") REFERENCES "public"."currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_currencyNameId_fkey" FOREIGN KEY ("currencyNameId") REFERENCES "public"."currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "public"."info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "public"."occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_descriptionProductId_fkey" FOREIGN KEY ("descriptionProductId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_detailedDescriptionProductId_fkey" FOREIGN KEY ("detailedDescriptionProductId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
