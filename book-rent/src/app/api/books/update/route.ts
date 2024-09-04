import { prisma } from '@/db';
import { createAblity, getRolePermissions, mapPermissions, verify } from '@/lib/utils';
import { $Enums, User } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

		const user = await verify<User>(token ?? '');

		console.error('user id', user.id);

		if (!user) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Unauthorized'
				}
			});
		}
		const { id, ...data } = (await req.json()) as {
			bookName: string;
			quantity: string;
			category: $Enums.Category;
			price: string;
			id: number;
		};

		const userFromDB = await prisma.user.findUnique({
			where: {
				id: Number(user.id)
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

		const userBook = await prisma.book.findFirst({
			where: {
				id: id
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

		const userPermissions = await getRolePermissions(userFromDB.role);

		const mappedPermissions = mapPermissions(userPermissions, userFromDB);

		console.error('mappedpersmiison', mappedPermissions);

		const ability = createAblity(mappedPermissions);
		if (ability.can('update', { ...userBook, __caslSubjectType__: 'Book' })) {
			const updatedBook = await prisma.book.update({
				where: {
					id: id
				},
				data: {
					...data,
					quantity: Number(data.quantity),
					price: Number(data.price)
				}
			});
			return NextResponse.json({
				status: 'success',
				data: {
					message: 'successfully updated',
					data: updatedBook
				}
			});
		}
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'you are not authorized to perform this action'
				}
			},
			{ status: 400 }
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Book upload failed'
				}
			},
			{ status: 500 }
		);
	}
}
