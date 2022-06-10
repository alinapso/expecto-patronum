/*
  Warnings:

  - Added the required column `sponsoredId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "sponsoredId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_sponsoredId_fkey" FOREIGN KEY ("sponsoredId") REFERENCES "Sponsored"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
