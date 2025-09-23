/*
  Warnings:

  - You are about to drop the column `planName` on the `store_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."store_subscriptions" DROP COLUMN "planName",
ADD COLUMN     "planLimitId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."store_subscriptions" ADD CONSTRAINT "store_subscriptions_planLimitId_fkey" FOREIGN KEY ("planLimitId") REFERENCES "public"."plan_limits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
