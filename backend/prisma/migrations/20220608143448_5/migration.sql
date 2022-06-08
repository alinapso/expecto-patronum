-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_sponsoredEventId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_uploadedFileId_fkey";

-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "sponsoredEventId" DROP NOT NULL,
ALTER COLUMN "uploadedFileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_sponsoredEventId_fkey" FOREIGN KEY ("sponsoredEventId") REFERENCES "SponsoredEvents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
