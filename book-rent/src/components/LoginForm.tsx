'use client';
import { LoginSchema } from '@/lib/utils';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';
import SignUpButton from './formSubmitButon';
import { APIResponse } from '@/types';
import { useState } from 'react';

function LoginForm() {
	const router = useRouter();
	const [errors, setZodError] = useState<z.ZodError>();

	const formAction = async (formData: FormData) => {
		const formDataObj = Object.fromEntries(formData.entries());

		if (Object.keys(formDataObj).length === 0) {
			toast.error('please fill all fields');
			return;
		}

		try {
			const user = LoginSchema.parse(formDataObj);

			const response = await fetch('/api/user/login', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = (await response.json()) as APIResponse;

			if (data.status === 'success') {
				toast.success(data.data.message);
				location.replace('/');
			} else {
				toast.error(data.data.message);
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				setZodError(err);
				return;
			}
			if (err instanceof Error) {
				toast.error(err.message);
			}
		}
	};

	const emailError = errors?.issues.find((err) => err.path.includes('email'))?.message;
	const passwordErorr = errors?.issues.find((err) => err.path.includes('password'))?.message;

	return (
		<Box sx={{ width: '80%', margin: '10px auto' }}>
			<TextField
				error={!!emailError}
				id="outlined-email"
				label="Email"
				type="email"
				required
				name="email"
				style={{ width: '100%', marginTop: '10px' }}
				helperText={emailError}
			/>
			<TextField
				error={!!passwordErorr}
				id="outlined-password-input"
				label="Password"
				type="password"
				name="password"
				required
				autoComplete="current-password"
				helperText={passwordErorr}
				style={{ width: '100%', marginTop: '10px' }}
			/>
			<FormControlLabel
				control={<Checkbox />}
				label="Remeber me"
				name="remember"
				style={{ width: '100%' }}
				sx={{ color: 'black', margin: '10px, 0', py: 2, px: 1 }}
			/>
			<SignUpButton formAction={formAction}>Login</SignUpButton>
		</Box>
	);
}

export default LoginForm;
