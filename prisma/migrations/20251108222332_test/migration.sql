/*
  Warnings:

  - You are about to drop the column `addresses` on the `branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."branch" DROP COLUMN "addresses",
ADD COLUMN     "address" TEXT;
