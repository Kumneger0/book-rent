import { Box, Button, Typography } from '@mui/material';
import React from 'react';

function Footer() {
	return (
		<Box
			sx={{
				background: '#CCEBFF',
				width: '100vw',
				height: '200px'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					width: '80%',
					mx: 'auto',
					maxWidth: '1380px',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					height: '100%',
					mt: '10px'
				}}
			>
				<Typography sx={{ fontWeight: 'semibold', fontSize: '20px' }}>
					Yes! Send me exclusive offers, unique gift ideas, and personalized tips for shopping and
					selling on Etsy.
				</Typography>
				<Box sx={{ width: '50%', display: 'flex' }}>
					<input
						style={{
							width: '100%',
							border: '2px solid black',
							padding: '10px',
							borderRadius: '30px'
						}}
					/>
					<Button variant="contained" sx={{ background: 'black' }}>
						subscribe
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Footer;
