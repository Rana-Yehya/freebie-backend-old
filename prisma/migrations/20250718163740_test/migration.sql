/*
  Warnings:

  - You are about to drop the column `doesHaveEnoughQuantity` on the `product_cart` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductCartStatus" AS ENUM ('ACTIVE', 'NODELIVERYSTATES', 'OUTOFSTOCK');

-- AlterTable
ALTER TABLE "product_cart" DROP COLUMN "doesHaveEnoughQuantity",
ADD COLUMN     "status" "ProductCartStatus" NOT NULL DEFAULT 'ACTIVE';
