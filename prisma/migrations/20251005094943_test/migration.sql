/*
  Warnings:

  - You are about to drop the column `allowsBoxesUsedThisPeriod` on the `subscription_plan_changes` table. All the data in the column will be lost.
  - You are about to drop the column `allowsCollaborationsUsedThisPeriod` on the `subscription_plan_changes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."subscription_plan_changes" DROP COLUMN "allowsBoxesUsedThisPeriod",
DROP COLUMN "allowsCollaborationsUsedThisPeriod";
