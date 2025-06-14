/*
  Warnings:

  - Added the required column `branchId` to the `productUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryTaxesId` to the `productUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productUser" ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "deliveryTaxesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userCart" ADD COLUMN     "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "delivery_taxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
