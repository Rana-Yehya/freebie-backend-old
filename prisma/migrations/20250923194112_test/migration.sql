-- CreateEnum
CREATE TYPE "public"."AdStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('ACTIVE', 'PENDING_DOWNGRADE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."PlanName" AS ENUM ('BASIC', 'SILVER', 'GOLD', 'DIAMOND');

-- CreateEnum
CREATE TYPE "public"."ChangeType" AS ENUM ('UPGRADE', 'DOWNGRADE', 'RENEWAL');

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
CREATE TABLE "public"."store_subscriptions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planName" "public"."PlanName" NOT NULL DEFAULT 'BASIC',
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

-- CreateIndex
CREATE UNIQUE INDEX "branch_discount_codes_branchId_code_key" ON "public"."branch_discount_codes"("branchId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "plan_limits_planName_key" ON "public"."plan_limits"("planName");

-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_impressions" ADD CONSTRAINT "ad_impressions_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_clicks" ADD CONSTRAINT "ad_clicks_adCampaignId_fkey" FOREIGN KEY ("adCampaignId") REFERENCES "public"."ad_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch_discount_codes" ADD CONSTRAINT "branch_discount_codes_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription_plan_changes" ADD CONSTRAINT "subscription_plan_changes_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
