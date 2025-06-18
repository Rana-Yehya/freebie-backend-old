/*
  Warnings:

  - Added the required column `address` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingNumber` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "countryId" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EGP',
ADD COLUMN     "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "estimatedDeliveryDate" TIMESTAMP(3) NOT NULL DEFAULT (NOW() + '7 days'::interval),
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "refundAmount" DOUBLE PRECISION,
ADD COLUMN     "stateId" TEXT NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "trackingNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
