/*
  Warnings:

  - You are about to alter the column `moneyInPocket` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- DropForeignKey
ALTER TABLE "product_stock" DROP CONSTRAINT "product_stock_variantId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "moneyInPocket" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
