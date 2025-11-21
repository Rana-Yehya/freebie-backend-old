/*
  Warnings:

  - You are about to drop the `Packaging` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Packaging";

-- DropEnum
DROP TYPE "public"."CostType";

-- DropEnum
DROP TYPE "public"."PackageSize";

-- CreateTable
CREATE TABLE "public"."packaging" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxWidth" DOUBLE PRECISION NOT NULL,
    "maxHeight" DOUBLE PRECISION NOT NULL,
    "maxDepth" DOUBLE PRECISION,
    "weightLimit" DOUBLE PRECISION,
    "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mainImageId" TEXT NOT NULL,
    "packageType" "public"."PackageType" NOT NULL,
    "baseImage" TEXT,

    CONSTRAINT "packaging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "packaging_mainImageId_key" ON "public"."packaging"("mainImageId");

-- AddForeignKey
ALTER TABLE "public"."packaging" ADD CONSTRAINT "packaging_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "public"."image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
