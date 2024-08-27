'use client';

import { prisma } from '@/db';
import { mapPermissions } from '@/lib/utils';
import { User } from '@prisma/client';
import { createContext, use } from 'react';

export const UserContext = createContext<{ user: User | null }>({ user: null });

type RentedBook = Awaited<ReturnType<typeof prisma.book.findMany>>;

export type UserWithPermissions =
	| (User & {
			permissions: ReturnType<typeof mapPermissions>;
			rentedBooks: RentedBook;
	  })
	| null;

export default function UserContextWrapper({
	children,
	user
}: {
	children: React.ReactNode;
	user: UserWithPermissions;
}) {
	return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export function useUserContext() {
	const context = use(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserContextWrapper');
	}
	return context as unknown as { user: UserWithPermissions };
}
