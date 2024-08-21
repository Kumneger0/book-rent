import { defineAbilty } from '@/abilities';
import { prisma } from '@/db';
import { verify } from '@/lib/utils';
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
		const user = await verify<User>(token.value);

		const ablity = defineAbilty(user);
		const json = (await req.json()) as { id: number; isApprove: boolean };

		const userToApprove = await prisma.user.findFirst({
			where: {
				id: json.id
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

		if (ablity.can('approve', { ...userToApprove, __caslSubjectType__: 'User' })) {
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
