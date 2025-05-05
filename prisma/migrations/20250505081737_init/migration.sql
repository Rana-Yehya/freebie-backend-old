/*
  Warnings:

  - You are about to drop the `branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `occasions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialLinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workHours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_stateId_fkey";

-- DropForeignKey
ALTER TABLE "branches" DROP CONSTRAINT "branches_storeId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_occasionsId_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_socialLinksId_fkey";

-- DropForeignKey
ALTER TABLE "workHours" DROP CONSTRAINT "workHours_branchId_fkey";

-- DropTable
DROP TABLE "branches";

-- DropTable
DROP TABLE "occasions";

-- DropTable
DROP TABLE "socialLinks";

-- DropTable
DROP TABLE "workHours";

-- CreateTable
CREATE TABLE "branch" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "phone" TEXT,
    "isFreezed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workHour" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialLink" (
    "id" TEXT NOT NULL,
    "tiktok" TEXT,
    "youtube" TEXT,
    "facebook" TEXT,
    "x" TEXT,
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occasion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occasion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "branch_id_key" ON "branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_id_key" ON "workHour"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workHour_branchId_key" ON "workHour"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "socialLink_id_key" ON "socialLink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "occasion_id_key" ON "occasion"("id");

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workHour" ADD CONSTRAINT "workHour_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_socialLinksId_fkey" FOREIGN KEY ("socialLinksId") REFERENCES "socialLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_occasionsId_fkey" FOREIGN KEY ("occasionsId") REFERENCES "occasion"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
