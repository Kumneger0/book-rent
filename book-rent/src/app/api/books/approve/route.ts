import { prisma } from '@/db';
import { createAblity, getRolePermissions, mapPermissions, verify } from '@/lib/utils';
import { $Enums, User } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

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

		if (ability.can('approve', 'Book')) {
			const { id, isApproved } = (await req.json()) as {
				id: number;
				isApproved: boolean;
			};

			if (isApproved) {
				const isBookOwnerApproved = await prisma.book.findFirst({
					where: {
						id
					},
					include: {
						owner: {
							select: {
								approved: true,
								isActive: true
							}
						}
					}
				});
				if (!isBookOwnerApproved?.owner.isActive || !isBookOwnerApproved.owner.approved) {
					return NextResponse.json({
						status: 'error',
						data: {
							message: 'The owner this book is disabled so you need to enable the owner fisrt '
						}
					});
				}
			}

			const updatedBook = await prisma.book.update({
				where: {
					id: id
				},
				data: {
					isApproved
				}
			});
			return NextResponse.json({
				status: 'success',
				data: {
					data: updatedBook
				}
			});
		}
		return NextResponse.json({
			status: 'error',
			data: {
				message: 'you are no authorized to perform this action'
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
