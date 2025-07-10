/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `productOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productStockId]` on the table `productOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productOrder_orderId_key" ON "productOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "productOrder_productStockId_key" ON "productOrder"("productStockId");
