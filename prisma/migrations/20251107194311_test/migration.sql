/*
  Warnings:

  - You are about to drop the column `description` on the `packaging` table. All the data in the column will be lost.
  - You are about to drop the column `maxDepth` on the `packaging` table. All the data in the column will be lost.
  - You are about to drop the column `maxHeight` on the `packaging` table. All the data in the column will be lost.
  - You are about to drop the column `maxWidth` on the `packaging` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."packaging" DROP COLUMN "description",
DROP COLUMN "maxDepth",
DROP COLUMN "maxHeight",
DROP COLUMN "maxWidth",
ADD COLUMN     "dimensionsHCm" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "dimensionsLCm" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "dimensionsWCm" DOUBLE PRECISION NOT NULL DEFAULT 1;
