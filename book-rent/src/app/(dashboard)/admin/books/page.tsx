import Example from '@/components/books';
import SharedHeader from '@/components/sharedHead';
import { prisma } from '@/db';
import { Box } from '@mui/material';
import React from 'react';

// owner=fklalkf&category=fljaflkj&bookName=falfjl&author=fjafklaj&bookNo=fljalkfjl

async function Books({ searchParams }: { searchParams: Record<string, string> }) {
	const owner = searchParams.owner;
	const bookName = searchParams.bookName;
	const author = searchParams.author;
	const bookNo = searchParams.bookNo;

	const books = await prisma.book.findMany({
		where: {
			owner: {
				fullName: {
					contains: owner,
					mode: 'insensitive'
				}
			},
			author: {
				contains: author,
				mode: 'insensitive'
			},
			bookName: {
				contains: bookName,
				mode: 'insensitive'
			},
			bookNo: {
				contains: bookNo,
				mode: 'insensitive'
			}
		},
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
