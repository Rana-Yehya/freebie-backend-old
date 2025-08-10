/*
  Warnings:

  - You are about to drop the column `variantId` on the `product_order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_variantId_fkey";

-- AlterTable
ALTER TABLE "product_order" DROP COLUMN "variantId";
