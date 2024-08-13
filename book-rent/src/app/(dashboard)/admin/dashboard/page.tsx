import React from 'react';
import DashboardContent from '@/components/dashboardContent';
import Example from '@/components/liveBookStatusTable';
import { Box } from '@mui/material';
import SharedHeader from '@/components/sharedHead';
import { prisma } from '@/db';
import {
	combineEachUserMontheyIncome,
	fillerSixMonthsChartData,
	getBOOKpieChart,
	getTotalIncome
} from '@/lib/utils';
import { $Enums, Book } from '@prisma/client';

async function Dashboard({ searchParams }: { searchParams: Record<string, string> }) {
	const owner = searchParams.Owner;
	const price = Number(searchParams.price);
	const bookNo = searchParams.BookNo;

	const books = await prisma.book.findMany({
		where: {
			isApproved: true,
			owner: {
				fullName: {
					contains: owner ?? ' ',
					mode: 'insensitive'
				}
			},
			price: {
				lte: isNaN(price) ? 10000000 : price
			},
			bookNo: {
				contains: bookNo,
				mode: 'insensitive'
			}
		},
		include: {
			owner: {
				select: {
					fullName: true
				}
			}
		}
	});

	const liveBookStatus = books.map((book) => {
		return {
			No: book.id.toString(),
			BookNo: book.bookNo,
			Owner: book.owner.fullName,
			status: book.status,
			price: book.price.toString()
		} satisfies {
			No: string;
			BookNo: string;
			Owner: string;
			status: 'rented' | 'free';
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
			name: 'This Month' as const,
			income: thisMonthIncomeTotal
		},
		{
			name: 'Last Month' as const,
			income: pastMonthIncomeTotal
		}
	];

	const combinedIncome = await combineEachUserMontheyIncome(totalIncome);
	const chartData = fillerSixMonthsChartData(combinedIncome);

	const { data, numberOfBooksByCategory } = getBOOKpieChart(books);

	return (
		<>
			<SharedHeader>Admin/Dashboard</SharedHeader>
			<DashboardContent
				pieChartData={data}
				numberOfBooksByCategory={numberOfBooksByCategory}
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
