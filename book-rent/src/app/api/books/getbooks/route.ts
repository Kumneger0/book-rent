import { prisma } from '@/db';
import {
	createAblity,
	getRolePermissions,
	mapPermissions,
	validateAndCreateFilter,
	verify
} from '@/lib/utils';
import { FilterSearchParam } from '@/types';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

		console.error('token from cookies', token);

		const user = await verify<User>(token ?? '');
		if (!user) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Unauthorized'
				}
			});
		}

		const userFromDB = await prisma.user.findUnique({
			where: {
				email: user.email
			},
			include: {
				role: true
			}
		});

		if (!userFromDB) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'User not found'
				}
			});
		}

		const userPermissions = await getRolePermissions(userFromDB.role);
		const mappedPermissions = mapPermissions(userPermissions, userFromDB);
		const ability = createAblity(mappedPermissions);

		if (ability.can('manage-all-books', 'Book')) {
			const queryParams = req.nextUrl.searchParams;
			const filterSearchParam = queryParams.get('filter');
			const filter = (
				filterSearchParam ? JSON.parse(decodeURIComponent(filterSearchParam)) : [{}]
			) as FilterSearchParam;
			const bookFilterWhereParam = validateAndCreateFilter('Book', filter);

			const books = await prisma.book.findMany({
				where: bookFilterWhereParam,
				include: {
					owner: {
						select: {
							fullName: true
						}
					}
				},
				orderBy: {
					bookName: 'asc'
				}
			});

			return NextResponse.json({
				status: 'success',
				data: {
					books
				}
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Failed to fetch approved books'
				}
			},
			{ status: 500 }
		);
	}
}
