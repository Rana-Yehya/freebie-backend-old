/*
  Warnings:

  - You are about to drop the column `description` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `bundles` table. All the data in the column will be lost.
  - You are about to drop the `branch_discount_codes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nameId]` on the table `bundles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mainImageId]` on the table `bundles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descriptionId]` on the table `bundles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descriptionId` to the `bundles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImageId` to the `bundles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `bundles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ad_campaigns" DROP CONSTRAINT "ad_campaigns_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."admin" DROP CONSTRAINT "admin_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."branch" DROP CONSTRAINT "branch_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."branch_discount_codes" DROP CONSTRAINT "branch_discount_codes_branchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bundle_items" DROP CONSTRAINT "bundle_items_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."country" DROP CONSTRAINT "country_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."currency" DROP CONSTRAINT "currency_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" DROP CONSTRAINT "delivery_tax_branch_overrides_branchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" DROP CONSTRAINT "delivery_tax_branch_overrides_deliveryTaxId_fkey";

-- DropForeignKey
ALTER TABLE "public"."discount" DROP CONSTRAINT "discount_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."discount" DROP CONSTRAINT "discount_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."image" DROP CONSTRAINT "image_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_order" DROP CONSTRAINT "product_order_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."state" DROP CONSTRAINT "state_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_bioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_nameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."store_subscriptions" DROP CONSTRAINT "store_subscriptions_planLimitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscription_plan_changes" DROP CONSTRAINT "subscription_plan_changes_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userLocations" DROP CONSTRAINT "userLocations_stateId_fkey";

-- DropIndex
DROP INDEX "public"."order_locationId_key";

-- AlterTable
ALTER TABLE "public"."bundles" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descriptionId" TEXT NOT NULL,
ADD COLUMN     "mainImageId" TEXT NOT NULL,
ADD COLUMN     "nameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."order" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."store_subscriptions" ALTER COLUMN "planLimitId" SET DEFAULT 'BASIC';

-- DropTable
DROP TABLE "public"."branch_discount_codes";

-- CreateIndex
CREATE UNIQUE INDEX "bundles_nameId_key" ON "public"."bundles"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "bundles_mainImageId_key" ON "public"."bundles"("mainImageId");

-- CreateIndex
CREATE UNIQUE INDEX "bundles_descriptionId_key" ON "public"."bundles"("descriptionId");

-- AddForeignKey
ALTER TABLE "public"."admin" ADD CONSTRAINT "admin_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."bundles" ADD CONSTRAINT "bundles_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundles" ADD CONSTRAINT "bundles_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundles" ADD CONSTRAINT "bundles_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_items" ADD CONSTRAINT "bundle_items_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."country" ADD CONSTRAINT "country_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."currency" ADD CONSTRAINT "currency_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" ADD CONSTRAINT "delivery_tax_branch_overrides_deliveryTaxId_fkey" FOREIGN KEY ("deliveryTaxId") REFERENCES "public"."delivery_taxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_tax_branch_overrides" ADD CONSTRAINT "delivery_tax_branch_overrides_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount" ADD CONSTRAINT "discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount" ADD CONSTRAINT "discount_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."product_order" ADD CONSTRAINT "product_order_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "public"."product_stock"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store_subscriptions" ADD CONSTRAINT "store_subscriptions_planLimitId_fkey" FOREIGN KEY ("planLimitId") REFERENCES "public"."plan_limits"("planName") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."subscription_plan_changes" ADD CONSTRAINT "subscription_plan_changes_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."userLocations" ADD CONSTRAINT "userLocations_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE SET NULL ON UPDATE SET NULL;
