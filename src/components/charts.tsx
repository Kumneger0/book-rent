'use client';

import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { $Enums } from '@prisma/client';
import * as React from 'react';

export function PieChartWithPaddingAngle({
	booksCategory
}: {
	booksCategory: Record<$Enums.Category, number> | undefined;
}) {
	const data = Object.entries(booksCategory ?? {}).map(([label, value]) => ({
		label,
		value,
		color: label === 'fiction' ? '#006AFF' : label === 'business' ? 'green' : 'red'
	}));

	return (
		<Stack direction="row">
			<PieChart
				series={[
					{
						innerRadius: 60,
						outerRadius: 80,
						data
					}
				]}
				margin={{ right: 5 }}
				width={200}
				height={200}
				legend={{ hidden: true }}
			/>
		</Stack>
	);
}
