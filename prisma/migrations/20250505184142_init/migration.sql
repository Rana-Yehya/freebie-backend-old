-- AlterTable
ALTER TABLE "product" ALTER COLUMN "color" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "productStock" ALTER COLUMN "stock" DROP NOT NULL,
ALTER COLUMN "stock" DROP DEFAULT;
