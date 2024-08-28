import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
const PermissionManagement: React.FC = () => {
	const permissionsActions = [
		{
			name: 'View Permissions',
			href: '/admin/permission/view'
		},
		{
			name: 'Assign Permission',
			href: '/admin/permission/assign'
		},
		{
			name: 'Create Permission',
			href: '/admin/permission/create'
		},
		{
			name: 'Revoke Permission',
			href: '/admin/permission/revoke'
		}
	];

	return (
		<Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
			<Typography variant="h4" gutterBottom>
				Permission Management
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, gap: 2 }}>
				{permissionsActions.map((action) => {
					return (
						<Button
							key={action.name}
							sx={{
								textTransform: 'capitalize'
							}}
							variant="contained"
						>
							<Link
								style={{
									textDecoration: 'none'
								}}
								href={action.href}
							>
								<Typography
									sx={{
										color: '#ffff'
									}}
								>
									{action.name}
								</Typography>
							</Link>
						</Button>
					);
				})}
			</Box>
		</Box>
	);
};

export default PermissionManagement;
