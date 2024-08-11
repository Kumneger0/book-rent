-- CreateTable
CREATE TABLE "monthly_incomes" (
    "id" SERIAL NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" SMALLINT NOT NULL,
    "income" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_incomes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monthly_incomes" ADD CONSTRAINT "monthly_incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
