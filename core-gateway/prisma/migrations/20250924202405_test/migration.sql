-- CreateEnum
CREATE TYPE "public"."AdStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."UserOrderStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateEnum
CREATE TYPE "public"."PlanName" AS ENUM ('BASIC', 'SILVER', 'GOLD', 'DIAMOND');

-- CreateEnum
CREATE TYPE "public"."ProductCartStatus" AS ENUM ('ACTIVE', 'NODELIVERYSTATES', 'OUTOFSTOCK');

-- CreateEnum
CREATE TYPE "public"."OrderCancelBy" AS ENUM ('USER', 'STORE');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CANCELLED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."ProductTags" AS ENUM ('FEATURED', 'POPULAR', 'BIGSALE', 'NONE');

-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('PENDING', 'APPROVED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('ACTIVE', 'PENDING_DOWNGRADE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."StoreStatus" AS ENUM ('PENDING', 'APPROVED', 'FROZEN', 'BANNED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."ChangeType" AS ENUM ('UPGRADE', 'DOWNGRADE', 'RENEWAL');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PAYMENT', 'REFUND');

-- CreateTable
CREATE TABLE "public"."admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "moneyInPocket" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ad_campaigns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ad_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ad_impressions" (
    "id" TEXT NOT NULL,
    "adCampaignId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_impressions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ad_clicks" (
    "id" TEXT NOT NULL,
    "adCampaignId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."branch_discount_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountPercentage" INTEGER,
    "discountAmount" DOUBLE PRECISION,
    "minOrderAmount" DOUBLE PRECISION,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "branch_discount_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."branch" (
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
CREATE TABLE "public"."workHour" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "workHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "canBeDeliveredOutsideState" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."city" (
    "id" TEXT NOT NULL,
    "nameId" TEXT,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."country" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "countryIsoCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."currency" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "currencyAbbId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."delivery_taxes" (
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
CREATE TABLE "public"."image" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inbox" (
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
CREATE TABLE "public"."info" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."locale" (
    "id" TEXT NOT NULL,
    "default" TEXT,
    "en" TEXT,
    "ar" TEXT,

    CONSTRAINT "locale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "stateId" TEXT NOT NULL,
    "branchId" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."occasion" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occasion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order" (
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
    "status" "public"."UserOrderStatus" NOT NULL DEFAULT 'UNPAID',
    "cancellationReason" TEXT,
    "refundAmount" DOUBLE PRECISION,
    "currencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plan_limits" (
    "id" TEXT NOT NULL,
    "planName" "public"."PlanName" NOT NULL DEFAULT 'BASIC',
    "maxProducts" INTEGER NOT NULL DEFAULT 50,
    "maxBranches" INTEGER NOT NULL DEFAULT 2,
    "maxDiscountCodes" INTEGER NOT NULL DEFAULT 0,
    "notificationsPerWeek" INTEGER NOT NULL DEFAULT 0,
    "adsPerWeek" INTEGER NOT NULL DEFAULT 0,
    "allowsBoxes" BOOLEAN NOT NULL DEFAULT false,
    "allowsCollaborations" BOOLEAN NOT NULL DEFAULT false,
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.14,
    "monthlyPrice" DOUBLE PRECISION,
    "annualPrice" DOUBLE PRECISION,

    CONSTRAINT "plan_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_cart" (
    "userCartUserId" TEXT NOT NULL,
    "productStockId" TEXT NOT NULL,
    "deliveryTaxesId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "public"."ProductCartStatus" NOT NULL DEFAULT 'ACTIVE',
    "oldQuantity" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."product_order" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productStockId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "cancellationReason" TEXT,
    "userRefundAmount" DOUBLE PRECISION,
    "storerRefundAmount" DOUBLE PRECISION,
    "cancelledBy" "public"."OrderCancelBy",

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_price" (
    "productId" TEXT NOT NULL,
    "actualPrice" DOUBLE PRECISION,
    "discountPercent" DOUBLE PRECISION DEFAULT 0,
    "discountStartTime" TIMESTAMP(3),
    "discountEndTime" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "public"."product_stock" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "stock" INTEGER,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "mainImageId" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "detailedDescriptionId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "doesNeedPreparation" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."ProductStatus" NOT NULL DEFAULT 'PENDING',
    "tags" "public"."ProductTags",
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
CREATE TABLE "public"."review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "fcmToken" TEXT,
    "userId" TEXT,
    "storeId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "adminId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."state" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."store_subscriptions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planLimitId" TEXT,
    "status" "public"."SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "maxTotalProducts" INTEGER NOT NULL DEFAULT 50,
    "maxBranches" INTEGER NOT NULL DEFAULT 1,
    "maxDiscountCodes" INTEGER NOT NULL DEFAULT 0,
    "notificationsPerWeek" INTEGER NOT NULL DEFAULT 0,
    "adsPerWeek" INTEGER NOT NULL DEFAULT 0,
    "allowsBoxes" BOOLEAN NOT NULL DEFAULT false,
    "allowsCollaborations" BOOLEAN NOT NULL DEFAULT false,
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.14,
    "monthlyPrice" DOUBLE PRECISION,
    "annualPrice" DOUBLE PRECISION,
    "adsUsedThisPeriod" INTEGER NOT NULL DEFAULT 0,
    "adsResetAt" TIMESTAMP(3),
    "downgradeToPlan" "public"."PlanName",
    "downgradeScheduledAt" TIMESTAMP(3),

    CONSTRAINT "store_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."store" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "bioId" TEXT NOT NULL,
    "logoId" TEXT NOT NULL,
    "bannerId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "moneyInPocket" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "passwordChangeBefore" TIMESTAMP(3),
    "role" TEXT NOT NULL DEFAULT 'store',
    "status" "public"."StoreStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."socialLink" (
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
CREATE TABLE "public"."subscription_plan_changes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromPlan" "public"."PlanName" NOT NULL,
    "toPlan" "public"."PlanName" NOT NULL,
    "changeType" "public"."ChangeType" NOT NULL,
    "reason" TEXT,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "subscription_plan_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transaction" (
    "id" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL DEFAULT 'DEPOSIT',
    "userId" TEXT,
    "storeId" TEXT,
    "adminId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "purpose" TEXT,
    "currencyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_cart" (
    "userId" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "moneyInPocket" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "stateId" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."userLocations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stateId" TEXT,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_occasionToproduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_occasionToproduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "public"."admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "public"."admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "public"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "branch_discount_codes_branchId_code_key" ON "public"."branch_discount_codes"("branchId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "branch_id_key" ON "public"."branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_locationId_key" ON "public"."branch"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_id_key" ON "public"."workHour"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_branchId_key" ON "public"."workHour"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "public"."category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_nameId_key" ON "public"."category"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "city_id_key" ON "public"."city"("id");

-- CreateIndex
CREATE UNIQUE INDEX "city_nameId_key" ON "public"."city"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "country_id_key" ON "public"."country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "country_nameId_key" ON "public"."country"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "country_countryIsoCode_key" ON "public"."country"("countryIsoCode");

-- CreateIndex
CREATE UNIQUE INDEX "currency_id_key" ON "public"."currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "currency_nameId_key" ON "public"."currency"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "currency_currencyAbbId_key" ON "public"."currency"("currencyAbbId");

-- CreateIndex
CREATE UNIQUE INDEX "currency_countryId_key" ON "public"."currency"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_taxes_id_key" ON "public"."delivery_taxes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image_id_key" ON "public"."image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inbox_id_key" ON "public"."inbox"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_id_key" ON "public"."info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_slug_key" ON "public"."info"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "info_nameId_key" ON "public"."info"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "locale_id_key" ON "public"."locale"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "public"."location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_id_key" ON "public"."occasion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_nameId_key" ON "public"."occasion"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "public"."order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_locationId_key" ON "public"."order"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "plan_limits_planName_key" ON "public"."plan_limits"("planName");

-- CreateIndex
CREATE UNIQUE INDEX "product_cart_userCartUserId_productStockId_key" ON "public"."product_cart"("userCartUserId", "productStockId");

-- CreateIndex
CREATE UNIQUE INDEX "product_order_id_key" ON "public"."product_order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_price_productId_key" ON "public"."product_price"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_id_key" ON "public"."product_stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_id_key" ON "public"."product_variant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_productId_color_key" ON "public"."product_variant"("productId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "public"."product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_nameId_key" ON "public"."product"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "product_mainImageId_key" ON "public"."product"("mainImageId");

-- CreateIndex
CREATE UNIQUE INDEX "product_descriptionId_key" ON "public"."product"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "product_detailedDescriptionId_key" ON "public"."product"("detailedDescriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "review_id_key" ON "public"."review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_productId_key" ON "public"."review"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "public"."session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "state_id_key" ON "public"."state"("id");

-- CreateIndex
CREATE UNIQUE INDEX "state_nameId_key" ON "public"."state"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "store_id_key" ON "public"."store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "store_nameId_key" ON "public"."store"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "store_bioId_key" ON "public"."store"("bioId");

-- CreateIndex
CREATE UNIQUE INDEX "store_logoId_key" ON "public"."store"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "store_bannerId_key" ON "public"."store"("bannerId");

-- CreateIndex
CREATE UNIQUE INDEX "store_phone_key" ON "public"."store"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "store_email_key" ON "public"."store"("email");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_id_key" ON "public"."socialLink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_storeId_key" ON "public"."socialLink"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "public"."transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_userId_key" ON "public"."user_cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "public"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "public"."user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userLocations_id_key" ON "public"."userLocations"("id");

-- CreateIndex
CREATE INDEX "_occasionToproduct_B_index" ON "public"."_occasionToproduct"("B");

-- AddForeignKey
ALTER TABLE "public"."admin" ADD CONSTRAINT "admin_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_impressions" ADD CONSTRAINT "ad_impressions_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_clicks" ADD CONSTRAINT "ad_clicks_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch_discount_codes" ADD CONSTRAINT "branch_discount_codes_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workHour" ADD CONSTRAINT "workHour_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."category" ADD CONSTRAINT "category_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."category" ADD CONSTRAINT "category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."city" ADD CONSTRAINT "city_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."city" ADD CONSTRAINT "city_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."country" ADD CONSTRAINT "country_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."currency" ADD CONSTRAINT "currency_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."currency" ADD CONSTRAINT "currency_currencyAbbId_fkey" FOREIGN KEY ("currencyAbbId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."currency" ADD CONSTRAINT "currency_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_taxes" ADD CONSTRAINT "delivery_taxes_originStateId_fkey" FOREIGN KEY ("originStateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_taxes" ADD CONSTRAINT "delivery_taxes_destinationStateId_fkey" FOREIGN KEY ("destinationStateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."info" ADD CONSTRAINT "info_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."occasion" ADD CONSTRAINT "occasion_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."occasion" ADD CONSTRAINT "occasion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_cart" ADD CONSTRAINT "product_cart_userCartUserId_fkey" FOREIGN KEY ("userCartUserId") REFERENCES "public"."user_cart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_cart" ADD CONSTRAINT "product_cart_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "public"."product_stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_cart" ADD CONSTRAINT "product_cart_deliveryTaxesId_fkey" FOREIGN KEY ("deliveryTaxesId") REFERENCES "public"."delivery_taxes"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_order" ADD CONSTRAINT "product_order_productStockId_fkey" FOREIGN KEY ("productStockId") REFERENCES "public"."product_stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_price" ADD CONSTRAINT "product_price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_stock" ADD CONSTRAINT "product_stock_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_stock" ADD CONSTRAINT "product_stock_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_variant" ADD CONSTRAINT "product_variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "public"."image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_detailedDescriptionId_fkey" FOREIGN KEY ("detailedDescriptionId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."state" ADD CONSTRAINT "state_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store_subscriptions" ADD CONSTRAINT "store_subscriptions_planLimitId_fkey" FOREIGN KEY ("planLimitId") REFERENCES "public"."plan_limits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "public"."locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."socialLink" ADD CONSTRAINT "socialLink_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription_plan_changes" ADD CONSTRAINT "subscription_plan_changes_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transaction" ADD CONSTRAINT "transaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transaction" ADD CONSTRAINT "transaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transaction" ADD CONSTRAINT "transaction_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_cart" ADD CONSTRAINT "user_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "public"."userLocations" ADD CONSTRAINT "userLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userLocations" ADD CONSTRAINT "userLocations_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
