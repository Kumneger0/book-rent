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
				<Button
					sx={{
						textTransform: 'capitalize'
					}}
					variant="contained"
				>
					<Link
						style={{
							textDecoration: 'none'
						}}
						href={'/admin/permission/view'}
					>
						<Typography
							sx={{
								color: '#ffff'
							}}
						>
							View Permissions
						</Typography>
					</Link>
				</Button>
				<Button
					sx={{
						textTransform: 'capitalize'
					}}
					variant="contained"
				>
					<Link
						style={{
							textDecoration: 'none'
						}}
						href={'/admin/permission/assign'}
					>
						<Typography
							sx={{
								color: '#ffff'
							}}
						>
							Assign Permission
						</Typography>
					</Link>
				</Button>
				<Button
					sx={{
						textTransform: 'capitalize'
					}}
					variant="contained"
				>
					<Link
						style={{
							textDecoration: 'none'
						}}
						href={'/admin/permission/create'}
					>
						<Typography
							sx={{
								color: '#ffff'
							}}
						>
							Create Permission
						</Typography>
					</Link>
				</Button>
			</Box>
		</Box>
	);
};

export default PermissionManagement;
