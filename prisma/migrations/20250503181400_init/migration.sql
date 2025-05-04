/*
  Warnings:

  - You are about to drop the column `type` on the `store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "branches" ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "store" DROP COLUMN "type",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'store';
