import { prisma } from '@/db';
import { createAblity, mapPermissions, verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

		if (!token)
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'you need to be logged to disable owner'
				}
			});
		const user = await verify<User & { role: { name: string; id: number } }>(token);

		const json = (await req.json()) as { id: number; isActive: boolean };

		if (!user) throw new Error('user not found');

		const role = user?.role.name;

		const userPermissions = await prisma?.permission?.findMany({
			where: {
				Role: {
					some: {
						name: role
					}
				}
			},
			include: {
				Role: true
			}
		});

		const mappedPermissions = mapPermissions(userPermissions, user);

		const ablity = createAblity(mappedPermissions);

		const userToDisable = await prisma.user.findFirst({
			where: {
				id: json.id
			}
		});

		if (!userToDisable)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'user not found'
					}
				},
				{ status: 400 }
			);

		if (ablity.can('disable', { ...userToDisable, __caslSubjectType__: 'User' })) {
			if (!json?.id)
				return NextResponse.json(
					{
						status: 'error',
						data: {
							message: 'please send both id and isActive Boolean'
						}
					},
					{ status: 400 }
				);

			const disabledOwner = await prisma.user.update({
				where: {
					id: json.id
				},
				data: {
					isActive: json.isActive
				},
				include: {
					Book: {
						select: {
							isApproved: true
						}
					}
				}
			});

			if (!json.isActive) await disableOwnerBooks(json.id);

			return NextResponse.json({
				status: 'success',
				data: {
					message: 'you have successfully updated',
					owner: disabledOwner
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
			{ status: 403 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({
			status: 'error',
			data: {
				message: 'internal server error'
			}
		});
	}
}
async function disableOwnerBooks(ownerId: number) {
	const updteResult = await prisma.book.updateMany({
		where: {
			ownerId
		},
		data: {
			isApproved: false
		}
	});
}
