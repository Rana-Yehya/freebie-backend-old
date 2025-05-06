/*
  Warnings:

  - The primary key for the `productOccasion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[occasionsId,productId]` on the table `productOccasion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,branchId,color]` on the table `productStock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userCartId,productId,color]` on the table `productUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productId]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "productOccasion" DROP CONSTRAINT "productOccasion_pkey";

-- AlterTable
ALTER TABLE "productStock" DROP CONSTRAINT "productStock_pkey";

-- AlterTable
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_pkey";

-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "productOccasion_occasionsId_productId_key" ON "productOccasion"("occasionsId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "productStock_productId_branchId_color_key" ON "productStock"("productId", "branchId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "productUser_userCartId_productId_color_key" ON "productUser"("userCartId", "productId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_productId_key" ON "review"("userId", "productId");
