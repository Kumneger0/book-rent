import { prisma } from '@/db';
import { createAblity, mapPermissions, verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		if (!token)
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'you need to be logged to approve owner'
				}
			});
		const user = await verify<User & { role: { name: string } }>(token.value);
		const role = user.role.name;
		const permissions = await prisma.role.findMany({
			where: {
				name: role
			},
			include: {
				permissions: {
					include: {
						Role: true
					}
				}
			}
		});
		const json = (await req.json()) as { id: number; isApprove: boolean };

		const userToApprove = await prisma.user.findFirst({
			where: {
				id: json.id
			},
			include: {
				role: true
			}
		});

		if (!userToApprove)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'user not found'
					}
				},
				{ status: 400 }
			);

		const flattenedPermissions = permissions.flatMap((role) => role.permissions);

		const mappedPermissions = mapPermissions(flattenedPermissions, userToApprove);

		console.error('mapped permissions', mappedPermissions);

		const ability = createAblity(mappedPermissions);

		if (ability.can('approve', { ...userToApprove, __caslSubjectType__: 'User' })) {
			if (!json?.id)
				return NextResponse.json(
					{
						status: 'error',
						data: {
							message: 'please send both id and isApprove Boolean'
						}
					},
					{ status: 400 }
				);

			const approvedUser = await prisma.user.update({
				where: {
					id: json.id
				},
				data: {
					approved: json.isApprove
				}
			});

			return NextResponse.json({
				status: 'success',
				data: {
					message: 'you have successfully approved the user',
					owner: approvedUser
				}
			});
		}
		return NextResponse.json({
			status: 'error',
			data: {
				message: 'you are not authorized to perform this action'
			}
		});
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
