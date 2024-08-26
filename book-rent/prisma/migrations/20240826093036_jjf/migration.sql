/*
  Warnings:

  - You are about to drop the column `userId` on the `Permission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "userId";
