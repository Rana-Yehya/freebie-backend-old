-- DropForeignKey
ALTER TABLE "productCart" DROP CONSTRAINT "productCart_userCartUserId_fkey";

-- AddForeignKey
ALTER TABLE "productCart" ADD CONSTRAINT "productCart_userCartUserId_fkey" FOREIGN KEY ("userCartUserId") REFERENCES "userCart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
