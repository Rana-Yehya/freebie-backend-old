-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_imageId_fkey";

-- DropForeignKey
ALTER TABLE "occasion" DROP CONSTRAINT "occasion_imageId_fkey";

-- DropIndex
DROP INDEX "category_imageId_key";

-- DropIndex
DROP INDEX "occasion_imageId_key";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "imageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "occasion" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE SET NULL;
