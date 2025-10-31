/*
  Warnings:

  - You are about to drop the column `isMain` on the `user_locations` table. All the data in the column will be lost.
  - Made the column `stock` on table `product_stock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."product_stock" ALTER COLUMN "stock" SET NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "userLocationsId" TEXT NOT NULL DEFAULT '2aaeb826-8ed5-446a-a194-6370bd9df79e';

-- AlterTable
ALTER TABLE "public"."user_locations" DROP COLUMN "isMain";

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_userLocationsId_fkey" FOREIGN KEY ("userLocationsId") REFERENCES "public"."user_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
