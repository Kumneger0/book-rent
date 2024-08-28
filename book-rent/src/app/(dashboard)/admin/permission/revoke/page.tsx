import { RolePermissionManager } from '@/components/RevokePermissionManager';
import { getRoles } from '@/lib/utils';

const RevokePermission = async () => {
	const roles = await getRoles();

	return (
		<div>
			<h1>Revoke Permission</h1>
			<RolePermissionManager roles={roles} />
		</div>
	);
};

export default RevokePermission;
