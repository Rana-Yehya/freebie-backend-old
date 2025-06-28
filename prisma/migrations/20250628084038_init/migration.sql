/*
  Warnings:

  - You are about to drop the column `weightInKm` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "delivery_taxes" ADD COLUMN     "additionalFeesAfterKg" DOUBLE PRECISION NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "weightInKm",
ADD COLUMN     "weightInKg" DOUBLE PRECISION NOT NULL DEFAULT 3;
