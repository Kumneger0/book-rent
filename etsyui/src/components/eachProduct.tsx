import React from 'react';
import {
	Box,
	Button,
	Grid,
	Typography,
	IconButton,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Divider,
	Breadcrumbs,
	Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import { BookmarkXIcon } from 'lucide-react';

function ProductPage() {
	return (
		<Box sx={{ p: 4, maxWidth: '1380px', margin: '0 auto' }}>
			<Box sx={{ width: '80%', display: 'flex', justifyContent: 'center', mx: 'auto' }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						Homepage
					</Link>
					<Link underline="hover" color="inherit" href="/jewelry">
						Jewelry
					</Link>
					<Link underline="hover" color="inherit" href="/necklaces">
						Necklaces
					</Link>
					<Typography color="text.primary">Pendant Necklaces</Typography>
				</Breadcrumbs>
			</Box>
			<Grid
				container
				spacing={10}
				sx={{ mt: 2, justifyContent: 'space-around', alignItems: 'center' }}
			>
				<Grid item xs={12} md={6}>
					<IconButton sx={{ mb: 2 }}>
						<ArrowBackIcon />
					</IconButton>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '4px',

							maxHeight: '600px'
						}}
					>
						<Box
							sx={{
								overflow: 'auto',
								maxHeight: '600px',
								'-webkit-overflow-scrolling': 'touch',
								'&::-webkit-scrollbar': {
									display: 'none'
								}
							}}
						>
							{[
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70',
								'https://via.placeholder.com/70'
							].map((src) => (
								<Box key={src}>
									<Box
										sx={{
											borderRadius: 2,
											overflow: 'hidden',
											boxShadow: 1
										}}
									>
										<img
											src={src}
											alt="thumbnail"
											style={{
												width: 'auto',
												height: '100%',
												objectFit: 'cover',
												objectPosition: 'center',
												aspectRatio: 2 / 3
											}}
										/>
									</Box>
								</Box>
							))}
						</Box>
						<Box
							sx={{
								width: '100%',
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: 1,
								mb: 2
							}}
						>
							<img
								src="https://via.placeholder.com/400x400"
								alt="product"
								style={{ width: '100%', height: 'auto' }}
							/>
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box>
						<Typography variant="h4">USD 164.96</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{ textDecoration: 'line-through' }}
						>
							USD 219.95
						</Typography>
						<Typography variant="h6" color="success.main">
							25% off
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Sale ends in 1 day
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Local taxes included (where applicable)
						</Typography>

						<Typography variant="h6" sx={{ mt: 2 }}>
							14k Blue Topaz Pendant Solid Gold Necklace
						</Typography>
						<Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
							HeliosGoldJewelry
							<StarIcon fontSize="small" color="warning" />
							<StarIcon fontSize="small" color="warning" />
							<StarIcon fontSize="small" color="warning" />
							<StarIcon fontSize="small" color="warning" />
							<StarIcon fontSize="small" color="warning" />
						</Typography>

						<Typography variant="body2" sx={{ mb: 2 }}>
							Arrives soon! Get it by Aug 17-24 if you order today
						</Typography>

						<Divider sx={{ my: 2 }} />

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="select-kt-color-label">Gold Kt and Color</InputLabel>
							<Select
								labelId="select-kt-color-label"
								id="select-kt-color"
								label="Gold Kt and Color"
							>
								<MenuItem value={10}>Option 1</MenuItem>
								<MenuItem value={20}>Option 2</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="select-necklace-length-label">Necklace Length</InputLabel>
							<Select
								labelId="select-necklace-length-label"
								id="select-necklace-length"
								label="Necklace Length"
							>
								<MenuItem value={10}>16 inches</MenuItem>
								<MenuItem value={20}>18 inches</MenuItem>
							</Select>
						</FormControl>

						<Button
							fullWidth
							sx={{
								mb: 2,
								borderRadius: '50px',
								py: 2,
								px: 3,
								color: 'white',
								background: 'black',
								'&:hover': {
									background: 'black',
									scale: '103%'
								}
							}}
						>
							Add to cart
						</Button>

						<Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
							Star Seller. This seller consistently earned 5-star reviews, shipped on time, and
							replied quickly to any messages they received.
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ProductPage;
