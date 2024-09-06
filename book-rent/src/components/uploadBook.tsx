'use client';

import { Alert, Autocomplete, Divider, FormControl, OutlinedInput, TextField } from '@mui/material';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { APIResponse } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import { $Enums, Book } from '@prisma/client';
import toast from 'react-hot-toast';
import BasicModal from './bookUploalSuccessModal';
import UploadBookModal from './uploadBookModal';
import { useUserContext } from './UserContextWrapper';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const FileInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
});

function UploadBook({ books }: { books: Partial<Book>[] }) {
	const [newBook, setBook] = useState<{
		name: string;
		author: string;
		category: string;
	}>();
	const [open, setOpen] = React.useState(false);
	const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [bookQuantity, setBookQuantity] = useState<number | null>(null);
	const [bookPrice, setBookPrice] = useState<number | null>();
	const searchRef = useRef<ElementRef<typeof TextField>>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const [autoCompleteSearchValue, setAutoCompleteSearchValue] = useState('');

	useEffect(() => {
		const abortController = new AbortController();
		if (typeof window !== 'undefined') {
			window.addEventListener(
				'resize',
				() => {
					setAutoCompleteOpen(false);
				},
				{ signal: abortController.signal }
			);
		}
		return () => {
			abortController.abort();
		};
	}, []);

	async function handleBookUpload() {
		const bookToUpload = {
			name: newBook?.name,
			author: newBook?.author,
			category: newBook?.category,
			quantity: bookQuantity,
			price: bookPrice
		};

		if (
			Object.keys(bookToUpload).some(
				(key) => bookToUpload[key as keyof typeof bookToUpload] === undefined
			)
		) {
			toast.error('Please fill all the fields');
			return;
		}

		const file = inputFileRef.current?.files?.[0];
		if (!file) {
			toast.error('Please select a file');
			return;
		}

		if (file.size > 1024 * 1024 * 2) {
			toast.error('File size is too large (max 2mb)');
			return;
		}

		const mimeType = `data:${file.type};base64`;
		const base64image = `${mimeType},${Buffer.from(await file.arrayBuffer()).toString('base64')}`;

		try {
			setIsUploading(true);
			const response = await fetch(`/api/books?filename=${file.name}`, {
				method: 'POST',
				body: JSON.stringify({ ...bookToUpload, file, base64image })
			});
			const data = (await response.json()) as APIResponse;
			if (data.status === 'success') {
				setOpen(true);
				return;
			}
			if (data.data.message) {
				toast.error(data.data.message);
			}
		} catch (e) {
		} finally {
			setIsUploading(false);
			router.refresh();
		}
	}

	const { user } = useUserContext();

	const booksToDisply = (
		newBook && books.every(({ bookName }) => newBook.name !== bookName)
			? books.concat([
					{
						bookName: newBook.name,
						author: newBook.author,
						category: newBook.category as $Enums.Category,
						quantity: bookQuantity ?? 0,
						price: bookPrice ?? 0
					}
				])
			: books
	).filter(
		({ bookName, author }) =>
			bookName?.toLowerCase()?.includes(autoCompleteSearchValue.toLowerCase()) ||
			author?.toLowerCase()?.includes(autoCompleteSearchValue.toLowerCase())
	);

	return (
		<Box sx={{ width: '80%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
			{!user?.approved && (
				<Alert
					sx={{
						fontSize: '1.2rem'
					}}
					severity="error"
					color="error"
				>
					{' '}
					We noticed that your account is currently awaiting approval. Please wait for confirmation
					of approval before proceeding with book uploads{' '}
				</Alert>
			)}

			<Box sx={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
				<h2>Upload New Book</h2>
				<Autocomplete
					open={autoCompleteOpen}
					disableCloseOnSelect
					disablePortal
					onSelect={(e) => e.stopPropagation()}
					options={books?.map((book) => ({
						label: book.bookName,
						value: book.bookName
					}))}
					renderInput={(params) => (
						<FormControl
							sx={{
								width: '100%',
								position: 'relative'
							}}
						>
							<TextField
								{...params}
								ref={searchRef}
								value={autoCompleteSearchValue}
								onFocus={() => {
									setAutoCompleteOpen(true);
								}}
								onChange={(e) => setAutoCompleteSearchValue(e.currentTarget.value)}
								label="Search book by name or Author"
								variant="outlined"
							/>
							<Button
								onClick={() => {
									setAutoCompleteOpen((prv) => !prv);
								}}
								sx={{
									position: 'absolute',
									right: '5px',
									top: '10px',
									zIndex: 999999,
									width: '20px',
									height: '30px'
								}}
							></Button>
						</FormControl>
					)}
					sx={{ marginBottom: 2 }}
					PaperComponent={(props) => (
						<Box
							sx={{
								backgroundColor: 'white',
								width: '100%',
								hight: '100%',
								padding: '10px',
								borderRadius: '10px',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
							}}
						>
							<Box
								sx={{
									maxHeight: '150px',
									overflowY: 'auto'
								}}
								{...props}
							>
								{booksToDisply.map((book) => (
									<Typography
										onClick={() => {
											setBook({
												author: book.author!,
												category: book.category!,
												name: book.bookName!
											});
										}}
										key={book.id}
										sx={{
											marginBottom: '10px',
											'&:hover': {
												cursor: 'pointer',
												background: 'gray',
												color: 'white'
											}
										}}
									>
										{book.bookName}
									</Typography>
								))}
							</Box>
							<Divider sx={{ width: '100%', margin: '10px 0', color: 'gray' }} />
							<UploadBookModal setBook={setBook} />
						</Box>
					)}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '800px',
					justifyContent: 'space-arround',
					margin: '150px auto',
					flexWrap: 'wrap',
					alignItems: 'center'
				}}
			>
				<Box sx={{ minWidth: 300, mt: '150px', mx: 'auto' }}>
					<TextField
						id="Quantity"
						label="Quantity"
						type="number"
						name="Quantity"
						required
						value={bookQuantity}
						onChange={(e) => {
							const value = e.currentTarget.value;
							if (!value) {
								setBookQuantity(null);
								return;
							}

							setBookQuantity(Number(value));
						}}
						autoComplete="current-confirm-password"
						style={{ width: '100%', margin: '10px 0' }}
					/>
				</Box>
				<Box sx={{ minWidth: 300, mt: '150px', mx: 'auto' }}>
					<OutlinedInput
						id="outlined-adornment-weight"
						aria-describedby="outlined-weight-helper-text"
						placeholder="Rent Price for 2 weeks"
						value={bookPrice}
						type="number"
						onChange={(e) => {
							const price = e.currentTarget.value;
							if (!price) {
								setBookPrice(null);
								return;
							}
							setBookPrice(Number(price));
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					width: '50%',
					maxWidth: '800px',
					margin: '30px auto',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Box display="flex" alignItems="center">
					<Button
						component="label"
						role={undefined}
						variant="text"
						tabIndex={-1}
						startIcon={<FileUploadOutlinedIcon />}
						sx={{
							mb: '30px',
							fontSize: '16px',
							fontWeight: 500,
							textTransform: 'none'
						}}
					>
						Upload Book Cover
						<FileInput ref={inputFileRef} type="file" />
					</Button>
				</Box>
				<Box sx={{ p: 2, my: 3 }} display="flex" alignItems="center">
					<BasicModal
						disabled={isUploading || !user?.approved}
						onSubmit={handleBookUpload}
						open={open}
						setOpen={setOpen}
					>
						{isUploading ? 'please wait ....' : 'submit'}
					</BasicModal>
				</Box>
			</Box>
		</Box>
	);
}

export default UploadBook;
