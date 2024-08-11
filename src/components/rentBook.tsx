'use client';
import { Button } from '@mui/material';
import React from 'react';
import { useUserContext } from './UserContextWrapper';
import { useRouter } from 'next/navigation';
import { getFuncToUpdate } from './AdminOwnerTable';
import { getCurrentUser } from '@/actions';
import { useFormStatus } from 'react-dom';

type User = Awaited<ReturnType<typeof getCurrentUser>>;

function RentBookButton({
	bookID,
	author,
	price
}: {
	bookID: number;
	price: Number;
	author: number;
}) {
	const { user } = useUserContext();
	const router = useRouter();

	const isAlreadyRented = (user as User)?.rentedBooks.some(({ id }) => id == bookID);

	const handleBookRent = async () => {
		if (!user) {
			router.push('/login');
			return;
		}
		const updater = getFuncToUpdate();
		const result = await updater('/api/books/rent', {
			method: 'PUT',
			body: JSON.stringify({
				bookId: bookID,
				authorId: author,
				price: price
			})
		});
		router.refresh();
	};

	return (
		<form>
			<SubmitButton onSubmit={(fdata) => handleBookRent()} disabled={isAlreadyRented} />
		</form>
	);
}

export default RentBookButton;

function SubmitButton({
	onSubmit,
	...props
}: React.ComponentProps<typeof Button> & {
	onSubmit: (formData: FormData) => void;
}) {
	const { pending } = useFormStatus();

	const isDisabled = props.disabled || pending;

	return (
		<Button
			type="submit"
			formAction={onSubmit}
			disabled={isDisabled}
			variant="contained"
			color="primary"
			fullWidth
		>
			Rent Book
		</Button>
	);
}
