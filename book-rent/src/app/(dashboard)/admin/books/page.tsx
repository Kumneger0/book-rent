import Example from '@/components/books';
import SharedHeader from '@/components/sharedHead';
import { baseURL } from '@/lib/utils';
import { Box } from '@mui/material';
import { Book } from '@prisma/client';
import { cookies } from 'next/headers';

async function Books({ searchParams }: { searchParams: Record<string, string> }) {
	const filter = searchParams.filter;

	const token = cookies().get('token');

	const books = await fetch(`${baseURL}/api/books/getbooks?filter=${filter ?? '{}'}`, {
		headers: {
			token: `Bearer ${token?.value}`
		}
	})
		.then((res) => res.json())
		.then(
			(data: {
				status: 'success' | 'error';
				data: { books: Book & { owner: { fullName: string } }[] };
			}) => {
				console.error('allbooks from all owner', data);
				if (data.status === 'error') {
					throw new Error('Failed to fetch books');
				}
				return data.data.books;
			}
		)
		.catch((error) => {
			console.error('Error fetching books:', error);
			return [];
		});

	return (
		<Box sx={{ flexGrow: 1 }}>
			<SharedHeader>Admin/Books</SharedHeader>
			<Box sx={{ p: 2, borderRadius: 3, boxShadow: 1, backgroundColor: 'white' }}>
				<h3>List of Books</h3>
				{/* @ts-expect-error */}
				<Example data={books || []} />
			</Box>
		</Box>
	);
}

export default Books;
