import { Box, Grid } from '@mui/material';
import { cookies } from 'next/headers';

import { VerifyUserJwt } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

async function AuthLayout({ children }: { children: React.ReactNode }) {
	const token = cookies().get('token')?.value;
	const user = VerifyUserJwt<User & { role: { name: string } }>(token);

	if (user) {
		const role = user?.role?.name;
		if (role == 'user') {
			return redirect('/');
		}
		const pathToRedirect = `/${role}/dashboard`;
		return redirect(pathToRedirect);
	}

	return (
		<Grid container>
			<Grid
				item
				md={12}
				lg={6}
				sx={{
					backgroundColor: '#191D38',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '2rem 0',
					color: 'white',
					[`@media (max-width: 768px)`]: {
						width: '100%'
					}
				}}
			>
				<Image src="/Logo.png" alt="logo" width={300} height={200} />
			</Grid>
			{/* @ts-ignore */}
			<Grid
				item
				md={12}
				lg={6}
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100dvh',
					display: 'grid',
					placeItems: 'center'
				}}
				noValidate
				autoComplete="off"
			>
				<main>{children}</main>
			</Grid>
		</Grid>
	);
}

export default AuthLayout;
