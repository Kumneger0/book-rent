import { APIResponse } from '@/types';
import { Paper, Typography } from '@mui/material';
import { Permission, Role } from '@prisma/client';
import PermissionAssign from '@/components/permissionAssign';
import { baseURL, getRoles } from '@/lib/utils';

const getPermissions = async () => {
	try {
		const res = await fetch(`${baseURL}/api/permissions`, { cache: 'no-store' });
		if (!res.ok) throw new Error('Failed to get permissions');
		const { data } = (await res.json()) as APIResponse;
		return (data as unknown as { data: Permission[] }).data;
	} catch (error) {
		console.log(error);
		return [] as Permission[];
	}
};

const RolePermissionAssignment = async () => {
	const roles = await getRoles();
	const permissions = await getPermissions();

	return (
		<Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
			<Typography variant="h5" gutterBottom>
				Assign Permissions to Role
			</Typography>
			<PermissionAssign roles={roles} permissions={permissions} />
		</Paper>
	);
};

export default RolePermissionAssignment;
