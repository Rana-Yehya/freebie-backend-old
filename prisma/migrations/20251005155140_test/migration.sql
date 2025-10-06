/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ad_campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ad_campaigns` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titleId]` on the table `ad_campaigns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `ad_campaigns` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `ad_campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleId` to the `ad_campaigns` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDate` on table `ad_campaigns` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `ad_campaigns` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ad_campaigns" DROP CONSTRAINT "ad_campaigns_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ad_clicks" DROP CONSTRAINT "ad_clicks_adCampaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ad_impressions" DROP CONSTRAINT "ad_impressions_adCampaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_detailedDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_mainImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_nameId_fkey";

-- AlterTable
ALTER TABLE "public"."ad_campaigns" DROP COLUMN "imageUrl",
DROP COLUMN "title",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "titleId" TEXT NOT NULL,
ALTER COLUMN "targetUrl" DROP NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ad_campaigns_titleId_key" ON "public"."ad_campaigns"("titleId");

-- CreateIndex
CREATE UNIQUE INDEX "ad_campaigns_imageId_key" ON "public"."ad_campaigns"("imageId");

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_impressions" ADD CONSTRAINT "ad_impressions_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_clicks" ADD CONSTRAINT "ad_clicks_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_detailedDescriptionId_fkey" FOREIGN KEY ("detailedDescriptionId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
