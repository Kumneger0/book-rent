'use client';
import { baseURL, getRoles } from '@/lib/utils';
import { APIResponse } from '@/types';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

export const RolePermissionManager = async ({
	roles
}: {
	roles: Awaited<ReturnType<typeof getRoles>>;
}) => {
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
	const router = useRouter();

	const handleRoleChange = (event: SelectChangeEvent) => {
		startTransition(() => setSelectedRole(event.target.value));
	};

	const permissions =
		roles.find((role) => String(role.id) === String(selectedRole))?.permissions ?? [];

	const handleRevokePermission = async () => {
		try {
			const res = await fetch(`${baseURL}/api/permissions/revoke`, {
				cache: 'no-store',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					roleId: Number(selectedRole),
					permissionIds: selectedPermissions
				})
			});
			if (!res.ok) throw Error('failed to revoke permission');
			const result = (await res.json()) as APIResponse;
			if (result.status == 'success') {
				router.refresh();
				toast.success('succuess');
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'failed to revoke permission');
		}
	};

	const handlePermissionChange = (permissionId: string) => {
		startTransition(() => {
			setSelectedPermissions((prev) =>
				prev.includes(permissionId)
					? prev.filter((id) => id !== permissionId)
					: [...prev, permissionId]
			);
		});
	};

	return (
		<>
			<FormControl fullWidth margin="normal">
				<InputLabel>Select Role</InputLabel>
				<Select value={selectedRole} onChange={handleRoleChange} label="Select Role">
					{roles.map((role) => (
						<MenuItem key={role.id} value={role.id}>
							{role.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Box
				action={async (fdata) => {
					await handleRevokePermission();
				}}
				component={'form'}
				mt={2}
			>
				<Typography variant="subtitle1">Permissions:</Typography>
				<FormGroup>
					{permissions.map((permission) => (
						<FormControlLabel
							key={permission.id}
							control={
								<Checkbox
									checked={selectedPermissions.includes(permission.id.toString())}
									onChange={() => handlePermissionChange(permission.id.toString())}
								/>
							}
							label={permission.name}
						/>
					))}
				</FormGroup>
				<RevokeButton disabled={!selectedRole || !selectedPermissions.length} />
			</Box>{' '}
		</>
	);
};

function RevokeButton({ ...props }: React.ComponentProps<typeof Button>) {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			{...props}
			disabled={props.disabled || pending}
			variant="outlined"
			color="secondary"
		>
			{pending ? 'wait' : 'Revoke'}
		</Button>
	);
}
