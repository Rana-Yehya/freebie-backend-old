/*
  Warnings:

  - You are about to drop the column `image` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `occasion` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secureUrl` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `occasion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `occasion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "fileId",
DROP COLUMN "url",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "secureUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "occasion" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "image";

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occasion" ADD CONSTRAINT "occasion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
