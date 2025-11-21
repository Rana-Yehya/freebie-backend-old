/*
  Warnings:

  - You are about to drop the column `imageId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `occasion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."category" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "public"."occasion" DROP COLUMN "imageId";
