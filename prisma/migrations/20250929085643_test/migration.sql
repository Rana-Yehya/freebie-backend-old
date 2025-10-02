/*
  Warnings:

  - You are about to drop the column `currentPeriodEnd` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `currentPeriodStart` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `downgradeScheduledAt` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `downgradeToPlan` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `isPermanentSub` on the `store_subscriptions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."store" DROP CONSTRAINT "store_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "public"."store_subscriptions" DROP COLUMN "currentPeriodEnd",
DROP COLUMN "currentPeriodStart",
DROP COLUMN "downgradeScheduledAt",
DROP COLUMN "downgradeToPlan",
DROP COLUMN "isPermanentSub",
ADD COLUMN     "lastUpgradeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "minimumPlanPeriodUntil" TIMESTAMP(3),
ALTER COLUMN "maxTotalProducts" SET DEFAULT 0,
ALTER COLUMN "maxBranches" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
