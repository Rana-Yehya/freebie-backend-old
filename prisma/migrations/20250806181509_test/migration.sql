/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "review_productId_key";

-- DropIndex
DROP INDEX "review_userId_key";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "id" TEXT NOT NULL DEFAULT '89b2f619-4305-4aad-be83-4bc25d79ad77',
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "review_id_key" ON "review"("id");
