/*
  Warnings:

  - You are about to drop the column `name` on the `delivery_taxes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "delivery_taxes" DROP COLUMN "name",
ALTER COLUMN "feePerKg" SET DEFAULT 0;
