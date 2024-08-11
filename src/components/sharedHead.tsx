import { Typography } from '@mui/material';
import React from 'react';

function SharedHeader({ children }: { children: React.ReactNode }) {
	return (
		<Typography
			sx={{
				p: 2,
				color: 'black',
				borderRadius: '20px',
				boxShadow: '2px 2px 2px 2px white',
				backgroundColor: 'white',
				marginBottom: '10px',
				marginTop: '-15px',
				fontSize: '24px'
			}}
			gutterBottom
		>
			{children}
		</Typography>
	);
}

export default SharedHeader;
