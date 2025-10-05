/*
  Warnings:

  - You are about to drop the column `adsResetAt` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `adsUsedThisPeriod` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `allowsBoxes` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `allowsCollaborations` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpgradeDate` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `minimumPlanPeriodUntil` on the `store_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."store_subscriptions" DROP COLUMN "adsResetAt",
DROP COLUMN "adsUsedThisPeriod",
DROP COLUMN "allowsBoxes",
DROP COLUMN "allowsCollaborations",
DROP COLUMN "lastUpgradeDate",
DROP COLUMN "minimumPlanPeriodUntil",
ADD COLUMN     "lastChangeSubscriptionDate" TIMESTAMP(3),
ADD COLUMN     "periodEnd" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."subscription_plan_changes" ADD COLUMN     "adsUsedThisPeriod" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "allowsBoxesUsedThisPeriod" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowsCollaborationsUsedThisPeriod" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "branchesUsedThisPeriod" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "commissionRateUsedThisPeriod" DOUBLE PRECISION NOT NULL DEFAULT 0.14,
ADD COLUMN     "discountCodesUsedThisPeriod" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notificationsUsedThisPeriod" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalProductsUsedThisPeriod" INTEGER NOT NULL DEFAULT 0;
