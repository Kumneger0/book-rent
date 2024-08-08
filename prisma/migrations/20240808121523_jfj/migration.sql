-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('rented', 'free');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('fiction', 'selfHelp', 'business');

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "bookNo" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "bookName" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'free',
    "category" "Category" NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_bookNo_key" ON "books"("bookNo");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
