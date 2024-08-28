'use client';
import { baseURL } from '@/app/(dashboard)/admin/permission/view/page';
import { getRoles } from '@/lib/utils';
import { APIResponse } from '@/types';
import {
	Box,
	Button,
	FormControl,
	FormGroup,
	InputLabel,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

export const RolePermissionManager = async ({
	roles
}: {
	roles: Awaited<ReturnType<typeof getRoles>>;
}) => {
	const [selectedRole, setSelectedRole] = useState('');
	const router = useRouter();

	const handleRoleChange = (event: SelectChangeEvent) => {
		setSelectedRole(event.target.value);
	};

	const permissions =
		roles.find((role) => String(role.id) === String(selectedRole))?.permissions ?? [];

	const handleRevokePermission = async (permissionId: number, roleId: number) => {
		try {
			const res = await fetch(`${baseURL}/api/permissions/revoke`, {
				cache: 'no-store',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					roleId: Number(selectedRole),
					permissionId: permissionId
				})
			});
			if (!res.ok) throw Error('failed to revoke permission');
			const result = (await res.json()) as APIResponse;
			if (result.status == 'success') {
				router.refresh();
				toast.success('succuess');
			}
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : 'failed to revoke permission');
		}
	};

	return (
		<Box sx={{ maxWidth: 400, mx: 'auto' }}>
			<FormControl fullWidth margin="normal">
				<InputLabel>Select Role</InputLabel>
				<Select
					defaultValue=""
					value={selectedRole}
					onChange={handleRoleChange}
					label="Select Role"
				>
					{roles.map((role) => (
						<MenuItem key={role.id} value={role.id}>
							{role.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Box component={'form'} mt={2}>
				<Typography variant="subtitle1">Permissions:</Typography>
				<FormGroup sx={{ listStyle: 'none' }}>
					{permissions.map((permission) => (
						<ListItem sx={{ my: 1, listStyle: 'none' }} key={permission.id}>
							<ListItemText primary={permission.name} />
							<ListItemSecondaryAction>
								<RevokeButton
									type="submit"
									formAction={() => {
										handleRevokePermission(Number(permission.id), Number(selectedRole));
									}}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</FormGroup>
			</Box>
		</Box>
	);
};

function RevokeButton({ ...props }: React.ComponentProps<typeof Button>) {
	const { pending } = useFormStatus();
	return (
		<Button {...props} disabled={props.disabled || pending} variant="outlined" color="secondary">
			{pending ? 'wait' : 'Revoke'}
		</Button>
	);
}
