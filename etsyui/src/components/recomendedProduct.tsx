import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Typography
} from '@mui/material';

const productsFromShop = [
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 1,
		title: '14k London Blue Topaz Necklace',
		price: 201.95,
		originalPrice: 269.27,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '14k Blue Topaz Halo Engagement Ring',
		price: 202.95,
		originalPrice: 270.6,
		discount: '25% off',
		shipping: 'FREE shipping',
		imgSrc: 'https://via.placeholder.com/150'
	}
];

const ProductCard = ({ product }: { product: (typeof productsFromShop)[number] }) => (
	<Card sx={{ maxWidth: 200 }}>
		<CardMedia component="img" height="140" image={product.imgSrc} alt={product.title} />
		<CardContent>
			<Typography variant="body2" color="textSecondary">
				{product.title}
			</Typography>
			<Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
				USD {product.originalPrice.toFixed(2)}
			</Typography>
			<Typography variant="h6" color="textPrimary">
				USD {product.price.toFixed(2)}
			</Typography>
			<Typography variant="body2" color="green">
				{product.discount}
			</Typography>
			<Typography variant="body2" color="textPrimary">
				{product.shipping}
			</Typography>
		</CardContent>
	</Card>
);

const MoreFromShop = () => (
	<Box sx={{ width: '100%', maxWidth: '1380px', margin: 'auto', padding: 2, marginTop: 4 }}>
		<Typography variant="h6">More from this shop</Typography>
		<Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'space-around' }}>
			{productsFromShop.map((product) => (
				<Grid item key={product.id}>
					<ProductCard product={product} />
				</Grid>
			))}
		</Grid>
	</Box>
);

const YouMayAlsoLike = () => (
	<Box
		sx={{
			width: '100%',
			maxWidth: '1380px',
			margin: 'auto',
			padding: 2,
			marginTop: 4
		}}
	>
		<Divider />
		<Typography variant="h6" sx={{ marginTop: 2 }}>
			You may also like
		</Typography>
		<Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'space-around' }}>
			{productsFromShop.map((product) => (
				<Grid item key={product.id}>
					<ProductCard product={product} />
				</Grid>
			))}
		</Grid>
		<Box display="flex" justifyContent="center" marginTop={2}>
			<Button variant="outlined">See more</Button>
		</Box>
	</Box>
);

const RecommendedProducts = () => {
	return (
		<div>
			<MoreFromShop />
			<YouMayAlsoLike />
		</div>
	);
};

export default RecommendedProducts;
