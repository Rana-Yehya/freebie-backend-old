/*
  Warnings:

  - You are about to drop the column `color` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `product` table. All the data in the column will be lost.
  - The primary key for the `productStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discountPercent` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `discountTime` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the column `wishListId` on the `productUser` table. All the data in the column will be lost.
  - You are about to drop the `wishList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `productStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `productUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCartId` to the `productUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_userId_fkey";

-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_wishListId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_countryId_fkey";

-- DropForeignKey
ALTER TABLE "wishList" DROP CONSTRAINT "wishList_userId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "color",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "productStock" DROP CONSTRAINT "productStock_pkey",
ADD COLUMN     "color" TEXT NOT NULL,
ADD CONSTRAINT "productStock_pkey" PRIMARY KEY ("productId", "branchId", "color");

-- AlterTable
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_pkey",
DROP COLUMN "discountPercent",
DROP COLUMN "discountTime",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "wishListId",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "userCartId" TEXT NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" DROP DEFAULT,
ALTER COLUMN "color" SET DATA TYPE TEXT,
ADD CONSTRAINT "productUser_pkey" PRIMARY KEY ("userCartId", "productId", "color");

-- DropTable
DROP TABLE "wishList";

-- CreateTable
CREATE TABLE "userCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "userCart" ADD CONSTRAINT "userCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_userCartId_fkey" FOREIGN KEY ("userCartId") REFERENCES "userCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
