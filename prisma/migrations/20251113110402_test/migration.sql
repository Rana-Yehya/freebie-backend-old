/*
  Warnings:

  - A unique constraint covering the columns `[storeBannerId]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "image_storeBannerId_key" ON "public"."image"("storeBannerId");
