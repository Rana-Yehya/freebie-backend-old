/*
  Warnings:

  - A unique constraint covering the columns `[packagingId,color]` on the table `packaging_variation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."packaging_variation" ALTER COLUMN "color" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "packaging_variation_packagingId_color_key" ON "public"."packaging_variation"("packagingId", "color");
