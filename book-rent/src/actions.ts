'use server';

import { cookies } from 'next/headers';
import { VerifyUserJwt } from './lib/utils';
import { prisma } from './db';
import { User } from '@prisma/client';

export async function getCurrentUser() {
	const token = cookies().get('token');
	const user = token?.value ? (VerifyUserJwt(token?.value) as User) : null;

	if (!user) return null;

	const fromDb = await prisma.user.findFirst({
		where: {
			email: user?.email
		},
		include: {
			rentedBooks: true,
			MonthlyIncome: true,
			Book: true,
			Role: true
		}
	});

	return fromDb;
}
