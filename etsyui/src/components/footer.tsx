import { Box, Typography, Button, Grid, Link, IconButton } from '@mui/material';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

function Footer() {
	return (
		<>
			<Box sx={{ bgcolor: '#0d47a1', color: 'white', p: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Box sx={{ textAlign: 'center', mb: 3 }}>
							<Box sx={{ bgcolor: 'orange', p: 2, display: 'inline-block', borderRadius: '8px' }}>
								<Typography variant="h6">Etsy</Typography>
							</Box>
							<Button
								variant="contained"
								sx={{
									mt: 2,
									borderRadius: '20px',
									textTransform: 'none',
									bgcolor: '#1e88e5',
									'&:hover': {
										bgcolor: '#1565c0'
									}
								}}
							>
								Download the Etsy App
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} md={2}>
						<Typography variant="h6" gutterBottom>
							Shop
						</Typography>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Gift cards
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy Registry
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Sitemap
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy blog
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy United Kingdom
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy Germany
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy Canada
						</Link>
					</Grid>
					<Grid item xs={12} md={2}>
						<Typography variant="h6" gutterBottom>
							Sell
						</Typography>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Sell on Etsy
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Teams
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Forums
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Affiliates & Creators
						</Link>
					</Grid>
					<Grid item xs={12} md={2}>
						<Typography variant="h6" gutterBottom>
							About
						</Typography>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Etsy, Inc.
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Policies
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Investors
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Careers
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Press
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Impact
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Legal imprint
						</Link>
					</Grid>
					<Grid item xs={12} md={2}>
						<Typography variant="h6" gutterBottom>
							Help
						</Typography>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Help Center
						</Link>
						<Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none', mb: 1 }}>
							Privacy settings
						</Link>
						<Box sx={{ mt: 2 }}>
							<IconButton color="inherit">
								<Instagram />
							</IconButton>
							<IconButton color="inherit">
								<Facebook />
							</IconButton>
							<IconButton color="inherit">
								<Twitter />
							</IconButton>
							<IconButton color="inherit">
								<Youtube />
							</IconButton>
							<IconButton color="inherit"></IconButton>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box
				sx={{
					bgcolor: '#212121',
					color: 'white',
					py: 2,

					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Typography variant="body2" align="center" sx={{}}>
					🌍 Ethiopia | English (US) | $ (USD)
				</Typography>
				<Typography variant="body2" align="center">
					© 2024 Etsy, Inc. Terms of Use | Privacy | Interest-based ads | Local Shops | Regions
				</Typography>
			</Box>
		</>
	);
}

export default Footer;
