'use client';
import {
	FilterModes,
	numberFilterModes,
	onColumnFiltersChange,
	onFilterModeChange,
	stringFilterModes,
	useCreateQueryString
} from '@/lib/utils';
import { APIResponse } from '@/types';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { $Enums } from '@prisma/client';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import BasicModal from './editBook';

export type TableProps = {
	data: {
		id: number;
		No: string;
		bookNo: number;
		bookName: string;
		status: 'rented' | 'free' | 'waiting approval';
		price: string;
		category: $Enums.Category;
	}[];
};

type TableDataItem = TableProps['data'][number];
type TableDataKeys = keyof TableDataItem;

const nums = ['id', 'No', 'price', 'BookNo'].map((item) => item.toLowerCase());

export const TableOwner = ({ data }: TableProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [selectedColmunFilterMode, setSelectedColmunFilterMode] = useState<
		{ column: string; mode: FilterModes }[]
	>(() => {
		if (!data?.[0]) return [];
		return Object.keys(data?.[0])?.map((key) => {
			if (nums.includes(key.toLowerCase()))
				return { column: key, mode: 'equals' as unknown as FilterModes };
			return { column: key, mode: 'contains' as unknown as FilterModes };
		});
	});

	const [filterData, setFilerData] = useState<{ id: string; value: string }[]>([]);

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
				accessorKey: 'bookNo',
				header: 'Book No',
				size: 100,
				renderColumnFilterModeMenuItems: ({ column, onSelectFilterMode }) =>
					numberFilterModes.map(({ name, pr }) => (
						<MenuItem
							onClick={() => {
								onFilterModeChange<TableDataKeys>({
									column: 'bookNo',
									mode: pr,
									onSelectFilterMode,
									setSelectedColmunFilterMode
								});
							}}
							key={name}
						>
							{name}
						</MenuItem>
					))
			},
			{
				accessorKey: 'bookName',
				header: 'Book Name',
				size: 200,
				renderColumnFilterModeMenuItems: ({ column, onSelectFilterMode }) =>
					stringFilterModes.map(({ name, pr }) => (
						<MenuItem
							onClick={() =>
								onFilterModeChange<TableDataKeys>({
									column: 'bookName',
									mode: pr,
									onSelectFilterMode,
									setSelectedColmunFilterMode
								})
							}
							key={name}
						>
							{name}
						</MenuItem>
					))
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
				size: 100,
				renderColumnFilterModeMenuItems: ({ column, onSelectFilterMode }) =>
					numberFilterModes.map((mode) => (
						<MenuItem
							onClick={() =>
								onFilterModeChange<TableDataKeys>({
									column: 'price',
									mode: mode.pr,
									onSelectFilterMode,
									setSelectedColmunFilterMode
								})
							}
							key={mode.name}
						>
							{mode.name}
						</MenuItem>
					))
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
		enableColumnFilterModes: true,
		manualFiltering: true,
		onColumnFiltersChange: (data) => {
			const filter = (typeof data === 'function' ? data([]) : []) as {
				id: string;
				value: string;
			}[];

         console.error('filter', filter)

			const merged = filterData.length ? [...filterData, ...filter] : filter;
			const userFilterData = merged
				.reverse()
				.filter((item, i) => i == merged.findIndex((it) => item.id == it.id));

			setFilerData(userFilterData);
			debouncedOnColumnFiltersChange({
				createQueryString,
				getFilterData: () => userFilterData,
				pathname,
				router,
				model: 'User',
				selectedColmunFilterModes: selectedColmunFilterMode
			});
		},

		state: {
			columnFilters: columnFilterState
		}
	});

	return (
		<>
			<MaterialReactTable table={table} />
		</>
	);
};
