/*
  Warnings:

  - Changed the type of `fileCategory` on the `UploadedFile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FileCategory" AS ENUM ('PROFILE', 'IMAGE', 'DOC');

-- AlterTable
ALTER TABLE "UploadedFile" DROP COLUMN "fileCategory",
ADD COLUMN     "fileCategory" "FileCategory" NOT NULL;
