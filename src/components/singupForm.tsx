'use client';
import { z } from 'zod';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { UserSchema } from '@/lib/utils';
import toast from 'react-hot-toast';
import SignUpButton from './formSubmitButon';

function SignUPForm() {
	const router = useRouter();
	const [zodError, setZodError] = React.useState<z.ZodError>();
	const [role, setRole] = useState('user');

	async function formAction(formData: FormData) {
		const formDataObj = Object.fromEntries(formData.entries());

		try {
			const user = UserSchema.parse(formDataObj);

			const response = await fetch('/api/user/register', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({...user, role})
			});
			const data = (await response.json()) as {
				status: 'success' | 'error';
				data: { message: string };
			};

			if (data.status === 'success') {
				toast.success(data.data.message);
				router.push('/login');
			} else {
				toast.error(data.data.message);
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				setZodError(error);
				return;
			}
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}

	const emailError = zodError?.issues.find((err) => err.path.includes('email'))?.message;
	const passwordErorr = zodError?.issues.find((err) => err.path.includes('password'))?.message;
	const nameError = zodError?.issues.find((err) => err.path.includes('fullName'))?.message;
	const location = zodError?.issues.find((err) => err.path.includes('fullName'))?.message;
	const confirmPassword = zodError?.issues.find((err) =>
		err.path.includes('confirmPassword')
	)?.message;
	const termsError = zodError?.issues.find((err) => err.path.includes('terms'))?.message;
	const phonenumError = zodError?.issues.find((err) => err.path.includes('phoneNumber'))?.message;

	return (
		<div style={{ width: '80%', margin: '0 auto' }}>
			<TextField
				error={!!nameError}
				helperText={nameError}
				id="outlined-full-name"
				label="Full Name"
				type="text"
				name="fullName"
				required
				style={{ width: '100%', marginTop: '10px' }}
			/>

			<TextField
				error={!!emailError}
				helperText={!!emailError}
				id="outlined-email"
				label="Email"
				type="email"
				name="email"
				required
				style={{ width: '100%', marginTop: '10px' }}
			/>
			<TextField
				error={!!passwordErorr}
				helperText={!!passwordErorr}
				id="outlined-password-input"
				label="Password"
				type="password"
				name="password"
				required
				autoComplete="current-password"
				style={{ width: '100%' }}
			/>
			<TextField
				error={!!confirmPassword}
				helperText={confirmPassword}
				id="outlined-confirm-password-input"
				label="Confirm Password"
				type="password"
				name="confirmPassword"
				required
				autoComplete="current-confirm-password"
				style={{ width: '100%' }}
			/>
			<TextField
				error={!!location}
				helperText={!!location}
				id="outlined-location-input"
				label="Location"
				type="text"
				name="location"
				required
				style={{ width: '100%' }}
			/>
			<TextField
				error={!!phonenumError}
				helperText={!!phonenumError}
				id="outlined-phonenum-input"
				label="Phone Number"
				type="tel"
				name="phoneNumber"
				required
				style={{ width: '100%' }}
			/>

			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Select Role</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="do you want to create as user or as owner"
					onChange={(e) => setRole(e.target.value as string)}
				>
					<MenuItem selected={role == 'user'} value={'user'}>
						user
					</MenuItem>
					<MenuItem value={'owner'}>owner</MenuItem>
				</Select>
			</FormControl>

			<FormControlLabel
				required
				name="terms"
				control={<Checkbox />}
				label="I accept terms and conditions"
				sx={{ color: 'black', width: '100%', margin: '10px, 0', py: 2, px: 1 }}
			/>

			<SignUpButton formAction={formAction}>Sign Up</SignUpButton>
		</div>
	);
}

export default SignUPForm;
