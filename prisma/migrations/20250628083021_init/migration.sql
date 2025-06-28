/*
  Warnings:

  - You are about to drop the column `createdAt` on the `socialLink` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `socialLink` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `workHour` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `workHour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "canBeDeliveredOutsideState" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "weightInKm" DOUBLE PRECISION NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "socialLink" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "fcmToken" TEXT;

-- AlterTable
ALTER TABLE "workHour" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
