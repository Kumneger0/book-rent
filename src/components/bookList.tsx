import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { Book } from '@prisma/client';
import RentBookButton from './rentBook';

const BookList = ({ books }: { books: Book[] }) => {
	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
			<Typography variant="h4" component="h2" align="center" gutterBottom>
				Welcome to Our Book Rental System!
			</Typography>

			{!!!books.length && (
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
						Currently There is No book available for rent
					</Typography>
				</Box>
			)}

			{!!books.length && (
				<Grid
					container
					sx={{
						justifyItems: 'center',
						alignItems: 'center'
					}}
					spacing={2}
				>
					{books.map((book) => (
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
								<Typography variant="h6" color="text.secondary">
									Price:
									{book.price.toLocaleString('en-ET', {
										style: 'currency',
										currency: 'ETB'
									})}
								</Typography>
								<RentBookButton author={book.ownerId} price={book.price} bookID={book.id} />
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default BookList;
