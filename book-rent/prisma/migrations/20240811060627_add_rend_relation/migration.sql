-- AlterTable
ALTER TABLE "books" ADD COLUMN     "rentedByid" INTEGER;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_rentedByid_fkey" FOREIGN KEY ("rentedByid") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
