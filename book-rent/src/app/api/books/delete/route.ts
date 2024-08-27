import { prisma } from '@/db';
import { createAblity, getRolePermissions, mapPermissions, verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
	try {
		const token = req.cookies.get('token');
		const decoded = await verify<User>(token?.value ?? '');
		if (!decoded) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Unauthorized'
				}
			});
		}

		const user = await prisma.user.findFirst({
			where: {
				email: decoded.email
			},
			include: {
				role: true
			}
		});

		if (!user) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'User not found'
				}
			});
		}
		const { id } = (await req.json()) as { id: string };

		const userBook = await prisma.book.findFirst({
			where: {
				id: Number(id)
			}
		});

		if (!userBook) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Book not found'
				}
			});
		}

		const userPermissions = await getRolePermissions(user.role);
		const mappedPermissions = mapPermissions(userPermissions, user);
		const ability = createAblity(mappedPermissions);

		if (ability.can('delete', { ...userBook, __caslSubjectType__: 'Book' })) {
			if (!id)
				return NextResponse.json({
					status: 'error',
					data: {
						message: 'please send id of book '
					}
				});
			await prisma.book.delete({
				where: {
					id: Number(id)
				}
			});
			return NextResponse.json(
				{
					status: 'success',
					data: {
						message: 'the book has been deleted successfully'
					}
				},
				{ status: 200 }
			);
		}
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'you are not authorized to perform this action'
				}
			},
			{ status: 403 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'internal server error'
				}
			},
			{
				status: 500
			}
		);
	}
};
