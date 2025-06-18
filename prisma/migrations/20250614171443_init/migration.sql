-- AlterTable
ALTER TABLE "productOrder" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "refundAmount" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0;
