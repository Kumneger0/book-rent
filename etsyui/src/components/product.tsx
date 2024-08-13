import { Gift, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
const mockProducts = [
	{
		name: 'Gaming Laptop',
		description: 'High-performance laptop designed for gamers.',
		price: 1200,
		category: 'Electronics',
		image:
			'https://img.freepik.com/free-photo/3d-workstation-with-computer-peripheral-devices_23-2150714209.jpg?t=st=1723451463~exp=1723455063~hmac=a8d94a19af791775f0f3a6e70ee826fe35ba2571fe6879fd926747819ac7bd6a&w=740'
	},
	{
		name: 'Smartphone',
		description: 'Latest smartphone with advanced camera features.',
		price: 800,
		category: 'Electronics',
		image:
			'https://www.shutterstock.com/shutterstock/photos/2377010249/display_1500/stock-photo-sigulda-latvia-october-box-of-the-iphone-pro-on-on-a-white-background-gift-with-a-2377010249.jpg'
	},
	{
		name: 'Running Shoes',
		description: 'Lightweight shoes designed for comfort and speed.',
		price: 100,
		category: 'Sports',
		image:
			'https://img.freepik.com/free-vector/pair-leather-sports-shoes-wood-background_1284-17526.jpg?t=st=1723451787~exp=1723455387~hmac=a4dbce0bbdfc48d08e18e1a30209c3ed007738792c4af5432530690e876eef7e&w=826'
	},
	{
		name: 'Yoga Mat',
		description: 'Durable yoga mat for daily practice.',
		price: 40,
		category: 'Fitness',
		image:
			'https://img.freepik.com/free-vector/yoga-mat-bottle-water-3d-vector-illustration-gym-equipment-fitness-training-cartoon-style-isolated-white-background-sport-hobby-workout-concept_778687-1216.jpg?t=st=1723451880~exp=1723455480~hmac=5e0397d742f56e9790275147d9167f2916033ff825f40990fe39c0383fedfe60&w=740'
	},
	{
		name: 'Coffee Maker',
		description: 'Automatic coffee maker for barista-quality coffee at home.',
		price: 200,
		category: 'Kitchen Appliances',
		image:
			'https://img.freepik.com/free-photo/hands-installing-filter-into-coffee-maker_23-2147834508.jpg?t=st=1723451952~exp=1723455552~hmac=a95cd186f92985834729a3c098d5fda9ff1b835605cd5a6313252b880b6ca6c9&w=740'
	},
	{
		name: 'Wireless Headphones',
		description: 'Comfortable headphones with noise-cancelling technology.',
		price: 300,
		category: 'Electronics',
		image:
			'https://img.freepik.com/free-vector/stereo-headphones-realistic-design-concept-set-similar-wireless-audio-equipment-isolated-vector-illustration_1284-81645.jpg?t=st=1723452292~exp=1723455892~hmac=593e35b7387605368b9ea91cc74d71841b3d511682fcf81f884775108dcd987b&w=996'
	}
];

export const products = Array.from({ length: 100 }, (_, index) => ({
	...mockProducts.sort((a, b) =>
		index % 2 == 0 ? a.price - b.price : a.name.localeCompare(b.name)
	)[index % mockProducts.length]
}));

import { Box, Button, Divider, Grid, Typography } from '@mui/material';

function Product() {
	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '1380px',
				my: 0.5,
				py: 0.25,
				gap: 2.5,
				mx: 'auto'
			}}
			className="pr_container"
		>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
				className="pr_main"
			>
				<Typography
					sx={{
						display: 'flex',
						gap: 0.25,
						fontWeight: 'bold',
						fontSize: '1.5rem',
						color: 'black'
					}}
					className="pr_title"
				>
					Etsy's Pick
				</Typography>
				<Box
					sx={{
						display: 'flex',
						gap: 0.25,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					className="pr_see-more"
				>
					<Box sx={{ width: 'fit-content' }} className="pr_button-wrapper">
						<Button
							variant="outlined"
							sx={{
								display: 'flex',
								gap: 0.25,
								px: 0.75,
								py: 0.25,
								borderRadius: '1.5rem',
								border: '2px solid black',
								textTransform: 'none',
								fontWeight: 'medium',
								color: 'black'
							}}
							className="pr_button"
						>
							<span>See More</span>
						</Button>
					</Box>
				</Box>
			</Box>

			<Grid
				container
				spacing={2.5}
				sx={{ mt: 0.5, width: '100%', mx: 'auto' }}
				className="pr_grid pr_grid-1"
			>
				{mockProducts.map((data) => (
					<Grid
						item
						xs={6}
						md={3}
						lg={2}
						key={data.name}
						sx={{ width: '100%' }}
						className="pr_product-card"
					>
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/page2'}>
							<Box sx={{ width: '100%' }} className="pr_image-wrapper">
								<img
									src={data.image}
									alt={data.name}
									style={{
										width: '100%',
										height: 'auto',
										objectFit: 'cover',
										objectPosition: 'center',
										aspectRatio: '1 / 1'
									}}
									className="pr_image"
								/>
							</Box>
							<Box>
								<Typography
									sx={{
										display: 'flex',
										gap: 0.25,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap'
									}}
									className="pr_description"
								>
									{data.description}
								</Typography>
								<Box sx={{ display: 'flex', gap: 0.5 }} className="pr_rating">
									<Star />
									<Star />
									<Star />
									<Star />
									<Star />
									<Typography sx={{ fontSize: '0.8em' }} className="pr_rating-count">
										(193)
									</Typography>
								</Box>
								<Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} className="pr_price">
									USD: {data.price}
								</Typography>
								<Typography>{data.name}</Typography>
							</Box>
						</Link>
					</Grid>
				))}
			</Grid>

			<Divider sx={{ width: '100%', my: 1.25, borderColor: '#d1d5db' }} className="pr_divider" />

			<Grid
				container
				spacing={2.5}
				sx={{ mt: 0.5, width: '100%', mx: 'auto' }}
				className="pr_grid pr_grid-2"
			>
				{products.map((data) => (
					<Grid
						item
						xs={6}
						md={3}
						lg={3}
						key={data.name}
						sx={{ width: '100%' }}
						className="pr_product-card"
					>
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/page2'}>
							<Box sx={{ width: '100%' }} className="pr_image-wrapper">
								<img
									src={data.image}
									alt={data.name}
									style={{
										width: '100%',
										height: 'auto',
										objectFit: 'cover',
										objectPosition: 'center',
										aspectRatio: '1 / 1'
									}}
									className="pr_image"
								/>
							</Box>
							<Box>
								<Typography
									sx={{
										display: 'flex',
										gap: 0.25,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap'
									}}
									className="pr_description"
								>
									{data.name}
								</Typography>
								<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }} className="pr_rating">
									<Gift style={{ width: 15, height: 15 }} />
									<Typography sx={{ fontSize: '0.8em' }}>Ad by Etsy Seller</Typography>
								</Box>
								<Typography sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} className="pr_price">
									USD: {data.price}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										border: '2px solid black',
										borderRadius: '30px',
										width: 'fit-content',
										padding: '5px 25px',
										mt: 0.5,
										alignItems: 'center'
									}}
									className="pr_button-wrapper"
								>
									<Plus style={{ width: 20, height: 20 }} />
									<Typography sx={{ ml: 1 }}>Add To Cart</Typography>
								</Box>
							</Box>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default Product;
