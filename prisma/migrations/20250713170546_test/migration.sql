/*
  Warnings:

  - The primary key for the `socialLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `socialLink` table. All the data in the column will be lost.
  - You are about to drop the column `isApprovedByAdmin` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `isBanned` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `isFreezed` on the `store` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('PENDING', 'APPROVED', 'FROZEN', 'BANNED', 'DELETED');

-- DropIndex
DROP INDEX "socialLink_id_key";

-- AlterTable
ALTER TABLE "socialLink" DROP CONSTRAINT "socialLink_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "store" DROP COLUMN "isApprovedByAdmin",
DROP COLUMN "isBanned",
DROP COLUMN "isDeleted",
DROP COLUMN "isFreezed",
ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'PENDING';
