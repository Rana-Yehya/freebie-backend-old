-- DropForeignKey
ALTER TABLE "public"."discount" DROP CONSTRAINT "discount_productId_fkey";

-- AlterTable
ALTER TABLE "public"."discount" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."discount" ADD CONSTRAINT "discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
