import { RolePermissionManager } from '@/components/RevokePermissionManager';
import { getRoles } from '@/lib/utils';
import { Paper, Typography } from '@mui/material';

const RevokePermission = async () => {
	const roles = await getRoles();

	return (
		<>
			<Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
				<Typography variant="h5" gutterBottom>
					Revoke Permission
				</Typography>
				<RolePermissionManager roles={roles} />
			</Paper>
		</>
	);
};

export default RevokePermission;
