/*
  Warnings:

  - A unique constraint covering the columns `[countryIsoCode]` on the table `country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "country_countryIsoCode_key" ON "country"("countryIsoCode");
