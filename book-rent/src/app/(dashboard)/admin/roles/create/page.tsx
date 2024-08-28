import CreateRoleForm from './CreateRoleForm';
import { Box, Typography, Paper, Container } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

export default function CreateRolePage() {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					<SecurityIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
					Create New Role
				</Typography>
				<Paper elevation={3} sx={{ p: 3 }}>
					<CreateRoleForm />
				</Paper>
			</Box>
		</Container>
	);
}
