/*
  Warnings:

  - You are about to drop the column `userLocationsId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mainUserId]` on the table `user_locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_userLocationsId_fkey";

-- DropIndex
DROP INDEX "public"."user_locations_userId_stateId_key";

-- AlterTable
ALTER TABLE "public"."location" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "userLocationsId";

-- AlterTable
ALTER TABLE "public"."user_locations" ADD COLUMN     "mainUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_locations_mainUserId_key" ON "public"."user_locations"("mainUserId");

-- AddForeignKey
ALTER TABLE "public"."user_locations" ADD CONSTRAINT "user_locations_mainUserId_fkey" FOREIGN KEY ("mainUserId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
