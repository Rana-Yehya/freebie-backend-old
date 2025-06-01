-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stateId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE SET NULL;
