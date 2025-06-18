/*
  Warnings:

  - Added the required column `stars` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "stars" INTEGER NOT NULL;
