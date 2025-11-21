/*
  Warnings:

  - You are about to drop the column `nameId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameProductId]` on the table `locale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_nameId_fkey";

-- DropIndex
DROP INDEX "public"."product_nameId_key";

-- AlterTable
ALTER TABLE "public"."locale" ADD COLUMN     "nameProductId" TEXT;

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "nameId";

-- CreateIndex
CREATE UNIQUE INDEX "locale_nameProductId_key" ON "public"."locale"("nameProductId");

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_nameProductId_fkey" FOREIGN KEY ("nameProductId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
