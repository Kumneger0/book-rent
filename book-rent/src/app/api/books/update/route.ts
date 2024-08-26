import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { $Enums, User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { AppAbility, defineAbilty, defineOwnerAblity } from '@/abilities';
import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';

type PermissionType = {
	actions: 'update' | 'delete' | 'disable' | 'approve';
	subject: 'Book' | 'User';
	reason: string;
	condition: {
		ownerId?: number;
		role?: string;
	} & Record<string, any>;
	name: string;
	role: 'owner' | 'admin';
};

type Permission = {
	actions: PermissionType['actions'];
	subject: PermissionType['subject'];
	condition: PermissionType['condition'];
	name: PermissionType['name'];
	role: PermissionType['role'];
};

function createAblity(permissions: Permission[]) {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

	permissions?.forEach(({ actions, condition, subject }) => {
		can(actions, subject, condition ?? {});
	});
	return build();
}

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

		const userPermisssion = (
			await prisma?.permission?.findMany({
				where: {
					role: user.role
				}
			})
		)?.map(({ updatedAt, createdAt, ...p }) => {
			return {
				...p,
				subject: p.subject as PermissionType['subject'],
				actions: p.actions as PermissionType['actions'],
				role: p.role as PermissionType['role'],
				condition: JSON.parse(JSON.stringify(p.condition), (key, value) => {
					if (key === 'ownerId') {
						return userFromDB.id;
					}
					if (key == 'role') {
						return userFromDB.role;
					}

					return value;
				})
			} satisfies Permission;
		});

		console.error('user permisssion', userPermisssion);

		const ability = createAblity(userPermisssion);

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
