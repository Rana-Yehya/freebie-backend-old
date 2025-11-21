/*
  Warnings:

  - You are about to drop the column `packagingId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `packagingId` on the `user_cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_packagingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_cart" DROP CONSTRAINT "user_cart_packagingId_fkey";

-- DropIndex
DROP INDEX "public"."packaging_variation_id_packagingId_key";

-- AlterTable
ALTER TABLE "public"."order" DROP COLUMN "packagingId",
ADD COLUMN     "packagingVariationId" TEXT;

-- AlterTable
ALTER TABLE "public"."packaging_variation" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" DROP DEFAULT,
ALTER COLUMN "color" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."user_cart" DROP COLUMN "packagingId",
ADD COLUMN     "packagingVariationId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_packagingVariationId_fkey" FOREIGN KEY ("packagingVariationId") REFERENCES "public"."packaging_variation"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."user_cart" ADD CONSTRAINT "user_cart_packagingVariationId_fkey" FOREIGN KEY ("packagingVariationId") REFERENCES "public"."packaging_variation"("id") ON DELETE SET NULL ON UPDATE SET NULL;
