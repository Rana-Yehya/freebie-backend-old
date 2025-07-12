/*
  Warnings:

  - You are about to drop the `name` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_nameId_fkey";

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_nameId_fkey";

-- DropForeignKey
ALTER TABLE "country" DROP CONSTRAINT "country_nameId_fkey";

-- DropForeignKey
ALTER TABLE "currency" DROP CONSTRAINT "currency_currencyAbbId_fkey";

-- DropForeignKey
ALTER TABLE "currency" DROP CONSTRAINT "currency_nameId_fkey";

-- DropForeignKey
ALTER TABLE "occasion" DROP CONSTRAINT "occasion_nameId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_detailedDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_nameId_fkey";

-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_nameId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_bioId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_nameId_fkey";

-- DropTable
DROP TABLE "name";

-- CreateTable
CREATE TABLE "locale" (
    "id" TEXT NOT NULL,
    "default" TEXT,
    "en" TEXT,
    "ar" TEXT,

    CONSTRAINT "locale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "locale_id_key" ON "locale"("id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currency" ADD CONSTRAINT "currency_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currency" ADD CONSTRAINT "currency_currencyAbbId_fkey" FOREIGN KEY ("currencyAbbId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_detailedDescriptionId_fkey" FOREIGN KEY ("detailedDescriptionId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "locale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
