/*
  Warnings:

  - A unique constraint covering the columns `[userCartId,productId,color,branchId]` on the table `productUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "productUser_userCartId_productId_color_key";

-- CreateIndex
CREATE UNIQUE INDEX "productUser_userCartId_productId_color_branchId_key" ON "productUser"("userCartId", "productId", "color", "branchId");
