import { Heart, Star } from 'lucide-react';
import { Box, Typography, IconButton, Button } from '@mui/material';

function SubHeader() {
	return (
		<Box
			sx={{
				maxWidth: '1380px',
				mx: 'auto',
				my: 1,
				py: 1,
				display: 'flex',
				gap: 3
			}}
		>
			<Box
				sx={{
					width: '300px',
					minWidth: '200px',
					position: 'relative'
				}}
			>
				<img
					src="https://img.freepik.com/free-photo/top-view-different-pencils-arrangement_23-2148541496.jpg?t=st=1723447027~exp=1723450627~hmac=cbca6bf75dfb3675a54646dd4bd55efc9aa956e67664e82e25ebfa46e91ffbd7&w=1380"
					alt="Top view of pencils"
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				/>
				<IconButton
					sx={{
						position: 'absolute',
						top: 1,
						right: 1,
						color: 'black',
						borderRadius: '50%',
						'&:hover': { backgroundColor: '#E0E0E0' }
					}}
				>
					<Heart />
				</IconButton>
			</Box>

			<Box
				sx={{
					overflow: 'hidden', // Ensures no overflow in the container
					display: 'block', // Ensures the Box is treated as a block element
					maxWidth: '100%' // Ensures the Box does not exceed the viewport width
				}}
			>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<Typography>Beautiful</Typography>
					<Box sx={{ display: 'flex', gap: 0.5 }}>
						<Star />
						<Star />
						<Star />
						<Star />
						<Star />
					</Box>
				</Box>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '1.125rem',
						maxWidth: '700px',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						[`@media (min-width: 768px)`]: {
							whiteSpace: 'normal',
							textOverflow: 'clip'
						},
						[`@media (max-width: 768px)`]: {
							maxWidth: '100%'
						}
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque dolore rerum consequatur,
					laborum exercitationem recusandae sequi impedit odit voluptatum dicta asperiores sunt quo!
				</Typography>
				<Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}>USD 19.00</Typography>
				<Typography
					sx={{
						backgroundColor: 'green',
						color: 'white',
						width: 'fit-content',
						borderRadius: 1,
						textTransform: 'none',
						fontWeight: 'medium',
						p: 0
					}}
				>
					Free Shipping
				</Typography>
				<Box sx={{ my: 2 }}>
					<Button
						variant="outlined"
						sx={{
							borderColor: 'black',
							color: 'black',
							borderRadius: 2,
							px: 3,
							py: 1,
							mt: 2,
							textTransform: 'none',
							fontWeight: 'medium'
						}}
					>
						Shop This Item
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default SubHeader;
