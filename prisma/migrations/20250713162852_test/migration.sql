/*
  Warnings:

  - Made the column `nameId` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameId` on table `occasion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "nameId" SET NOT NULL;

-- AlterTable
ALTER TABLE "occasion" ALTER COLUMN "nameId" SET NOT NULL;
