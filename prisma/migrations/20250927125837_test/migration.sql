/*
  Warnings:

  - The `role` column on the `store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `annualPrice` on the `store_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyPrice` on the `store_subscriptions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."StoreRole" AS ENUM ('STORE');

-- AlterTable
ALTER TABLE "public"."store" ADD COLUMN     "subscriptionId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."StoreRole" NOT NULL DEFAULT 'STORE';

-- AlterTable
ALTER TABLE "public"."store_subscriptions" DROP COLUMN "annualPrice",
DROP COLUMN "monthlyPrice",
ADD COLUMN     "isPermanentSub" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "currentPeriodStart" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "currentPeriodEnd" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."store" ADD CONSTRAINT "store_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "public"."store_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
