/*
  Warnings:

  - Added the required column `amount` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EGP',
ADD COLUMN     "purpose" TEXT,
ALTER COLUMN "type" SET DEFAULT 'deposit',
ALTER COLUMN "type" SET DATA TYPE TEXT;
