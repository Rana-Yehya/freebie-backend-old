/*
  Warnings:

  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."review" DROP CONSTRAINT "review_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."review" DROP CONSTRAINT "review_userId_fkey";

-- DropTable
DROP TABLE "public"."review";

-- CreateTable
CREATE TABLE "public"."bundle_cart" (
    "userCartUserId" TEXT NOT NULL,
    "bundleId" TEXT NOT NULL,
    "deliveryTaxesId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "public"."ProductCartStatus" NOT NULL DEFAULT 'ACTIVE',
    "oldQuantity" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."product_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bundle_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bundleId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bundle_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bundle_cart_userCartUserId_bundleId_key" ON "public"."bundle_cart"("userCartUserId", "bundleId");

-- CreateIndex
CREATE UNIQUE INDEX "product_reviews_id_key" ON "public"."product_reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_reviews_userId_productId_key" ON "public"."product_reviews"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "bundle_reviews_id_key" ON "public"."bundle_reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bundle_reviews_userId_bundleId_key" ON "public"."bundle_reviews"("userId", "bundleId");

-- AddForeignKey
ALTER TABLE "public"."bundle_cart" ADD CONSTRAINT "bundle_cart_userCartUserId_fkey" FOREIGN KEY ("userCartUserId") REFERENCES "public"."user_cart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_cart" ADD CONSTRAINT "bundle_cart_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_cart" ADD CONSTRAINT "bundle_cart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "public"."delivery_taxes"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_reviews" ADD CONSTRAINT "bundle_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_reviews" ADD CONSTRAINT "bundle_reviews_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
