/*
  Warnings:

  - You are about to drop the column `userLocationsId` on the `state` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_userLocationsId_fkey";

-- AlterTable
ALTER TABLE "state" DROP COLUMN "userLocationsId";

-- AlterTable
ALTER TABLE "userLocations" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stateId" TEXT;

-- AddForeignKey
ALTER TABLE "userLocations" ADD CONSTRAINT "userLocations_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;
