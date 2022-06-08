/*
  Warnings:

  - A unique constraint covering the columns `[uploadedFileId]` on the table `Sponsored` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sponsored_uploadedFileId_key" ON "Sponsored"("uploadedFileId");
