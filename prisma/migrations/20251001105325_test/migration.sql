/*
  Warnings:

  - You are about to drop the `product_price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product_price" DROP CONSTRAINT "product_price_productId_fkey";

-- AlterTable
ALTER TABLE "public"."product" ADD COLUMN     "actualPrice" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "public"."product_price";

-- CreateTable
CREATE TABLE "public"."discount" (
    "id" TEXT NOT NULL,
    "discountPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountStartTime" TIMESTAMP(3) NOT NULL,
    "discountEndTime" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "storeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discount_id_key" ON "public"."discount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "discount_productId_key" ON "public"."discount"("productId");

-- AddForeignKey
ALTER TABLE "public"."discount" ADD CONSTRAINT "discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount" ADD CONSTRAINT "discount_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
