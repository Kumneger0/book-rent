import { Box } from '@mui/material';
import { cookies } from 'next/headers';

import { VerifyUserJwt } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

async function AuthLayout({ children }: { children: React.ReactNode }) {
	const token = cookies().get('token')?.value;
	const user = VerifyUserJwt<User>(token);

	if (user) {
		if (user.role == 'user') {
			return redirect('/');
		}
		const pathToRedirect = `/${user?.role}/dashboard`;
		return redirect(pathToRedirect);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				height: '100dvh',
				flexWrap: 'wrap',
				[`@media (max-width: 768px)`]: {
					flexDirection: 'column'
				}
			}}
		>
			<Box
				sx={{
					width: '50%',
					backgroundColor: '#191D38',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '2rem 0',
					minWidth: '500px',
					color: 'white',
					[`@media (max-width: 768px)`]: {
						width: '100%'
					}
				}}
			>
				<Image src="/Logo.png" alt="logo" width={300} height={200} />
			</Box>

			<Box
				component="form"
				sx={{
					flex: 1,
					padding: '2rem 0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					'& > *': { marginBottom: '9px' },
					[`@media (max-width: 768px)`]: {
						backgroundColor: 'green'
					}
				}}
				noValidate
				autoComplete="off"
			>
				{children}
			</Box>
		</Box>
	);
}

export default AuthLayout;
