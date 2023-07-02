-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeCustomerId" TEXT;
