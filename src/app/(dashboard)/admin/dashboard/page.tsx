import React from "react";
import DashboardContent from "@/components/dashboardContent";
import Example from "@/components/liveBookStatusTable";
import { Box } from "@mui/material";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";
import {
  combineEachUserMontheyIncome,
  fillerSixMonthsChartData,
  getTotalIncome,
} from "@/lib/utils";

async function Dashboard() {
  const books = await prisma.book.findMany({
    include: {
      owner: {
        select: {
          fullName: true,
        },
      },
    },
  });

  const liveBookStatus = books.map((book) => {
    return {
      No: book.id.toString(),
      BookNo: book.bookNo,
      Owner: book.owner.fullName,
      status: book.status,
      price: book.price.toString(),
    } satisfies {
      No: string;
      BookNo: string;
      Owner: string;
      status: "rented" | "free";
      price: string;
    };
  });

  const totalIncome = await getTotalIncome();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const thisMonthIncome = totalIncome.filter(
    ({ year, month }) => year === currentYear && month === currentMonth
  );

  const thisMonthIncomeTotal =
    thisMonthIncome.reduce((total, { income }) => total + income, 0) ?? 0;

  const pastMonthIncome = totalIncome.filter(
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

  const combinedIncome = await combineEachUserMontheyIncome(totalIncome);
  const chartData = fillerSixMonthsChartData(combinedIncome);

  return (
    <>
      <SharedHeader>Admin/Dashboard</SharedHeader>
      <DashboardContent
        earningsSummaryChartProps={chartData}
        income={incomeData}
      >
        <Box>
          <h3>Live Book Status</h3>
          <Example data={liveBookStatus} />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
