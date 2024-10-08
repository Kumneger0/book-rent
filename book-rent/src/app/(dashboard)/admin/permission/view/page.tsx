import { prisma } from '@/db';
import { baseURL } from '@/lib/utils';
import { APIResponse } from '@/types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

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
		return null;
	}
};

const ViewPermissions: React.FC = async () => {
	const permissions = await getAllPermmissions();
	if (!permissions) return <div>No Permission found</div>;

	return (
		<div>
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
		</div>
	);
};

export default ViewPermissions;
