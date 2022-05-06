/*
  Warnings:

  - Added the required column `Address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FatherName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "FatherName" TEXT NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
