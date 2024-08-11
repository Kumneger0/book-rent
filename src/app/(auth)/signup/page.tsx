import SignUPForm from '@/components/singupForm';
import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

function Signup() {
	return (
		<>
			<Box
				sx={{
					margin: '10px 10px',
					padding: '10px',
					display: 'flex',
					color: 'black',
					gap: '2px',
					flexDirection: 'column',
					width: '80%',
					[`@media (max-width: 768px)`]: {
						width: '100%'
					}
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
						margin: '10px auto',
						width: '80%',
						p: 2
					}}
				>
					<Image src="/Logo.png" alt="logo" width={100} height={50} />
					<Typography sx={{ fontWeight: 400, fontSize: '28px', px: 2 }}>Book Rent</Typography>
				</Box>
				<Typography
					sx={{
						color: 'black',
						margin: '0 auto',
						fontSize: '20px',
						width: '80%'
					}}
				>
					Sign Up Into Book Rent
				</Typography>
			</Box>
			<Divider sx={{ width: '80%', margin: '0 auto' }} />
			<form>
				<SignUPForm />
			</form>

			<div
				style={{
					marginTop: '10px',
					color: 'black',
					paddingBottom: '20px',
					width: '80%',
					margin: '10px auto',
					textAlign: 'center'
				}}
			>
				Already have an account{' '}
				<Link href={'/login'} style={{ color: 'blue', textDecoration: 'none' }}>
					login
				</Link>
			</div>
		</>
	);
}

export default Signup;
