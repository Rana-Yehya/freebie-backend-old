/*
  Warnings:

  - Added the required column `targetType` to the `ad_campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TargetType" AS ENUM ('STORE_HOME', 'PRODUCT_PAGE', 'COLLECTION', 'SALE_PAGE', 'GIFT_BOX', 'FEATURED_PRODUCTS');

-- CreateEnum
CREATE TYPE "public"."PackageSize" AS ENUM ('XSMALL', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."CostType" AS ENUM ('FIXED', 'SIZE_BASED', 'VOLUME_BASED', 'TIERED', 'PER_ITEM');

-- CreateEnum
CREATE TYPE "public"."PackageType" AS ENUM ('GIFT_BOX', 'GIFT_BAG', 'WRAPPING', 'TUBE', 'ENVELOPE', 'SPECIALTY', 'ECO_WRAP');

-- AlterTable
ALTER TABLE "public"."ad_campaigns" ADD COLUMN     "productId" TEXT,
ADD COLUMN     "targetType" "public"."TargetType" NOT NULL;

-- CreateTable
CREATE TABLE "public"."delivery_tax_branch_overrides" (
    "id" TEXT NOT NULL,
    "deliveryTaxId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "baseFeeOverride" DOUBLE PRECISION,
    "feePerKgOverride" DOUBLE PRECISION,
    "additionalFeesAfterKgOverride" DOUBLE PRECISION,
    "estimatedDaysOverride" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "delivery_tax_branch_overrides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Packaging" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "minWidth" DOUBLE PRECISION,
    "maxWidth" DOUBLE PRECISION,
    "minHeight" DOUBLE PRECISION,
    "maxHeight" DOUBLE PRECISION,
    "minLength" DOUBLE PRECISION,
    "maxLength" DOUBLE PRECISION,
    "baseCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "costType" "public"."CostType" NOT NULL DEFAULT 'FIXED',
    "smallMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "mediumMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "largeMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "xlargeMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 2.0,
    "pricePerCubicCM" DOUBLE PRECISION,
    "packageType" "public"."PackageType" NOT NULL,
    "size" "public"."PackageSize" NOT NULL,
    "baseImage" TEXT,

    CONSTRAINT "Packaging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_tax_branch_overrides_deliveryTaxId_branchId_key" ON "public"."delivery_tax_branch_overrides"("deliveryTaxId", "branchId");

-- AddForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" ADD CONSTRAINT "delivery_tax_branch_overrides_deliveryTaxId_fkey" FOREIGN KEY ("deliveryTaxId") REFERENCES "public"."delivery_taxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" ADD CONSTRAINT "delivery_tax_branch_overrides_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
