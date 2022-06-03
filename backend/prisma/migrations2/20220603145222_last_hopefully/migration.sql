/*
  Warnings:

  - The primary key for the `Sponsored` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthDate` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `day_of_transaction` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_sum` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `patron_id` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `place_of_birth` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `profile_pic` on the `Sponsored` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Sponsored` table. All the data in the column will be lost.
  - The primary key for the `SponsoredEvents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_date` on the `SponsoredEvents` table. All the data in the column will be lost.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `patron_id` on the `Transactions` table. All the data in the column will be lost.
  - The primary key for the `UploadedFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `UploadedFile` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UploadedFile` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `birthDate` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `Sponsored` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `SponsoredEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileCategory` to the `UploadedFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postfix` to the `UploadedFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `UploadedFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sponsored" DROP CONSTRAINT "Sponsored_patron_id_fkey";

-- DropForeignKey
ALTER TABLE "SponsoredEvents" DROP CONSTRAINT "SponsoredEvents_sponsoredId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_patron_id_fkey";

-- DropForeignKey
ALTER TABLE "UploadedFile" DROP CONSTRAINT "UploadedFile_sponsoredEventsId_fkey";

-- AlterTable
ALTER TABLE "Sponsored" DROP CONSTRAINT "Sponsored_pkey",
DROP COLUMN "birthDate",
DROP COLUMN "day_of_transaction",
DROP COLUMN "end_date",
DROP COLUMN "fatherName",
DROP COLUMN "first_name",
DROP COLUMN "is_active",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "monthly_sum",
DROP COLUMN "patron_id",
DROP COLUMN "place_of_birth",
DROP COLUMN "profile_pic",
DROP COLUMN "start_date",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dayOfTransaction" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "monthlyDum" DOUBLE PRECISION,
ADD COLUMN     "patronId" TEXT,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "uploadedFileId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sponsored_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sponsored_id_seq";

-- AlterTable
ALTER TABLE "SponsoredEvents" DROP CONSTRAINT "SponsoredEvents_pkey",
DROP COLUMN "event_date",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sponsoredId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SponsoredEvents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SponsoredEvents_id_seq";

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
DROP COLUMN "patron_id",
ADD COLUMN     "patronId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transactions_id_seq";

-- AlterTable
ALTER TABLE "UploadedFile" DROP CONSTRAINT "UploadedFile_pkey",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "fileCategory" INTEGER NOT NULL,
ADD COLUMN     "postfix" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sponsoredEventsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UploadedFile_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "Sponsored" ADD CONSTRAINT "Sponsored_patronId_fkey" FOREIGN KEY ("patronId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsored" ADD CONSTRAINT "Sponsored_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_sponsoredEventsId_fkey" FOREIGN KEY ("sponsoredEventsId") REFERENCES "SponsoredEvents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsoredEvents" ADD CONSTRAINT "SponsoredEvents_sponsoredId_fkey" FOREIGN KEY ("sponsoredId") REFERENCES "Sponsored"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_patronId_fkey" FOREIGN KEY ("patronId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
