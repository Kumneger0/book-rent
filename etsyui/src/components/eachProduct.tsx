import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import {
	Typography,
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	FormControl
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import HeightIcon from '@mui/icons-material/Height';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BrushIcon from '@mui/icons-material/Brush';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Breadcrumbs, Button, IconButton, InputLabel, Link, MenuItem, Select } from '@mui/material';
import { products } from './product';

const productImages = products.slice(0, 10).map(({ image }) => image);
const randomIndex = Math.floor(Math.random() * products.length);
const singleImage = products[randomIndex].image;
import { Avatar, ListItemAvatar, Rating, Pagination, Checkbox } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import RecommendedProducts from './recomendedProduct';

function ProductPage() {
	const [image, setImage] = useState(singleImage);
	return (
		<Box
			sx={{
				p: 4,
				maxWidth: '1380px',
				width: '90%',
				margin: '0 auto'
			}}
		>
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
				sx={{ justifyContent: 'space-around', alignItems: 'center', mt: -10 }}
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
							className="embla"
							sx={{
								overflow: 'auto',
								maxHeight: '600px',
								'-webkit-overflow-scrolling': 'touch',
								'&::-webkit-scrollbar': {
									display: 'none'
								}
							}}
						>
							<Box className="embla__container">
								{productImages.map((src) => (
									<Box key={src} className="embla__slide">
										<Box
											onClick={() => setImage(src)}
											sx={{
												borderRadius: 2,
												overflow: 'hidden',
												boxShadow: 1,
												'&:hover': {
													opacity: '0.7'
												}
											}}
										>
											<img
												src={src}
												alt="thumbnail"
												style={{
													width: '200px',
													height: '200px',
													objectFit: 'cover',
													objectPosition: 'center',
													aspectRatio: 2 / 3
												}}
											/>
										</Box>
									</Box>
								))}
							</Box>
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
								src={image}
								alt="product"
								style={{
									width: '100%',
									height: 'auto',
									aspectRatio: '1/1',
									objectFit: 'cover',
									objectPosition: 'center'
								}}
							/>
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box>
						<Typography
							sx={{
								color: 'green'
							}}
							variant="h4"
						>
							USD 164.96
						</Typography>
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

						<Typography sx={{ mt: 2 }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, earum dignissimos.
							Eveniet qui quasi modi. Repellat dolorem corrupti molestias a.
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
							<InputLabel id="select-kt-color-label">Select an option</InputLabel>
							<Select
								labelId="select-kt-color-label"
								id="select-kt-color"
								label="Gold Kt and Color"
								sx={{
									height: '50px'
								}}
							>
								<MenuItem value={10}>Option 1</MenuItem>
								<MenuItem value={20}>Option 2</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="select-necklace-length-label">Select an option</InputLabel>
							<Select
								labelId="select-necklace-length-label"
								id="select-necklace-length"
								label="Necklace Length"
								sx={{
									height: '50px'
								}}
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mt: 5,
					flexWrap: 'wrap',
					width: '100%',
					gap: '20px'
				}}
			>
				<Box
					sx={{
						width: {
							xs: '100%',
							md: '50%'
						}
					}}
				>
					<ItemReview />
				</Box>
				<Box
					sx={{
						order: {
							xs: -1,
							md: 2
						}
					}}
				>
					<ItemDetails />
				</Box>
			</Box>
			<RecommendedProducts />
		</Box>
	);
}

export default ProductPage;

const ItemDetails = () => {
	return (
		<Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
			<Typography variant="h6" gutterBottom>
				Item details
			</Typography>
			<Divider />
			<Box sx={{ paddingY: 2 }}>
				<Typography variant="subtitle1" gutterBottom>
					Highlights
				</Typography>
				<List>
					<ListItem>
						<ListItemIcon>
							<StarIcon />
						</ListItemIcon>
						<ListItemText primary="Designed by HeliosGoldJewelry" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<DiamondIcon />
						</ListItemIcon>
						<ListItemText primary="Materials: Gold, Rose gold, White gold" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<BrushIcon />
						</ListItemIcon>
						<ListItemText primary="Gemstone: Topaz" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ColorLensIcon />
						</ListItemIcon>
						<ListItemText primary="Style: Minimalist" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<HeightIcon />
						</ListItemIcon>
						<ListItemText primary="Pendant width: 7.90 Millimeters; Pendant height: 9.90 Millimeters" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ReceiptIcon />
						</ListItemIcon>
						<ListItemText primary="Made to Order" />
					</ListItem>
				</List>
			</Box>
			<Divider />
			<Box sx={{ paddingY: 2 }}>
				<Typography variant="subtitle1" gutterBottom>
					About this item
				</Typography>
				<Typography variant="body2">
					Your London Blue Topaz Necklace is stylish, dainty and pretty ideal for everyday use.
					Details of solid gold handmade December Birthstone Necklace are very eye-catching. It is a
					great gift for your loved ones. This necklace will be a timeless addition to your fine
					jewelry collection.
				</Typography>
			</Box>
		</Box>
	);
};

