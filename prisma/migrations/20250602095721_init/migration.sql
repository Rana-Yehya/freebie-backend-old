/*
  Warnings:

  - You are about to drop the column `banner` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `store` table. All the data in the column will be lost.
  - Added the required column `bannerId` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoId` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "imageId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "occasion" ALTER COLUMN "imageId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "store" DROP COLUMN "banner",
DROP COLUMN "logo",
ADD COLUMN     "bannerId" TEXT NOT NULL,
ADD COLUMN     "logoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
