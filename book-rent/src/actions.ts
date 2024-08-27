'use server';
import { cookies } from 'next/headers';
import { mapPermissions, VerifyUserJwt } from './lib/utils';
import { prisma } from './db';
import { User } from '@prisma/client';
import { UserWithPermissions } from './components/UserContextWrapper';

export async function getCurrentUser(): Promise<UserWithPermissions> {
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
			role: true
		}
	});
	const rolePermission = await prisma.permission.findMany({
		where: {
			Role: {
				some: {
					name: fromDb?.role.name
				}
			}
		},
		include: {
			Role: true
		}
	});

	const permission = mapPermissions(rolePermission, fromDb!);

	return {
		...fromDb!,
		id: fromDb!.id,
		permissions: permission,
		fullName: fromDb!.fullName,
		email: fromDb!.email,
		password: fromDb!.password,
		location: fromDb!.location,
		phoneNumber: fromDb!.phoneNumber,
		approved: fromDb!.approved,
		isActive: fromDb!.isActive,
		wallet: fromDb!.wallet,
		roleId: fromDb!.roleId
	} satisfies UserWithPermissions;
}
