import Example from '@/components/books';
import SharedHeader from '@/components/sharedHead';
import { prisma } from '@/db';
import { validateAndCreateFilter } from '@/lib/utils';
import { Box } from '@mui/material';
import { Prisma } from '@prisma/client';
import React from 'react';

async function Books({ searchParams }: { searchParams: Record<string, string> }) {
	const where = validateAndCreateFilter<Prisma.BookWhereInput>('Book', searchParams);

	const books = await prisma.book.findMany({
		where,
		include: {
			owner: {
				select: {
					fullName: true
				}
			}
		},
		orderBy: {
			bookName: 'asc'
		}
	});
	return (
		<Box sx={{ flexGrow: 1 }}>
			<SharedHeader>Admin/Books</SharedHeader>
			<Box sx={{ p: 2, borderRadius: 3, boxShadow: 1, backgroundColor: 'white' }}>
				<h3>List of Owners</h3>
				<Example data={books} />
			</Box>
		</Box>
	);
}

export default Books;
