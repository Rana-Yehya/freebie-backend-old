/*
  Warnings:

  - You are about to drop the column `sApprovedByAdmin` on the `store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "store" DROP COLUMN "sApprovedByAdmin",
ADD COLUMN     "isApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false;
