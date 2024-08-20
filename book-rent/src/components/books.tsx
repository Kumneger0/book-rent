'use client';
import { onColumnFiltersChange, useCreateQueryString } from '@/lib/utils';
import { BookTable } from '@/types';
import { Can } from '@casl/react';
import { Box, Switch, Typography } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useUserContext } from './UserContextWrapper';
import { defineAbilty } from '@/abilities';
import { getFuncToUpdate } from './AdminOwnerTable';
import { useDebouncedCallback } from 'use-debounce';

const Example = ({ data }: { data: BookTable[] }) => {
	const searchParams = useSearchParams();
	const createQueryString = useCreateQueryString(searchParams);
	const { user } = useUserContext();
	const ablity = defineAbilty(user!);

	const debouncedOnColumnFiltersChange = useDebouncedCallback(onColumnFiltersChange, 400);

	const pathname = usePathname();
	const router = useRouter();

	const columns = useMemo<MRT_ColumnDef<(typeof data)[number]>[]>(
		() => [
			{ accessorKey: 'bookNo', header: 'No.' },
			{ accessorKey: 'author', header: 'Author' },
			{
				accessorKey: 'owner',
				header: 'Owner',
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
			{ accessorKey: 'category', header: 'Category' },
			{ accessorKey: 'bookName', header: 'Book Name' },
			{
				accessorKey: 'status',
				header: 'Status',

				Cell: ({ cell, row }) => {
					const status = cell.getValue() as string;
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
							<Can this={'Book'} I={'approve'} ability={ablity}>
								<Typography>{row.original.isApproved ? 'active' : 'not active'}</Typography>
								<Switch
									onChange={async (e, checked) => {
										const updateOwner = getFuncToUpdate();
										await updateOwner('/api/books/approve', {
											body: JSON.stringify({
												id: row.original.id,
												isApproved: checked
											}),
											method: 'PUT'
										});
										router.refresh();
									}}
									color="success"
									defaultChecked={row.original.isApproved}
								/>
							</Can>
						</Box>
					);
				}
			}
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		//@ts-ignore
		data: data.map((data) => ({ ...data, owner: data.owner.fullName })),
		enablePagination: false,
		enableFullScreenToggle: false,
		manualFiltering: true,
		onColumnFiltersChange: (data) => {
			debouncedOnColumnFiltersChange({
				createQueryString,
				data,
				pathname,
				router
			});
		},
		enableSorting: false
	});

	return <MaterialReactTable table={table} />;
};

export default Example;
