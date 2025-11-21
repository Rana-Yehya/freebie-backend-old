-- DropForeignKey
ALTER TABLE "public"."locale" DROP CONSTRAINT "locale_packagingId_fkey";

-- AddForeignKey
ALTER TABLE "public"."locale" ADD CONSTRAINT "locale_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "public"."packaging"("id") ON DELETE CASCADE ON UPDATE CASCADE;
