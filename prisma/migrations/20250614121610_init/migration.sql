/*
  Warnings:

  - You are about to drop the `productUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_branchId_fkey";

-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_deliveryTaxesId_fkey";

-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_productId_fkey";

-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_userCartId_fkey";

-- DropTable
DROP TABLE "productUser";

-- CreateTable
CREATE TABLE "productCart" (
    "userCartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "deliveryTaxesId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "productCart_userCartId_productId_color_branchId_key" ON "productCart"("userCartId", "productId", "color", "branchId");

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_userCartId_fkey" FOREIGN KEY ("userCartId") REFERENCES "userCart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "delivery_taxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
