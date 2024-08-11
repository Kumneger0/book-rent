-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
