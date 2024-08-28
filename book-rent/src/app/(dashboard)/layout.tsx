import Sidebar from '@/components/sidebar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { Box, CssBaseline } from '@mui/material';
import React from 'react';

import { VerifyUserJwt } from '@/lib/utils';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import HomeIcon from '@mui/icons-material/Home';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';

const lists = {
	admin: [
		{
			itemName: 'Dashboard',
			icon: <SpaceDashboardOutlinedIcon />,
			href: '/admin/dashboard'
		},
		{
			itemName: 'Books',
			icon: <LibraryBooksRoundedIcon />,
			href: '/admin/books'
		},
		{
			itemName: 'Owners',
			icon: <AccountCircleOutlinedIcon />,
			href: '/admin/owners'
		},
		{
			itemName: 'Permission',
			icon: <ControlPointRoundedIcon />,
			href: '/admin/permission'
		},
		{
			itemName: 'Roles',
			icon: <ControlPointRoundedIcon />,
			href: '/admin/roles'
		}
	],
	owner: [
		{
			itemName: 'Dashboard',
			icon: <SpaceDashboardOutlinedIcon />,
			href: '/owner/dashboard'
		},
		{
			itemName: 'Book upload',
			icon: <LibraryBooksRoundedIcon />,
			href: '/owner/book-upload'
		},
		{
			itemName: 'Others',
			icon: <ControlPointRoundedIcon />,
			href: '/owner/others'
		},
		{
			itemName: 'Others',
			icon: <ControlPointRoundedIcon />,
			href: '/owner/others'
		}
	],
	user: [
		{ itemName: 'Home', icon: <HomeIcon />, href: '/' },

		{
			itemName: 'Rented Books',
			icon: <LibraryBooksRoundedIcon />,
			href: '/user/rented-books'
		}
	]
};

async function App({ children }: { children: React.ReactNode }) {
	const token = cookies().get('token');
	const decoded = VerifyUserJwt<User & { role: { name: keyof typeof lists } }>(token?.value ?? '');

	const role = decoded?.role.name ?? 'user';
	const sidebarList = lists[role];

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar role={role} lists={sidebarList} />
			<Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '1600px', mx: 'auto' }}>
				{children}
			</Box>
		</Box>
	);
}

export default App;
