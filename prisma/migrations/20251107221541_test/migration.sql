/*
  Warnings:

  - You are about to drop the column `nameId` on the `packaging` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[packagingId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."packaging" DROP CONSTRAINT "packaging_nameId_fkey";

-- DropIndex
DROP INDEX "public"."packaging_nameId_key";

-- AlterTable
ALTER TABLE "public"."locale" ADD COLUMN     "packagingId" TEXT;

-- AlterTable
ALTER TABLE "public"."packaging" DROP COLUMN "nameId";

-- CreateIndex
CREATE UNIQUE INDEX "locale_packagingId_key" ON "public"."locale"("packagingId");

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE SET NULL ON UPDATE CASCADE;
