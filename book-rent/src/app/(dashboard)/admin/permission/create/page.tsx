'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Permission } from '@prisma/client';
import { baseURL } from '../view/page';
import { redirect } from 'next/navigation';
import { APIResponse } from '@/types';
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';

const NewPermissionForm: React.FC = () => {
	return (
		<Box
			component="form"
			action={async (formdata) => {
				const permission = Object.fromEntries(formdata.entries()) as {
					name: string;
					actions: string;
					subject: string;
					condition: string;
				} satisfies Pick<Permission, 'actions' | 'condition' | 'subject' | 'name'>;
				try {
					const response = await fetch(`${baseURL}/api/permission/new`, {
						method: 'post',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							permission: {
								...permission,
								condition: permission.condition ? JSON.parse(permission.condition) : null
							}
						})
					});
					const data = (await response.json()) as APIResponse;
					if (data.status === 'success') {
						toast.success(data.data.message);
						redirect('/admin/permission/view');
					} else {
						toast.error(data.data.message);
					}
				} catch (err) {
					console.error(err);
				}
			}}
			sx={{ maxWidth: 400, margin: 'auto' }}
		>
			<Typography variant="h4" gutterBottom>
				Create New Permission
			</Typography>
			<TextField fullWidth margin="normal" label="Name" name="name" required />
			<TextField fullWidth margin="normal" label="Actions" name="actions" required />
			<TextField fullWidth margin="normal" label="Subject" name="subject" required />
			<TextField fullWidth margin="normal" label="Condition" name="condition" multiline rows={4} />
			<SubmitButton />
		</Box>
	);
};

export default NewPermissionForm;

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button disabled={pending} type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
			{pending ? 'Creating...' : 'Create Permission'}
		</Button>
	);
}
