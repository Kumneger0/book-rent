'use client';
import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { EarningsSummaryChartProps } from '@/types';

const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const lastSixMontes = [2000, 5500, 2000, 8500, 1500, 5000];
const samePeriodLastYear = [1500, 3500, 2500, 7000, 1000, 4500];

export const EarningsSummaryChart = ({
	lastSixMontes,
	monthes,
	samePeriodLastYear
}: EarningsSummaryChartProps) => {
	return (
		<Box sx={{ flexGrow: 1, width: '100%', marginTop: '10px' }}>
			<Paper
				sx={{
					p: 2,
					borderRadius: '15px',
					boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.1)',
					backgroundColor: 'white',
					width: '100%'
				}}
			>
				<Typography variant="h6" gutterBottom>
					Earning Summary
				</Typography>
				<Typography variant="subtitle2" gutterBottom></Typography>

				<LineChart
					xAxis={[
						{
							id: 'Years',
							data: monthes,
							scaleType: 'point'
						}
					]}
					series={[
						{
							id: 'lastSixMontes',
							label: 'Last 6 months',
							data: lastSixMontes,
							stack: 'total',
							area: true,
							showMark: false
						},
						{
							id: 'samePeriodLastYear',
							label: 'Same Period Last Year',
							data: samePeriodLastYear,
							stack: 'total',
							area: true,
							showMark: false
						}
					]}
					sx={{ width: '100%' }}
					height={300}
				/>
			</Paper>
		</Box>
	);
};
