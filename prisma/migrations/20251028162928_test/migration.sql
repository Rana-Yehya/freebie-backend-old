/*
  Warnings:

  - You are about to drop the column `stateId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_stateId_fkey";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "stateId";
