-- DropForeignKey
ALTER TABLE "monthly_incomes" DROP CONSTRAINT "monthly_incomes_userId_fkey";

-- AddForeignKey
ALTER TABLE "monthly_incomes" ADD CONSTRAINT "monthly_incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
