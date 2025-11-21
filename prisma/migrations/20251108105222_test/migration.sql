/*
  Warnings:

  - You are about to drop the column `colors` on the `packaging` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[packagingVariationId]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_packagingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_cart" DROP CONSTRAINT "user_cart_packagingId_fkey";

-- AlterTable
ALTER TABLE "public"."image" ADD COLUMN     "packagingVariationId" TEXT;

-- AlterTable
ALTER TABLE "public"."packaging" DROP COLUMN "colors";

-- CreateTable
CREATE TABLE "public"."packaging_variation" (
    "id" TEXT NOT NULL,
    "color" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "packagingId" TEXT NOT NULL,

    CONSTRAINT "packaging_variation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "packaging_variation_packagingId_key" ON "public"."packaging_variation"("packagingId");

-- CreateIndex
CREATE UNIQUE INDEX "packaging_variation_id_packagingId_key" ON "public"."packaging_variation"("id", "packagingId");

-- CreateIndex
CREATE UNIQUE INDEX "image_packagingVariationId_key" ON "public"."image"("packagingVariationId");

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_packagingVariationId_fkey" FOREIGN KEY ("packagingVariationId") REFERENCES "public"."packaging_variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging_variation"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."packaging_variation" ADD CONSTRAINT "packaging_variation_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_cart" ADD CONSTRAINT "user_cart_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging_variation"("id") ON DELETE SET NULL ON UPDATE SET NULL;
