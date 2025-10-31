/*
  Warnings:

  - You are about to drop the `userLocations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."userLocations" DROP CONSTRAINT "userLocations_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userLocations" DROP CONSTRAINT "userLocations_userId_fkey";

-- AlterTable
ALTER TABLE "public"."branch" ADD COLUMN     "addresses" TEXT;

-- DropTable
DROP TABLE "public"."userLocations";

-- CreateTable
CREATE TABLE "public"."user_locations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stateId" TEXT,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_locations_id_key" ON "public"."user_locations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_locations_userId_stateId_key" ON "public"."user_locations"("userId", "stateId");

-- AddForeignKey
ALTER TABLE "public"."user_locations" ADD CONSTRAINT "user_locations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_locations" ADD CONSTRAINT "user_locations_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE SET NULL ON UPDATE SET NULL;
