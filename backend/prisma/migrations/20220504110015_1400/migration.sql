/*
  Warnings:

  - You are about to drop the column `userId` on the `Sponsored` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sponsored" DROP CONSTRAINT "Sponsored_userId_fkey";

-- AlterTable
ALTER TABLE "Sponsored" DROP COLUMN "userId",
ADD COLUMN     "patronId" INTEGER;

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sponsoredEventsId" INTEGER,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsoredEvents" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sponsoredId" INTEGER NOT NULL,

    CONSTRAINT "SponsoredEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "patronId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sponsored" ADD CONSTRAINT "Sponsored_patronId_fkey" FOREIGN KEY ("patronId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_sponsoredEventsId_fkey" FOREIGN KEY ("sponsoredEventsId") REFERENCES "SponsoredEvents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsoredEvents" ADD CONSTRAINT "SponsoredEvents_sponsoredId_fkey" FOREIGN KEY ("sponsoredId") REFERENCES "Sponsored"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_patronId_fkey" FOREIGN KEY ("patronId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
