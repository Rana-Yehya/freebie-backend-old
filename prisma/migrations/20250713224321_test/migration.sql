/*
  Warnings:

  - You are about to drop the column `productStockId` on the `product_order` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `product_stock` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `product_cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[branchId]` on the table `product_stock` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `product_cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `variantId` to the `product_cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `product_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `product_stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_cart" DROP CONSTRAINT "product_cart_deliveryTaxesId_fkey";

-- DropForeignKey
ALTER TABLE "product_cart" DROP CONSTRAINT "product_cart_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "product_stock" DROP CONSTRAINT "product_stock_productId_fkey";

-- DropIndex
DROP INDEX "product_cart_userCartUserId_productStockId_key";

-- DropIndex
DROP INDEX "product_stock_productId_branchId_color_key";

-- AlterTable
ALTER TABLE "product_cart" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "variantId" TEXT NOT NULL,
ALTER COLUMN "productStockId" DROP NOT NULL,
ALTER COLUMN "deliveryTaxesId" DROP NOT NULL,
ADD CONSTRAINT "product_cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_order" DROP COLUMN "productStockId",
ADD COLUMN     "variantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_stock" DROP COLUMN "color",
DROP COLUMN "productId",
ADD COLUMN     "variantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "product_variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_productOrderToproductStock" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_productOrderToproductStock_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_productOrderToproductStock_B_index" ON "_productOrderToproductStock"("B");

-- CreateIndex
CREATE UNIQUE INDEX "product_cart_id_key" ON "product_cart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_branchId_key" ON "product_stock"("branchId");

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "product_stock"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "delivery_taxes"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productOrderToproductStock" ADD CONSTRAINT "_productOrderToproductStock_A_fkey" FOREIGN KEY ("A") REFERENCES "product_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productOrderToproductStock" ADD CONSTRAINT "_productOrderToproductStock_B_fkey" FOREIGN KEY ("B") REFERENCES "product_stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
