/*
  Warnings:

  - Added the required column `role` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "role" "Role" NOT NULL;
