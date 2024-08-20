/*
  Warnings:

  - A unique constraint covering the columns `[bookName]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookName,author]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_bookName_key" ON "books"("bookName");

-- CreateIndex
CREATE UNIQUE INDEX "books_bookName_author_key" ON "books"("bookName", "author");
