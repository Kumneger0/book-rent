import { Menu, X, Search, Gift, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, InputBase, Button } from '@mui/material';

const Header = () => {
	const [value, setValue] = useState('');

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: 'white',
				boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
				borderBottom: '2px solid #E0E0E0'
			}}
		>
			<Toolbar
				sx={{
					maxWidth: '1380px',
					width: '100%',
					mx: 'auto',
					mt: '10px',
					flexWrap: {
						md: 'wrap',
						xs: 'nowrap'
					},
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" sx={{ color: 'orange' }}>
					Etsy
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						order: {
							xs: -1,
							md: 'initial'
						}
					}}
				>
					<IconButton sx={{}}>
						<Menu style={{ color: 'black' }} />
					</IconButton>
					<Typography
						variant="body1"
						sx={{
							display: { xs: 'none', md: 'block' },
							cursor: 'pointer',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1,
							color: 'black'
						}}
					>
						Categories
					</Typography>
				</Box>

				<Box sx={{ position: 'relative', flexGrow: 1 }}>
					<InputBase
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
						placeholder="Search..."
						sx={{
							width: '100%',
							px: 3,
							py: 1,
							borderRadius: 4,
							border: '2px solid black'
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							right: 10,
							top: '50%',
							transform: 'translateY(-50%)',
							display: 'flex',
							gap: 1
						}}
					>
						<IconButton
							onClick={() => setValue('')}
							sx={{
								display: value ? 'block' : 'none',
								backgroundColor: 'inherit',
								'&:hover': { backgroundColor: '#E0E0E0' },
								borderRadius: 1
							}}
						>
							<X />
						</IconButton>
						<IconButton
							sx={{
								backgroundColor: 'orange',
								color: 'white',
								borderRadius: '50%',
								p: 1
							}}
						>
							<Search />
						</IconButton>
					</Box>
				</Box>

				<Button
					variant="text"
					sx={{
						fontWeight: 'medium',
						color: 'black',
						textTransform: 'none',
						'&:hover': { backgroundColor: '#E0E0E0' },
						px: 2,
						py: 1,
						borderRadius: 1,
						display: {
							xs: 'none',
							md: 'block'
						}
					}}
				>
					Sign In
				</Button>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<IconButton
						sx={{
							color: 'black',
							borderRadius: '50%',
							p: 1,
							'&:hover': { backgroundColor: '#E0E0E0' }
						}}
					>
						<Heart />
					</IconButton>
					<IconButton
						sx={{
							color: 'black',
							borderRadius: '50%',
							p: 1,
							'&:hover': { backgroundColor: '#E0E0E0' }
						}}
					>
						<Gift />
					</IconButton>
					<IconButton
						sx={{
							color: 'black',
							borderRadius: '50%',
							p: 1,
							'&:hover': { backgroundColor: '#E0E0E0' }
						}}
					>
						<ShoppingCart />
					</IconButton>
				</Box>

				<Box
					sx={{
						display: { xs: 'none', md: 'flex' },
						justifyContent: 'space-around',
						alignItems: 'center',
						gap: 1,
						width: '66%',
						mx: 'auto',
						mt: -1
					}}
				>
					<Button
						sx={{
							fontWeight: 'medium',
							color: 'black',
							textTransform: 'none',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1
						}}
					>
						<Gift style={{ color: 'black', width: 20, height: 20, padding: '2px' }} /> Gift Mode
					</Button>
					<Button
						sx={{
							fontWeight: 'medium',
							color: 'black',
							textTransform: 'none',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1
						}}
					>
						Back-To-School Savings
					</Button>
					<Button
						sx={{
							fontWeight: 'medium',
							color: 'black',
							textTransform: 'none',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1
						}}
					>
						Home Favorites
					</Button>
					<Button
						sx={{
							fontWeight: 'medium',
							color: 'black',
							textTransform: 'none',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1
						}}
					>
						Fashion Finds
					</Button>
					<Button
						sx={{
							fontWeight: 'medium',
							color: 'black',
							textTransform: 'none',
							'&:hover': { backgroundColor: '#E0E0E0' },
							px: 2,
							py: 1,
							borderRadius: 1
						}}
					>
						Registry
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
