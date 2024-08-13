'use client';

import React, { useRef, useState } from 'react';
import {
	TextField,
	Autocomplete,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Tooltip,
	Alert
} from '@mui/material';
// import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Input, Box, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import UploadBookModal from './uploadBookModal';
import { APIResponse } from '@/types';
import BasicModal from './bookUploalSuccessModal';
import toast from 'react-hot-toast';
import { Book } from '@prisma/client';
import { useUserContext } from './UserContextWrapper';

import { styled } from '@mui/material/styles';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

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
	const [isUploading, setIsUploading] = useState(false);
	const [bookQuantity, setBookQuantity] = useState<number>(0);
	const [bookPrice, setBookPrice] = useState<number>(0);
	const inputFileRef = useRef<HTMLInputElement>(null);
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
			} else {
				toast.error('We Failed to upload your book try again');
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsUploading(false);
		}
	}

	const { user } = useUserContext();

	return (
		<Box sx={{ width: '80%', margin: '0 auto' }}>
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
					open
					disableCloseOnSelect
					disablePortal
					onSelect={(e) => e.stopPropagation()}
					options={books?.map((book) => ({
						label: book.bookName,
						value: book.bookName
					}))}
					renderInput={(params) => (
						<TextField {...params} label="Search book by name or Author" variant="outlined" />
					)}
					sx={{ marginBottom: 2 }}
					PaperComponent={(props) => (
						<Box
							sx={{
								backgroundColor: 'slate',
								padding: '10px',
								borderRadius: '10px',
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
								maxheight: '400px',
								overflowY: 'auto'
							}}
							{...props}
						>
							{(newBook
								? books.concat([
										{
											bookName: newBook.name,
											author: newBook.author,
											category: newBook.category as 'fiction' | 'selfHelp' | 'business',
											bookNo: '',
											id: 0,
											isApproved: false,
											ownerId: 0,
											price: 0,
											status: 'free'
										}
								  ])
								: books
							).map((book) => (
								<Typography
									onClick={(e) => e.stopPropagation()}
									key={book.id}
									sx={{ marginBottom: '10px' }}
								>
									{book.bookName}
								</Typography>
							))}
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
					margin: '100px auto'
				}}
			>
				<Box sx={{ minWidth: 300, mt: '150px', mx: 'auto' }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Book Quantity</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Book Quantity"
							onChange={(e) => setBookQuantity(Number(e.target.value))}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ minWidth: 300, mt: '150px', mx: 'auto' }}>
					<OutlinedInput
						id="outlined-adornment-weight"
						aria-describedby="outlined-weight-helper-text"
						placeholder="Rent Price for 2 weeks"
						value={bookPrice}
						type="number"
						onChange={(e) => setBookPrice(Number(e.target.value))}
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
