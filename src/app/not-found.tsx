import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const NotFound = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<Typography variant="h4" component="h2" gutterBottom>
				404 - Page Not Found
			</Typography>
			<Typography variant="body1" color="text.secondary">
				The page you are looking for could not be found.
			</Typography>
			<Button sx={{ my: 3 }} variant="contained" color="primary" component={Link} href="/">
				Go to Homepage
			</Button>
		</Box>
	);
};

export default NotFound;
