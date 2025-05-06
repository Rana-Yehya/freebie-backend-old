/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `productStock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productStock_color_key" ON "productStock"("color");
