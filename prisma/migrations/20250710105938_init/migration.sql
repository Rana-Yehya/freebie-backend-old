/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `productOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "productOrder_orderId_key";

-- DropIndex
DROP INDEX "productOrder_orderId_productStockId_key";

-- DropIndex
DROP INDEX "productOrder_productStockId_key";

-- AlterTable
ALTER TABLE "productOrder" ADD COLUMN     "id" TEXT NOT NULL DEFAULT '7bb0f99c-a81d-465c-95d9-b8e350bf80d8',
ALTER COLUMN "productStockId" DROP NOT NULL,
ADD CONSTRAINT "productOrder_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "productOrder_id_key" ON "productOrder"("id");
