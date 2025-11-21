/*
  Warnings:

  - Changed the type of `adminPrivilege` on the `admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."AdminPrivilege" AS ENUM ('ALL', 'DELIVERY');

-- AlterTable
ALTER TABLE "public"."admin" DROP COLUMN "adminPrivilege",
ADD COLUMN     "adminPrivilege" "public"."AdminPrivilege" NOT NULL;

-- DropEnum
DROP TYPE "public"."adminPrivilege";
