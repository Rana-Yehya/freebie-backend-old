-- AlterTable
ALTER TABLE "public"."order" ADD COLUMN     "packagingId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE SET NULL ON UPDATE SET NULL;
