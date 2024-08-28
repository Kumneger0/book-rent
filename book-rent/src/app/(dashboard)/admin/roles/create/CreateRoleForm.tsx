'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { APIResponse } from '@/types';
import { useFormStatus } from 'react-dom';

export default function CreateRoleForm() {
	const [roleName, setRoleName] = useState('');
	const router = useRouter();

	const handleSubmit = async (formData: FormData) => {
		const roleObj = Object.fromEntries(formData.entries()) as { role: string };
		try {
			console.log('Creating role:', { name: roleName });

			const res = await fetch('/api/roles/new', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: roleObj.role
				})
			});
			if (!res.ok) throw Error('Failed to create new role');
			const result = (await res.json()) as APIResponse;
			if (result.status == 'success') {
				toast.success('New role created');
				router.push(`/admin/roles?new=${encodeURIComponent(roleName)}`);
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'failed to create role');
		}
	};

	return (
		<form action={handleSubmit}>
			<TextField
				fullWidth
				label="Role Name"
				value={roleName}
				name="role"
				onChange={(e) => setRoleName(e.target.value)}
				margin="normal"
				required
			/>
			<Box mt={2}>
				<RoleButtons />
			</Box>
		</form>
	);
}

function RoleButtons() {
	const router = useRouter();
	const { pending } = useFormStatus();

	return (
		<>
			<Button type="submit" disabled={pending} variant="contained" color="primary">
				{pending ? 'creating role' : '	Create Role'}
			</Button>
			<Button variant="outlined" onClick={() => router.push('/admin/roles')} sx={{ ml: 2 }}>
				Cancel
			</Button>
		</>
	);
}
