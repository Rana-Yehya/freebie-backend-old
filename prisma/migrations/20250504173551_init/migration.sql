/*
  Warnings:

  - You are about to drop the column `productId` on the `wishList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "wishList" DROP CONSTRAINT "wishList_productId_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "color" INTEGER[];

-- AlterTable
ALTER TABLE "wishList" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "review" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "productUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "color" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "price" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "discountPercent" DOUBLE PRECISION DEFAULT 0,
    "discountTime" TIMESTAMP(3),
    "wishListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_key" ON "review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "review_productId_key" ON "review"("productId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "wishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
