/*
  Warnings:

  - You are about to drop the column `status` on the `productOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "productOrder" DROP COLUMN "status";
