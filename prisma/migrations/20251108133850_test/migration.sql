/*
  Warnings:

  - You are about to drop the column `nameId` on the `state` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."state_nameId_key";

-- AlterTable
ALTER TABLE "public"."state" DROP COLUMN "nameId";
