/*
  Warnings:

  - You are about to drop the column `discountTime` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_storeId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "discountTime",
DROP COLUMN "storeId",
ADD COLUMN     "discountEndTime" TIMESTAMP(3),
ADD COLUMN     "discountStartTime" TIMESTAMP(3);
