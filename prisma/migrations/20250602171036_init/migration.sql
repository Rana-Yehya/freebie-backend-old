/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `occasion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logoId]` on the table `store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerId]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "category_imageId_key" ON "category"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_imageId_key" ON "occasion"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "store_logoId_key" ON "store"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "store_bannerId_key" ON "store"("bannerId");
