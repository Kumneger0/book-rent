import AdminOwnerTable from '@/components/AdminOwnerTable';
import SharedHeader from '@/components/sharedHead';
import { prisma } from '@/db';
import { validateAndCreateFilter } from '@/lib/utils';
import { Box } from '@mui/material';
import { Prisma } from '@prisma/client';

// location;

async function Owners({ searchParams }: { searchParams: Record<string, string> }) {
	const where = validateAndCreateFilter<Prisma.UserWhereInput>('User', searchParams);

	const owners = (
		await prisma.user.findMany({
			where,
			include: {
				Book: true,
				role: true
			},
			orderBy: {
				fullName: 'asc'
			}
		})
	).map((owner) => {
		return {
			id: owner.id,
			no: owner.id,
			action: owner.approved ? 'approve' : 'review',
			owner: owner.fullName,
			status: owner.isActive ? 'active' : 'not active',
			upload: owner.Book.length,
			location: owner.location,
			approved: owner.approved
		} satisfies {
			id: string | number;
			no: number;
			owner: string;
			upload: number;
			location: string;
			status: string;
			action: string;
			approved: boolean;
		};
	});

	return (
		<Box sx={{ flexGrow: 1 }}>
			<SharedHeader>Admin/owners</SharedHeader>
			<Box sx={{ p: 2, borderRadius: 1, boxShadow: 1, backgroundColor: 'white' }}>
				<h3>List of Owners</h3>
				<AdminOwnerTable data={owners} />
			</Box>
		</Box>
	);
}

export default Owners;
