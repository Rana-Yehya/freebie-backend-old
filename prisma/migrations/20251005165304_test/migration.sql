-- AddForeignKey
ALTER TABLE "public"."ad_campaigns" ADD CONSTRAINT "ad_campaigns_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
