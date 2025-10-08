-- CreateTable
CREATE TABLE "public"."bundles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bundlePrice" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bundle_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "bundleId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,

    CONSTRAINT "bundle_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bundle_items_bundleId_productVariantId_key" ON "public"."bundle_items"("bundleId", "productVariantId");

-- AddForeignKey
ALTER TABLE "public"."bundle_items" ADD CONSTRAINT "bundle_items_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "public"."bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bundle_items" ADD CONSTRAINT "bundle_items_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."product_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
