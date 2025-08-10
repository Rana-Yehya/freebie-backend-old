/*
  Warnings:

  - You are about to drop the column `refundAmount` on the `product_order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderCancelBy" AS ENUM ('USER', 'STORE');

-- AlterTable
ALTER TABLE "product_order" DROP COLUMN "refundAmount",
ADD COLUMN     "cancelledBy" "OrderCancelBy",
ADD COLUMN     "storerRefundAmount" DOUBLE PRECISION,
ADD COLUMN     "userRefundAmount" DOUBLE PRECISION;
