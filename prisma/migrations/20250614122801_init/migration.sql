/*
  Warnings:

  - You are about to drop the column `cityId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_cityId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "cityId";
