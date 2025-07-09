-- DropForeignKey
ALTER TABLE "state" DROP CONSTRAINT "state_nameId_fkey";

-- AlterTable
ALTER TABLE "state" ALTER COLUMN "nameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;