const reviews = [
	{
		id: 1,
		rating: 5,
		text: 'This is my second necklace got the 14 inch, and have the 19 inch. Pretty, elegant nice addition to my emerald ring, and emerald earrings',
		purchasedItem:
			'14k Gold Emerald Necklace, Dainty Emerald Necklace Women, Green Emerald Pendant, May Birthstone Necklace',
		customer: 'Kimberly Bonvenuto',
		date: 'Aug 10, 2024',
		avatarColor: 'lightblue',
		recommends: false
	},
	{
		id: 2,
		rating: 5,
		text: "This ring is my birthstone and will wear it with a sapphire and citrine (husband's) to celebrate our 41st wedding anniversary in September.",
		purchasedItem: '14k Solid Gold Ruby Engagement Ring, Oval Cut Five Stones Ruby Engagement Ring',
		customer: 'Carol Little',
		date: 'Aug 9, 2024',
		avatarColor: 'lightcoral',
		recommends: true
	},
	{
		id: 3,
		rating: 4,
		text: 'NAAAA AAA AAA AAA AAA',
		purchasedItem: '14k Gold Lightning Bolt Necklace, Lightning Bolt Pendant, 18k Diamond Necklace',
		customer: 'Sign in with Apple user',
		date: 'Aug 6, 2024',
		avatarColor: 'lightorange',
		recommends: false
	},
	{
		id: 4,
		rating: 5,
		text: 'The necklace is beautiful. Exactly as I envisioned it and Exactly what I was wanting.',
		purchasedItem:
			'14k Gold Personalized Birthstone Necklace, Custom Birthstone Necklace, 14k Gold',
		customer: 'Cheryl Solles',
		date: 'Aug 2, 2024',
		avatarColor: 'lightpink',
		recommends: false
	}
];

const ItemReview = () => {
	return (
		<Box sx={{ maxWidth: 800, margin: 'auto', padding: 2, width: '100%' }}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h6">
					Other reviews from this shop | <Rating value={5} readOnly />
					<Typography variant="caption">(814)</Typography>
				</Typography>
				<Box display="flex" alignItems="center">
					<FlagIcon sx={{ cursor: 'pointer', marginRight: 2 }} />
					<Typography variant="body2">Sort by: Suggested</Typography>
				</Box>
			</Box>
			<Divider sx={{ my: 2 }} />
			<List
				sx={{
					width: '100%'
				}}
			>
				{reviews.map((review) => (
					<Box
						key={review.id}
						sx={{
							marginBottom: 4,
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap'
						}}
					>
						<ListItem
							alignItems="flex-start"
							sx={{
								width: {
									xs: '100%',
									md: '60%'
								},
								marginLeft: {
									xs: '-50px',
									md: '0'
								}
							}}
						>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: review.avatarColor }}>{review.customer.charAt(0)}</Avatar>
							</ListItemAvatar>
							<ListItemText
								sx={{
									width: '100%'
								}}
								primary={
									<Box display="flex" alignItems="center">
										<Rating value={review.rating} readOnly size="small" />
										<Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
											{review.customer} &bull; {review.date}
										</Typography>
									</Box>
								}
								secondary={
									<React.Fragment>
										<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
											{review.text}
										</Typography>
										<Typography
											variant="caption"
											color="textSecondary"
											sx={{ display: 'block', marginTop: 1 }}
										>
											Purchased item: {review.purchasedItem}
										</Typography>
										{review.recommends && (
											<Typography
												variant="body2"
												color="success.main"
												sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
											>
												<Checkbox checked size="small" disabled /> Recommends this item
											</Typography>
										)}
									</React.Fragment>
								}
							/>
						</ListItem>
						<Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
							<Box>
								<Typography
									sx={{ display: 'flex', justifyContent: 'space-between' }}
									variant="body2"
								>
									<Box>Item quality {review.rating}</Box>
									<span>
										<StarIcon />
									</span>
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{ display: 'flex', justifyContent: 'space-between' }}
									variant="body2"
								>
									<Box> Shipping {review.rating}</Box>
									<span>
										<StarIcon />
									</span>
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{ display: 'flex', justifyContent: 'space-between' }}
									variant="body2"
								>
									<Box>Customer service {review.rating}</Box>
									<span>
										<StarIcon />
									</span>
								</Typography>
							</Box>
						</Box>
						<Divider sx={{ marginTop: 2, width: '100%' }} />
					</Box>
				))}
			</List>
			<Box display="flex" justifyContent="center" marginTop={2}>
				<Pagination count={5} page={1} shape="rounded" />
			</Box>
		</Box>
	);
};
