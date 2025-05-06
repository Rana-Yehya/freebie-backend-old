/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userCart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userCart_userId_key" ON "userCart"("userId");
