-- AlterTable
ALTER TABLE "city" ADD COLUMN     "governmentId" TEXT;

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "governmentId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "governmentId" TEXT;

-- CreateTable
CREATE TABLE "government" (
    "id" TEXT NOT NULL,
    "nameId" TEXT,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "government_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "government_id_key" ON "government"("id");

-- CreateIndex
CREATE UNIQUE INDEX "government_nameId_key" ON "government"("nameId");

-- AddForeignKey
ALTER TABLE "government" ADD CONSTRAINT "government_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "name"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "government" ADD CONSTRAINT "government_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_governmentId_fkey" FOREIGN KEY ("governmentId") REFERENCES "government"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_governmentId_fkey" FOREIGN KEY ("governmentId") REFERENCES "government"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_governmentId_fkey" FOREIGN KEY ("governmentId") REFERENCES "government"("id") ON DELETE SET NULL ON UPDATE CASCADE;
