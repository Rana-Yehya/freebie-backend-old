/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `socialLink` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `socialLink` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "socialLink" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "socialLink_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_id_key" ON "socialLink"("id");
