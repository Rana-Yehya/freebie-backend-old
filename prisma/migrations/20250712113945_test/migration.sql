/*
  Warnings:

  - You are about to drop the column `accessTokenSecret` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `fcmToken` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenSecret` on the `store` table. All the data in the column will be lost.
  - The `type` column on the `transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accessTokenSecret` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fcmToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenSecret` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PAYMENT', 'REFUND');

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_countryId_fkey";

-- AlterTable
ALTER TABLE "store" DROP COLUMN "accessTokenSecret",
DROP COLUMN "fcmToken",
DROP COLUMN "refreshTokenSecret";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "adminId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'DEPOSIT';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accessTokenSecret",
DROP COLUMN "countryId",
DROP COLUMN "fcmToken",
DROP COLUMN "password",
DROP COLUMN "refreshTokenSecret";

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "moneyInPocket" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "fcmToken" TEXT,
    "userId" TEXT,
    "storeId" TEXT,
    "adminId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
