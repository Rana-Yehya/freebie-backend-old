-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_productId_fkey";

-- DropForeignKey
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_userCartId_fkey";

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_userCartId_fkey" FOREIGN KEY ("userCartId") REFERENCES "userCart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productUser" ADD CONSTRAINT "productUser_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
