/*
  Warnings:

  - You are about to drop the column `bio` on the `store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bioId]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "store" DROP COLUMN "bio",
ADD COLUMN     "bioId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "store_bioId_key" ON "store"("bioId");

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;
