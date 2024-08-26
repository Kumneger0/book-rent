import { prisma } from '@/db';
import { createAblity, mapPermissions, verify } from '@/lib/utils';
import { $Enums, User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		const user = await verify<User>(token?.value ?? '');
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
				Role: true
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
		const { id, ...data } = (await req.json()) as {
			bookName: string;
			quantity: string;
			category: $Enums.Category;
			price: string;
			id: number;
		};

		/**
		 * now lets try our own book
		 */
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

		const userPermissions = await prisma?.permission?.findMany({
			where: {
				Role: {
					some: {
						name: userFromDB.Role[0].name
					}
				}
			},
			include: {
				Role: true
			}
		});

		const mappedPermissions = mapPermissions(userPermissions, userFromDB);

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
					message: 'successfully uploaded',
					data: updatedBook
				}
			});
		}
		return NextResponse.json({
			status: 'error',
			data: {
				message: 'you are not authorized to perform this action'
			}
		});
	} catch (e) {
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
