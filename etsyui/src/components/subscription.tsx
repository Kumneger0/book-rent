import { Box, Button, TextField, Typography } from '@mui/material';

function SubscriptionSection() {
	return (
		<>
			<Box sx={{ bgcolor: '#e0f7fa', p: 3 }}>
				<Typography variant="h6" align="center" gutterBottom>
					Yes! Send me exclusive offers, unique gift ideas, and personalized tips for shopping and
					selling on Etsy.
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						mt: 2
					}}
				>
					<TextField
						variant="outlined"
						placeholder="Enter your email"
						sx={{
							bgcolor: 'white',
							border: '1px solid black',
							width: '30%',
							borderRadius: '50px',
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderRadius: '50px'
								}
							}
						}}
					/>
					<Button
						variant="contained"
						color="error"
						sx={{
							borderRadius: '50px',
							ml: -5,
							py: 2,
							px: 3,
							textTransform: 'none',
							borderTop: '2px solid black',
							borderBottom: '2px solid black',
							color: 'black',
							bgcolor: 'white',
							'&:hover': {
								bgcolor: 'black',
								color: 'white'
							}
						}}
					>
						Subscribe
					</Button>
				</Box>
			</Box>
			<Box sx={{ bgcolor: '#1565c0', py: 5 }}>
				<Typography
					variant="body2"
					align="center"
					color="white"
					sx={{
						borderBottom: '2px dashed white',
						width: 'fit-content',
						mx: 'auto',
						fontWeight: 'medium'
					}}
				>
					Etsy is powered by 100% renewable electricity.
				</Typography>
			</Box>
		</>
	);
}

export default SubscriptionSection;
