/*
  Warnings:

  - You are about to drop the column `mainImageId` on the `packaging` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `packaging` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameId]` on the table `packaging` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `packaging` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `packaging` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `packaging` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."packaging" DROP CONSTRAINT "packaging_mainImageId_fkey";

-- DropIndex
DROP INDEX "public"."packaging_mainImageId_key";

-- AlterTable
ALTER TABLE "public"."packaging" DROP COLUMN "mainImageId",
DROP COLUMN "name",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "nameId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "packaging_nameId_key" ON "public"."packaging"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "packaging_imageId_key" ON "public"."packaging"("imageId");

-- AddForeignKey
ALTER TABLE "public"."packaging" ADD CONSTRAINT "packaging_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "public"."locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."packaging" ADD CONSTRAINT "packaging_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
