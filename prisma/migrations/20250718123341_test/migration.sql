/*
  Warnings:

  - The primary key for the `product_cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_cart` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `product_cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCartUserId,productStockId]` on the table `product_cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "product_cart_id_key";

-- AlterTable
ALTER TABLE "product_cart" DROP CONSTRAINT "product_cart_pkey",
DROP COLUMN "id",
DROP COLUMN "isDeleted";

-- CreateIndex
CREATE UNIQUE INDEX "product_cart_userCartUserId_productStockId_key" ON "product_cart"("userCartUserId", "productStockId");
