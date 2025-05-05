/*
  Warnings:

  - You are about to drop the column `occasionsId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_occasionsId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "occasionsId";

-- CreateTable
CREATE TABLE "productOccasion" (
    "occasionsId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productOccasion_pkey" PRIMARY KEY ("occasionsId","productId")
);

-- AddForeignKey
ALTER TABLE "productOccasion" ADD CONSTRAINT "productOccasion_occasionsId_fkey" FOREIGN KEY ("occasionsId") REFERENCES "occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOccasion" ADD CONSTRAINT "productOccasion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
