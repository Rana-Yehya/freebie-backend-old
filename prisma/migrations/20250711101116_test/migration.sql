/*
  Warnings:

  - You are about to drop the `locale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productCart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_nameId_fkey";

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_nameId_fkey";

-- DropForeignKey
ALTER TABLE "country" DROP CONSTRAINT "country_nameId_fkey";

-- DropForeignKey
ALTER TABLE "currency" DROP CONSTRAINT "currency_currencyAbbId_fkey";

-- DropForeignKey
ALTER TABLE "currency" DROP CONSTRAINT "currency_nameId_fkey";

-- DropForeignKey
ALTER TABLE "occasion" DROP CONSTRAINT "occasion_nameId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_detailedDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_nameId_fkey";

-- DropForeignKey
ALTER TABLE "productCart" DROP CONSTRAINT "productCart_deliveryTaxesId_fkey";

-- DropForeignKey
ALTER TABLE "productCart" DROP CONSTRAINT "productCart_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "productCart" DROP CONSTRAINT "productCart_userCartUserId_fkey";

-- DropForeignKey
ALTER TABLE "productOrder" DROP CONSTRAINT "productOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "productOrder" DROP CONSTRAINT "productOrder_productStockId_fkey";

-- DropForeignKey
ALTER TABLE "productPrice" DROP CONSTRAINT "productPrice_productId_fkey";

-- DropForeignKey
ALTER TABLE "productStock" DROP CONSTRAINT "productStock_branchId_fkey";

-- DropForeignKey
ALTER TABLE "productStock" DROP CONSTRAINT "productStock_productId_fkey";

-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_nameId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_bioId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_nameId_fkey";

-- DropForeignKey
ALTER TABLE "userCart" DROP CONSTRAINT "userCart_userId_fkey";

-- DropTable
DROP TABLE "locale";

-- DropTable
DROP TABLE "productCart";

-- DropTable
DROP TABLE "productOrder";

-- DropTable
DROP TABLE "productPrice";

-- DropTable
DROP TABLE "productStock";

-- DropTable
DROP TABLE "userCart";

-- CreateTable
CREATE TABLE "name" (
    "id" TEXT NOT NULL,
    "default" TEXT,
    "en" TEXT,
    "ar" TEXT,

    CONSTRAINT "name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_cart" (
    "userCartUserId" TEXT NOT NULL,
    "productStockId" TEXT NOT NULL,
    "deliveryTaxesId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "doesHaveEnoughQuantity" BOOLEAN NOT NULL DEFAULT true,
    "oldQuantity" INTEGER DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "product_order" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productStockId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "cancellationReason" TEXT,
    "refundAmount" DOUBLE PRECISION,

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_price" (
    "productId" TEXT NOT NULL,
    "actualPrice" DOUBLE PRECISION,
    "discountPercent" DOUBLE PRECISION DEFAULT 0,
    "discountStartTime" TIMESTAMP(3),
    "discountEndTime" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "product_stock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "stock" INTEGER,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_cart" (
    "userId" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "name_id_key" ON "name"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_cart_userCartUserId_productStockId_key" ON "product_cart"("userCartUserId", "productStockId");

-- CreateIndex
CREATE UNIQUE INDEX "product_order_id_key" ON "product_order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_price_productId_key" ON "product_price"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_id_key" ON "product_stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_productId_branchId_color_key" ON "product_stock"("productId", "branchId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_userId_key" ON "user_cart"("userId");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currency" ADD CONSTRAINT "currency_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currency" ADD CONSTRAINT "currency_currencyAbbId_fkey" FOREIGN KEY ("currencyAbbId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_userCartUserId_fkey" FOREIGN KEY ("userCartUserId") REFERENCES "user_cart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "product_stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_cart" ADD CONSTRAINT "product_cart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "delivery_taxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "product_stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_price" ADD CONSTRAINT "product_price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_detailedDescriptionId_fkey" FOREIGN KEY ("detailedDescriptionId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cart" ADD CONSTRAINT "user_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
