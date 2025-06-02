/*
  Warnings:

  - You are about to drop the column `userId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `occasion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- DropForeignKey
ALTER TABLE "occasion" DROP CONSTRAINT "occasion_userId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "occasion" DROP COLUMN "userId";
