// create Nextjs Page to view list of all available roles

import { getRoles } from '@/lib/utils';
import {
	Box,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	Chip,
	Container,
	Button
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AddIcon from '@mui/icons-material/Add';

export default async function Roles() {
	const roles = await getRoles();
	return (
		<Container maxWidth="md">
			<Box my={4}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h4" component="h1">
						<SecurityIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
						Available Roles
					</Typography>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						href="/admin/roles/create"
					>
						Create New Role
					</Button>
				</Box>
				<Paper elevation={3}>
					<List>
						{roles.map(({ id, name, permissions }) => (
							<ListItem key={id} divider>
								<ListItemText
									primary={<Typography variant="h6">{name}</Typography>}
									secondary={
										<Box mt={1}>
											{permissions.map((permission, index) => (
												<Chip
													key={index}
													label={permission.name}
													size="small"
													color="primary"
													variant="outlined"
													sx={{ mr: 0.5, mb: 0.5 }}
												/>
											))}
										</Box>
									}
								/>
							</ListItem>
						))}
					</List>
				</Paper>
			</Box>
		</Container>
	);
}
