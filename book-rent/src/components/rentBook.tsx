'use client';
import { Button } from '@mui/material';
import React from 'react';
import { useUserContext } from './UserContextWrapper';
import { useRouter } from 'next/navigation';
import { getFuncToUpdate } from './AdminOwnerTable';
import { getCurrentUser } from '@/actions';
import { useFormStatus } from 'react-dom';
import { createAblity } from '@/lib/utils';
import { Can } from '@casl/react';

type User = Awaited<ReturnType<typeof getCurrentUser>>;

interface RentAndReturnBookButtonProps extends React.PropsWithChildren {
	bookID: number;
	price: Number;
	author: number;
	url: string;
	isReturn?: boolean;
}

function RentAndReturnBookButton({
	bookID,
	author,
	price,
	url,
	children,
	isReturn = false
}: RentAndReturnBookButtonProps) {
	const { user } = useUserContext();
	const ablity = createAblity(user?.permissions ?? []);
	const router = useRouter();

	const isAlreadyRented = isReturn
		? false
		: (user as User)?.rentedBooks.some(({ id }) => id == bookID);

	const handleBookRent = async () => {
		if (!user) {
			router.push('/login');
			return;
		}
		const updater = getFuncToUpdate();
		const result = await updater(url, {
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
			<Can this={'Book'} I={'read'} ability={ablity}>
				{(k) => {
					return k ? (
						<SubmitButton onSubmit={(fdata) => handleBookRent()} disabled={isAlreadyRented}>
							{children}
						</SubmitButton>
					) : (
						<SubmitButton onSubmit={(fdata) => handleBookRent()} disabled={true}>
							{children}
						</SubmitButton>
					);
				}}
			</Can>
		</form>
	);
}

export default RentAndReturnBookButton;

function SubmitButton({
	onSubmit,
	children,
	...props
}: React.ComponentProps<typeof Button> & {
	onSubmit: (formData: FormData) => void;
	children: React.ReactNode;
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
			{children}
		</Button>
	);
}
