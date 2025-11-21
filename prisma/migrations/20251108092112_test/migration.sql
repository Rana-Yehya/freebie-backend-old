-- AlterTable
ALTER TABLE "public"."user_cart" ADD COLUMN     "packagingId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."user_cart" ADD CONSTRAINT "user_cart_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE SET NULL ON UPDATE SET NULL;
