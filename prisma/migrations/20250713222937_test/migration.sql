/*
  Warnings:

  - You are about to drop the column `currencyCode` on the `country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryId]` on the table `currency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "country" DROP COLUMN "currencyCode";

-- AlterTable
ALTER TABLE "currency" ADD COLUMN     "countryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "currency_countryId_key" ON "currency"("countryId");

-- AddForeignKey
ALTER TABLE "currency" ADD CONSTRAINT "currency_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
