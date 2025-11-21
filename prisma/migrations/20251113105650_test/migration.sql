/*
  Warnings:

  - A unique constraint covering the columns `[storeLogoId]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "image_storeLogoId_key" ON "public"."image"("storeLogoId");
