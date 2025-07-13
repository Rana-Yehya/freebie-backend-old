/*
  Warnings:

  - You are about to alter the column `moneyInPocket` on the `store` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[mainImageId]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mainImageId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "mainImageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "store" ALTER COLUMN "moneyInPocket" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "product_mainImageId_key" ON "product"("mainImageId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
