-- AlterTable
ALTER TABLE "user" ADD COLUMN     "accessTokenSecret" TEXT,
ADD COLUMN     "refreshTokenSecret" TEXT;
