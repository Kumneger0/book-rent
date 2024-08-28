'use client';
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
import { Permission, Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function PermissionAssign({
	roles,
	permissions
}: {
	roles: (Role & { permissions: Permission[] })[];
	permissions: Permission[];
}) {
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const alreadyAssignedRolePermissions = roles
		.find(({ id }) => String(id) === String(selectedRole))
		?.permissions.map(({ name }) => name);

	const filtedPermissions = permissions.filter(
		({ name }) => !alreadyAssignedRolePermissions?.includes(name)
	);

	const handleRoleChange = (event: SelectChangeEvent) => {
		setSelectedRole(event.target.value);
	};

	const handlePermissionChange = (permissionId: string) => {
		setSelectedPermissions((prev) =>
			prev.includes(permissionId)
				? prev.filter((id) => id !== permissionId)
				: [...prev, permissionId]
		);
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/permissions/assign', {
				method: 'POST',
				body: JSON.stringify({
					roleId: selectedRole,
					permissions: selectedPermissions.map((id) => ({ id }))
				})
			});
			if (!response.ok) throw new Error('Failed to assing permission');
			const data = (await response.json()) as APIResponse;
			if (data.status == 'success') {
				toast.success('Permission assigned successfully');
			}
		} catch (errr) {
			toast.error('Failed to assign permission');
			console.error(errr);
		} finally {
			setIsLoading(false);
			router.refresh();
		}
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
			<Box mt={2}>
				<Typography variant="subtitle1">Permissions:</Typography>
				<FormGroup>
					{filtedPermissions.map((permission) => (
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
			</Box>
			<Box component={'form'} mt={3}>
				<SubmitButton
					onClick={handleSubmit}
					variant="contained"
					color="primary"
					disabled={!selectedRole || !filtedPermissions.length || isLoading}
					fullWidth
				/>
			</Box>
		</>
	);
}

export default PermissionAssign;

function SubmitButton({
	formAction,
	...props
}: React.ComponentProps<typeof Button> & { formAction?: () => void }) {
	return (
		<Button disabled={props.disabled} action={formAction} {...props}>
			Assign Permissions
		</Button>
	);
}
