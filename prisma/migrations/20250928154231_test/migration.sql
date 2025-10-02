/*
  Warnings:

  - Made the column `planLimitId` on table `store_subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."store_subscriptions" DROP CONSTRAINT "store_subscriptions_planLimitId_fkey";

-- AlterTable
ALTER TABLE "public"."store_subscriptions" ALTER COLUMN "planLimitId" SET NOT NULL,
ALTER COLUMN "maxBranches" SET DEFAULT 2;

-- AddForeignKey
ALTER TABLE "public"."store_subscriptions" ADD CONSTRAINT "store_subscriptions_planLimitId_fkey" FOREIGN KEY ("planLimitId") REFERENCES "public"."plan_limits"("planName") ON DELETE RESTRICT ON UPDATE CASCADE;
