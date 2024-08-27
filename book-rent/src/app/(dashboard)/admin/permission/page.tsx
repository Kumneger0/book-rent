import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
const PermissionManagement: React.FC = () => {
	return (
		<Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
			<Typography variant="h4" gutterBottom>
				Permission Management
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
				<Button variant="contained">
					<Link href={'/admin/permission/view'}>View Permissions</Link>
				</Button>
				<Button variant="contained">
					<Link href={'/admin/permission/assign'}>Assign Permission</Link>
				</Button>
				<Button variant="contained">
					<Link href={'/admin/permission/create'}>Create Permission</Link>
				</Button>
			</Box>
		</Box>
	);
};

export default PermissionManagement;
