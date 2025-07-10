-- AlterEnum
ALTER TYPE "productTags" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "tags" DROP NOT NULL;
