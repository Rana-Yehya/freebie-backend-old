/*
  Warnings:

  - The primary key for the `productUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `productUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "productUser_id_key";

-- AlterTable
ALTER TABLE "productUser" DROP CONSTRAINT "productUser_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "productUser_pkey" PRIMARY KEY ("userCartId", "productId", "color");
