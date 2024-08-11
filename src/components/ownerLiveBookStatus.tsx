'use client';
import { useCreateQueryString, onColumnFiltersChange } from '@/lib/utils';
import { APIResponse } from '@/types';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import BasicModal from './editBook';
import { $Enums } from '@prisma/client';
import { useDebouncedCallback } from 'use-debounce';

export type TableProps = {
	data: {
		id: number;
		No: string;
		BookNo: number;
		bookName: string;
		status: 'rented' | 'free' | 'waiting approval';
		price: string;
		category: $Enums.Category;
	}[];
};

export const TableOwner = ({ data }: TableProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const debouncedOnColumnFiltersChange = useDebouncedCallback(onColumnFiltersChange, 400);
	const columnFilterState = Array.from(searchParams.keys()).map((key) => ({
		id: key,
		value: searchParams.get(key)
	}));

	const createQueryString = useCreateQueryString(searchParams);

	const deleteBook = async (bookID: number) => {
		try {
			const response = await fetch('/api/books/delete', {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: bookID })
			});
			const data = (await response.json()) as APIResponse;
			if (data.status == 'success') {
				toast.success('You have Deleted the file successfully');
				router.refresh();
			}
			if (data.status == 'error') {
				toast.error('Failed to Delete your book');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const columns = useMemo<MRT_ColumnDef<(typeof data)[number]>[]>(
		() => [
			{
				accessorKey: 'No',
				header: 'No',
				size: 50
			},
			{
				accessorKey: 'BookNo',
				header: 'Book No',
				size: 100
			},
			{
				accessorKey: 'bookName',
				header: 'Book Name',
				size: 200
			},
			{
				accessorKey: 'status',
				header: 'Status',
				size: 100,
				Cell(props) {
					const status = props.cell.getValue() as 'rented' | 'free';
					return (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								color: status === 'rented' ? 'red' : '#006AFF'
							}}
						>
							<CircleIcon
								fontSize="large"
								sx={{
									color: status === 'rented' ? 'red' : '#006AFF'
								}}
							/>
							<Typography>{status}</Typography>
						</Box>
					);
				}
			},
			{
				accessorKey: 'price',
				header: 'Price',
				size: 100
			},
			{
				accessorKey: 'action',
				header: 'Action',
				size: 100,
				Cell: ({ row, cell }) => (
					<Box sx={{ display: 'flex', gap: '1rem' }}>
						<BasicModal
							book={{
								bookName: row.original.bookName,
								price: Number(row.original.price),
								quantity: 0,
								status: row.original.status,
								category: row.original.category,
								id: row.original.id
							}}
						/>

						<Button onClick={() => deleteBook(Number(row.original.id))}>
							<DeleteIcon sx={{ color: 'red' }} fontSize="medium" />
						</Button>
					</Box>
				)
			}
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data,
		enablePagination: false,
		enableFullScreenToggle: false,
		onColumnFiltersChange: (data) => {
			debouncedOnColumnFiltersChange({ createQueryString, data, pathname, router });
		},
		state: {
			columnFilters: columnFilterState
		}
	});

	return <MaterialReactTable table={table} />;
};
