-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "sponsoredEventId" TEXT NOT NULL,
    "uploadedFileId" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_uploadedFileId_fkey" FOREIGN KEY ("uploadedFileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_sponsoredEventId_fkey" FOREIGN KEY ("sponsoredEventId") REFERENCES "SponsoredEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
