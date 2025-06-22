/*
  Warnings:

  - You are about to drop the `productOccasion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productOccasion" DROP CONSTRAINT "productOccasion_occasionsId_fkey";

-- DropForeignKey
ALTER TABLE "productOccasion" DROP CONSTRAINT "productOccasion_productId_fkey";

-- DropTable
DROP TABLE "productOccasion";

-- CreateTable
CREATE TABLE "_occasionToproduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_occasionToproduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_occasionToproduct_B_index" ON "_occasionToproduct"("B");

-- AddForeignKey
ALTER TABLE "_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_A_fkey" FOREIGN KEY ("A") REFERENCES "occasion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_occasionToproduct" ADD CONSTRAINT "_occasionToproduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
