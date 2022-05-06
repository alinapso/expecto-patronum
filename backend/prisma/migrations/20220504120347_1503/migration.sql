/*
  Warnings:

  - You are about to drop the column `FatherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `FatherName` to the `Sponsored` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsored" ADD COLUMN     "FatherName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "FatherName",
DROP COLUMN "password",
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "Address" DROP NOT NULL;
