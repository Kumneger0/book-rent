import { prisma } from '@/db';
import { APIResponse } from '@/types';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

export const baseURL =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:4000'
		: 'https://book-rent-challenge.vercel.app';

type Permissions = Awaited<ReturnType<typeof prisma.permission.findMany>>;
const getAllPermmissions = async (): Promise<Permissions | null> => {
	try {
		const response = await fetch(`${baseURL}/api/permissions`, { cache: 'no-store' });
		if (response.ok) {
			const { data } = (await response.json()) as APIResponse;
			const permissions = (data as unknown as { data: Permissions }).data;
			return permissions;
		}
		return null;
	} catch (err) {
		console.error(err);
		return null;
	}
};
const ViewPermissions: React.FC = async () => {
	const permissions = await getAllPermmissions();
	if (!permissions) return <Box>No Permission found</Box>;

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Permissions List
			</Typography>
			<List>
				{permissions.map((permission, index) => (
					<ListItem key={index}>
						<ListItemText
							primary={permission.name}
							secondary={
								<>
									<Typography component="span" display="block">
										Subject: {permission.subject}
									</Typography>
									<Typography component="span" display="block">
										Actions: {permission.actions}
									</Typography>
									<Typography component="span" display="block">
										Condition:{' '}
										{permission.condition ? JSON.stringify(permission.condition) : 'No condition'}
									</Typography>
								</>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default ViewPermissions;
