import { SlidersHorizontal, X } from 'lucide-react';
import { Box, Divider, IconButton, Typography, Select, MenuItem, Button } from '@mui/material';

function FilterArea() {
	return (
		<Box sx={{ maxWidth: '1380px', mx: 'auto', py: 1, my: 2 }}>
			<Divider sx={{ borderBottomWidth: 2, borderColor: 'gray.300', my: 5 }} />
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					sx={{
						display: 'flex',
						p: 1,
						borderRadius: 3,
						textTransform: 'none',
						fontWeight: 'medium',
						color: 'black',
						border: '2px solid black'
					}}
				>
					<SlidersHorizontal />
					All Filters
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<Typography>11 Results with Ads</Typography>
					<Select defaultValue="newest" sx={{ borderRadius: 1 }}>
						<MenuItem value="newest">
							<Typography sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
								Sort by: Newest
							</Typography>
						</MenuItem>
					</Select>
				</Box>
			</Box>
			<Box sx={{ my: 2 }}>
				<Button
					variant="contained"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
						px: 4,
						py: 2,
						borderRadius: 2,
						backgroundColor: '#E0E0E0',
						color: 'black',
						textTransform: 'none',
						fontWeight: 'medium',
						'&:hover': { backgroundColor: '#D0D0D0' }
					}}
				>
					Etsy's Pick
					<IconButton sx={{ p: 0, color: 'black' }}>
						<X />
					</IconButton>
				</Button>
			</Box>
		</Box>
	);
}

export default FilterArea;
