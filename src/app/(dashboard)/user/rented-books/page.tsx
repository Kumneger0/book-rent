import { getCurrentUser } from '@/actions';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ReturnBook from '@/components/rentBook';

async function Page() {
	const user = await getCurrentUser();

	return (
		<>
			<Typography variant="h4" component="h1" align="center" gutterBottom>
				Your Rented Books
			</Typography>
			{!!!user?.rentedBooks.length && (
				<Box
					sx={{
						width: '100%',
						height: '80dvh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Typography variant="h4" align="center" gutterBottom>
						You haven&apos;t rented any books yet.
					</Typography>
				</Box>
			)}
			{!!user?.rentedBooks.length && (
				<Grid
					container
					sx={{
						justifyItems: 'center',
						alignItems: 'center'
					}}
					spacing={2}
				>
					{user?.rentedBooks.map((book) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
							<Box
								sx={{
									border: '1px solid #ccc',
									borderRadius: '8px',
									padding: '16px'
								}}
							>
								<Image
									src={book.coverImage}
									alt={book.bookName}
									width={300}
									height={300}
									style={{ width: '100%', height: '200px', objectFit: 'cover' }}
								/>
								<Typography
									variant="h6"
									sx={{ maxHeight: '100px', height: '60px' }}
									component="h2"
									gutterBottom
								>
									{book.bookName}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Author: {book.author}
								</Typography>
								<ReturnBook
									url={'/api/books/return'}
									author={book.ownerId}
									price={book.price}
									bookID={book.id}
									isReturn
								>
									Return book
								</ReturnBook>
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
}

export default Page;
