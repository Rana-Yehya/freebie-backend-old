/*
  Warnings:

  - You are about to drop the column `governmentId` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `governmentId` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `governmentId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `government` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nameId` on table `state` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_governmentId_fkey";

-- DropForeignKey
ALTER TABLE "government" DROP CONSTRAINT "government_countryId_fkey";

-- DropForeignKey
ALTER TABLE "government" DROP CONSTRAINT "government_nameId_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_governmentId_fkey";

-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_nameId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_governmentId_fkey";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "governmentId";

-- AlterTable
ALTER TABLE "location" DROP COLUMN "governmentId";

-- AlterTable
ALTER TABLE "state" ALTER COLUMN "nameId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "governmentId";

-- DropTable
DROP TABLE "government";

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
