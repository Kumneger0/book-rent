import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

import { getCurrentUser } from '@/actions';
import UserContextWrapper from '@/components/UserContextWrapper';
import NextTopLoader from 'nextjs-toploader';
import { prisma } from '@/db';

export const metadata: Metadata = {
	metadataBase: new URL('https://book-rent-challenge.vercel.app/'),
	title: 'Rent Books Online | book-rent-challenge.vercel.app',
	description:
		'Discover a vast digital library of books to rent. Instant access to your favorite reads',
	keywords: 'online book rental, rent ebooks, digital library, ebook rental, instant access',
	openGraph: {
		title: 'Rent Books Online | book-rent-challenge.vercel.app',
		description:
			'Discover a vast digital library of books to rent. Instant access to your favorite reads. ',
		images: [
			{
				url: '/Logo.png',
				alt: 'Online Book Rental',
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Rent Books Online | book-rent-challenge.vercel.app',
		description:
			'Discover a vast digital library of books to rent. Instant access to your favorite reads.',
		images: [{ url: '/Logo.png' }]
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	return (
		<html lang="en">
			<body
				style={{
					backgroundColor: '#f5eded',
					margin: '0',
					padding: '0',
					overflowX: 'hidden'
				}}
				className={inter.className}
			>
				<NextTopLoader />
				<UserContextWrapper user={user}>{children}</UserContextWrapper>
				<Toaster />
			</body>
		</html>
	);
}
