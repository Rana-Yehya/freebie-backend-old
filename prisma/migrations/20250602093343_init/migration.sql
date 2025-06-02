-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_imageId_fkey";

-- DropForeignKey
ALTER TABLE "occasion" DROP CONSTRAINT "occasion_imageId_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "imageId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "occasion" ALTER COLUMN "imageId" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
