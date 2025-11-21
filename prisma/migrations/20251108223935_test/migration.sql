/*
  Warnings:

  - You are about to drop the column `locationId` on the `branch` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."branch" DROP CONSTRAINT "branch_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."location" DROP CONSTRAINT "location_stateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order" DROP CONSTRAINT "order_locationId_fkey";

-- DropIndex
DROP INDEX "public"."branch_locationId_key";

-- AlterTable
ALTER TABLE "public"."branch" DROP COLUMN "locationId";

-- DropTable
DROP TABLE "public"."location";

-- CreateTable
CREATE TABLE "public"."branch_location" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "stateId" TEXT NOT NULL,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "branch_location_id_key" ON "public"."branch_location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "branch_location_branchId_key" ON "public"."branch_location"("branchId");

-- AddForeignKey
ALTER TABLE "public"."branch_location" ADD CONSTRAINT "branch_location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branch_location" ADD CONSTRAINT "branch_location_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."branch_location"("id") ON DELETE SET NULL ON UPDATE SET NULL;
