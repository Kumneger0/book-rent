import DashboardContent from "@/components/dashboardContent";
import { TableOwner as OwnerLiveBookStatus } from "@/components/ownerLiveBookStatus";
import SharedHeader from "@/components/sharedHead";
import {
  combineEachUserMontheyIncome,
  fillerSixMonthsChartData,
  getBooks,
  getIncome,
  getTotalIncome,
  verify,
} from "@/lib/utils";
import { EarningsSummaryChartProps } from "@/types";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const token = cookies().get("token")!;
  const user = await verify<User>(token.value)!;

  const bookName = searchParams?.bookName;
  const status = searchParams?.status;

  const books = (
    await getBooks({
      email: user?.email ?? "",
      filterBy: {
        bookName,
        status,
      },
    })
  )?.map((book) => ({
    ...book,
    status: book.approved
      ? (book.status as "rented" | "free" | "waiting approval")
      : "waiting approval",
  }));

  const income = await getIncome(user.id);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const thisMonthIncome = income.filter(
    ({ year, month }) => year === currentYear && month === currentMonth
  );

  const thisMonthIncomeTotal =
    thisMonthIncome.reduce((total, { income }) => total + income, 0) ?? 0;

  const pastMonthIncome = income.filter(
    ({ year, month }) => year === currentYear && month === currentMonth - 1
  );

  const pastMonthIncomeTotal =
    pastMonthIncome.reduce((total, { income }) => total + income, 0) ?? 0;

  const incomeData = [
    {
      name: "This Month" as const,
      income: thisMonthIncomeTotal,
    },
    {
      name: "Last Month" as const,
      income: pastMonthIncomeTotal,
    },
  ];

  const chartData = fillerSixMonthsChartData(income);

  return (
    <>
      <SharedHeader>Owner/Dashboard</SharedHeader>
      <DashboardContent
        earningsSummaryChartProps={chartData}
        income={incomeData}
      >
        <Box>
          <h3>Live Book Status</h3>
          <OwnerLiveBookStatus data={books ?? []} />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
