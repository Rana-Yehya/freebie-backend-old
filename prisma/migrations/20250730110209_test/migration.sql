-- CreateEnum
CREATE TYPE "UserOrderStatus" AS ENUM ('UNPAID', 'PAID');

-- AlterTable
ALTER TABLE "location" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "UserOrderStatus" NOT NULL DEFAULT 'UNPAID';
