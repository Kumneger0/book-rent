import { MUITypes } from '@/types';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Book } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { z } from 'zod';
import SubmitButton from './formSubmitButon';
import { getFuncToUpdate } from './AdminOwnerTable';

const style: MUITypes = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
};

const bookFormSchema = z.object({
	bookName: z.string().min(1, { message: 'please enter book name' }),
	quantity: z.string({ message: 'pleae enter how many quatties you have' }),
	category: z.enum(['fiction', 'selfHelp', 'business'], {
		message: 'please enter book status'
	}),
	price: z.string({ message: 'please enter book price' })
});

export default function BasicModal({
	book
}: {
	book: Pick<Book, 'bookName' | 'quantity' | 'category' | 'price' | 'id'> & {
		status: 'free' | 'rented' | 'waiting approval';
	};
}) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const updateBook = async (formData: FormData, id: number) => {
		try {
			const formDataObj = Object.fromEntries(formData.entries());
			const bookInfo = bookFormSchema.parse(formDataObj);
			const updater = getFuncToUpdate();
			const result = await updater('/api/books/update', {
				method: 'put',
				body: JSON.stringify({ ...bookInfo, id })
			});
			if (result?.status) {
				handleClose();
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>
				<ModeEditOutlineIcon sx={{ color: 'black' }} fontSize="medium" />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<TextField
							id="outlined-name"
							label="book name"
							type="text"
							name="bookName"
							defaultValue={book.bookName}
						/>
						<TextField
							id="outlined-email"
							label="quantity"
							type="number"
							name="quantity"
							defaultValue={book.quantity}
						/>

						<FormControl>
							<InputLabel id="demo-simple-select-required-label">category</InputLabel>

							<Select
								labelId="demo-simple-select-required-label"
								id="demo-simple-select-required"
								label="status *"
								variant="filled"
								sx={{ color: 'black' }}
								name="category"
								defaultValue={book.category}
							>
								<MenuItem value={'fiction'}>fiction</MenuItem>
								<MenuItem value={'selfHelp'}>selfHelp</MenuItem>
								<MenuItem value={'business'}>business</MenuItem>
							</Select>
						</FormControl>

						<TextField
							id="outlined-phonenum-input"
							label="Price"
							name="price"
							type="number"
							defaultValue={book.price}
						/>
						<SubmitButton
							formAction={async (formData) => {
								await updateBook(formData, book.id);
								router.refresh();
							}}
						>
							update
						</SubmitButton>
					</form>
				</Box>
			</Modal>
		</div>
	);
}
