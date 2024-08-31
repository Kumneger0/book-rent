'use client';
import { FilterModes, onColumnFiltersChange, useCreateQueryString } from '@/lib/utils';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type TableAdmin = {
	No: string;
	BookNo: string | number;
	Owner: string;
	status: 'rented' | 'free';
	price: string;
};

const Example = ({ data }: { data: TableAdmin[] }) => {
	const searchParams = useSearchParams();
	const createQueryString = useCreateQueryString(searchParams);
    const [filterData, setFilerData] = useState<{ id: string; value: string }[]>([]);
		const [selectedColmunFilterMode, setSelectedColmunFilterMode] = useState<
			{ column: string; mode: FilterModes }[]
		>([]);

		const debouncedOnColumnFiltersChange = useDebouncedCallback(onColumnFiltersChange, 400);
		const pathname = usePathname();
		const router = useRouter();

		const columnFilterState = Array.from(searchParams.keys()).map((key) => ({
			id: key,
			value: searchParams.get(key)
		}));

		const columns = useMemo<MRT_ColumnDef<TableAdmin>[]>(
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
					accessorKey: 'Owner',
					header: 'Owner',
					size: 200,
					Cell(props) {
						const owner = props.cell.getValue() as string;
						return (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
									padding: '0.5rem',
									color: 'green',
									borderRadius: '0.5rem'
								}}
							>
								<Image
									style={{ borderRadius: '50%' }}
									src={`https://api.dicebear.com/9.x/initials/svg?seed=${owner}`}
									width={50}
									height={50}
									alt="avatar"
								/>
								<Typography>{owner}</Typography>
							</Box>
						);
					}
				},
				{
					accessorKey: 'status',
					header: 'Status',
					size: 100,
					Cell(props) {
						const status = props.cell.getValue() as string;
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
				}
			],
			[]
		);

		const table = useMaterialReactTable({
			columns,
			data,
			enablePagination: false,
			enableFullScreenToggle: false,
			manualFiltering: true,
			enableColumnFilterModes: true,
			onColumnFiltersChange: (data) => {
				setFilerData((prv) => {
					const filter = (typeof data === 'function' ? data([]) : []) as {
						id: string;
						value: string;
					}[];
					const merged = prv.length ? [...prv, ...filter] : filter;
					return merged
						.reverse()
						.filter((item, i) => i == merged.findIndex((it) => item.id == it.id));
				});
				debouncedOnColumnFiltersChange({
					createQueryString,
					getFilterData: () => filterData,
					pathname,
					router,
					model: 'Book',
					selectedColmunFilterModes: selectedColmunFilterMode
				});
			},
			state: {
				columnFilters: columnFilterState
			},
			enableSorting: false
		});

	return <MaterialReactTable table={table} />;
};

export default Example;
