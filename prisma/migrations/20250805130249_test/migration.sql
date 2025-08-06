/*
  Warnings:

  - You are about to drop the column `data` on the `info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameId]` on the table `info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameId` to the `info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "info" DROP COLUMN "data",
ADD COLUMN     "nameId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "info_nameId_key" ON "info"("nameId");

-- AddForeignKey
ALTER TABLE "info" ADD CONSTRAINT "info_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "locale"("id") ON DELETE SET NULL ON UPDATE SET NULL;
