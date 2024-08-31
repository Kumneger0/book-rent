import SharedHeader from '@/components/sharedHead';
import UploadBook from '@/components/uploadBook';
import { getBooks, verify } from '@/lib/utils';
import { Box } from '@mui/material';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import React from 'react';


async function BookUpload() {
	const token = cookies().get('token')!;
	const user = await verify<User>(token.value)!;
	const { books, tableBooks } = await getBooks({ where: {} });

	return (
		<>
			<SharedHeader>
				<span style={{ fontWeight: 'bold', fontSize: '24px' }}>Owner</span>
				/UploadBook
			</SharedHeader>

			<Box
				sx={{
					width: '100%',
					backgroundColor: 'white',
					borderRadius: '20px',
					padding: '10px'
				}}
			>
				<UploadBook
					books={
						tableBooks?.map((book) => ({
							...book,
							price: Number(book.price),
							bookNo: book.bookNo.toString()
						})) ?? []
					}
				/>
			</Box>
		</>
	);
}

export default BookUpload;
