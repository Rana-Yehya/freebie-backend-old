-- CreateEnum
CREATE TYPE "productTags" AS ENUM ('FEATURED', 'POPULAR');

-- CreateTable
CREATE TABLE "branch" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "locationId" TEXT,
    "phone" TEXT,
    "isFreezed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workHour" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "workHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "nameId" TEXT,
    "imageId" TEXT NOT NULL,
    "canBeDeliveredOutsideState" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "nameId" TEXT,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "countryIsoCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency" (
    "id" TEXT NOT NULL,
    "currencyAbb" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_taxes" (
    "id" TEXT NOT NULL,
    "originStateId" TEXT NOT NULL,
    "destinationStateId" TEXT NOT NULL,
    "baseFee" DOUBLE PRECISION NOT NULL,
    "additionalFeesAfterKg" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "feePerKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "estimatedDays" INTEGER,
    "effectiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "branchId" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "name" (
    "id" TEXT NOT NULL,
    "defaultName" TEXT NOT NULL,
    "nameEn" TEXT,
    "nameAr" TEXT,

    CONSTRAINT "name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occasion" (
    "id" TEXT NOT NULL,
    "nameId" TEXT,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occasion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentMethod" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "cancellationReason" TEXT,
    "refundAmount" DOUBLE PRECISION,
    "currencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productCart" (
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
CREATE TABLE "productOrder" (
    "orderId" TEXT NOT NULL,
    "productStockId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "cancellationReason" TEXT,
    "refundAmount" DOUBLE PRECISION
);

-- CreateTable
CREATE TABLE "productPrice" (
    "productId" TEXT NOT NULL,
    "actualPrice" DOUBLE PRECISION,
    "discountPercent" DOUBLE PRECISION DEFAULT 0,
    "discountStartTime" TIMESTAMP(3),
    "discountEndTime" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "productStock" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "stock" INTEGER,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "detailedDescriptionId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "doesNeedPreparation" BOOLEAN NOT NULL DEFAULT false,
    "isAcceptedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "tags" "productTags" NOT NULL,
    "preparationTimeInMinutes" INTEGER NOT NULL DEFAULT 1,
    "canBeDeliveredOutsideState" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "dimensionsWCm" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "dimensionsHCm" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "dimensionsLCm" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "weightInKg" DOUBLE PRECISION NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "state" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "bioId" TEXT NOT NULL,
    "logoId" TEXT NOT NULL,
    "bannerId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshTokenSecret" TEXT,
    "accessTokenSecret" TEXT,
    "moneyInPocket" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fcmToken" TEXT,
    "role" TEXT NOT NULL DEFAULT 'store',
    "isApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isFreezed" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialLink" (
    "id" TEXT NOT NULL,
    "tiktok" TEXT,
    "youtube" TEXT,
    "facebook" TEXT,
    "x" TEXT,
    "instagram" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "socialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'deposit',
    "userId" TEXT,
    "storeId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "purpose" TEXT,
    "currencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCart" (
    "userId" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "moneyInPocket" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "countryId" TEXT,
    "stateId" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "refreshTokenSecret" TEXT,
    "accessTokenSecret" TEXT,
    "fcmToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_occasionToproduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_occasionToproduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "branch_id_key" ON "branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_locationId_key" ON "branch"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_id_key" ON "workHour"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_branchId_key" ON "workHour"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_nameId_key" ON "category"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "city_id_key" ON "city"("id");

-- CreateIndex
CREATE UNIQUE INDEX "city_nameId_key" ON "city"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "country_id_key" ON "country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "country_nameId_key" ON "country"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "country_countryIsoCode_key" ON "country"("countryIsoCode");

-- CreateIndex
CREATE UNIQUE INDEX "currency_id_key" ON "currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_taxes_id_key" ON "delivery_taxes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image_id_key" ON "image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inbox_id_key" ON "inbox"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_id_key" ON "info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_slug_key" ON "info"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "name_id_key" ON "name"("id");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_id_key" ON "occasion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_nameId_key" ON "occasion"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_locationId_key" ON "order"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "productCart_userCartUserId_productStockId_key" ON "productCart"("userCartUserId", "productStockId");

-- CreateIndex
CREATE UNIQUE INDEX "productOrder_orderId_productStockId_key" ON "productOrder"("orderId", "productStockId");

-- CreateIndex
CREATE UNIQUE INDEX "productPrice_productId_key" ON "productPrice"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "productStock_id_key" ON "productStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "productStock_productId_branchId_color_key" ON "productStock"("productId", "branchId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_nameId_key" ON "product"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "product_descriptionId_key" ON "product"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "product_detailedDescriptionId_key" ON "product"("detailedDescriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_key" ON "review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "review_productId_key" ON "review"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_productId_key" ON "review"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "state_id_key" ON "state"("id");

-- CreateIndex
CREATE UNIQUE INDEX "state_nameId_key" ON "state"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "store_id_key" ON "store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "store_nameId_key" ON "store"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "store_bioId_key" ON "store"("bioId");

-- CreateIndex
CREATE UNIQUE INDEX "store_logoId_key" ON "store"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "store_bannerId_key" ON "store"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "store_phone_key" ON "store"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "store_email_key" ON "store"("email");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_id_key" ON "socialLink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_storeId_key" ON "socialLink"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userCart_userId_key" ON "userCart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "_occasionToproduct_B_index" ON "_occasionToproduct"("B");

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workHour" ADD CONSTRAINT "workHour_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_taxes" ADD CONSTRAINT "delivery_taxes_originStateId_fkey" FOREIGN KEY ("originStateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_taxes" ADD CONSTRAINT "delivery_taxes_destinationStateId_fkey" FOREIGN KEY ("destinationStateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_userCartUserId_fkey" FOREIGN KEY ("userCartUserId") REFERENCES "userCart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "productStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "delivery_taxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "productStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productPrice" ADD CONSTRAINT "productPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productStock" ADD CONSTRAINT "productStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productStock" ADD CONSTRAINT "productStock_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_detailedDescriptionId_fkey" FOREIGN KEY ("detailedDescriptionId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialLink" ADD CONSTRAINT "socialLink_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCart" ADD CONSTRAINT "userCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
