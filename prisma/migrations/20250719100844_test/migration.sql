/*
  Warnings:

  - You are about to drop the `_productOrderToproductStock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_productOrderToproductStock" DROP CONSTRAINT "_productOrderToproductStock_A_fkey";

-- DropForeignKey
ALTER TABLE "_productOrderToproductStock" DROP CONSTRAINT "_productOrderToproductStock_B_fkey";

-- AlterTable
ALTER TABLE "product_order" ADD COLUMN     "productStockId" TEXT;

-- DropTable
DROP TABLE "_productOrderToproductStock";

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "product_stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
