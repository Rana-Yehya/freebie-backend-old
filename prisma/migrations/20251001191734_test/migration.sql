-- CreateEnum
CREATE TYPE "public"."adminPrivilege" AS ENUM ('ALL', 'DELIVERY');

-- AlterTable
ALTER TABLE "public"."admin" ADD COLUMN     "adminPrivilege" "public"."adminPrivilege" NOT NULL DEFAULT 'ALL';
