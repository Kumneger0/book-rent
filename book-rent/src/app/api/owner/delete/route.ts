import { defineAbilty } from '../../../../abilities';
import { prisma } from '../../../../db';
import { verify } from '../../../../lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		if (!token)
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'you need to be logged to delete user'
				}
			});
		const user = await verify<User>(token.value);

		const ablity = defineAbilty(user);

		if (ablity.can('delete', 'User')) {
			const json = (await req.json()) as { id: number };

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

			const approvedUser = await prisma.user.delete({
				where: {
					id: json.id
				}
			});

			return NextResponse.json({
				status: 'success',
				data: {
					message: 'you have successfully deleted the user',
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
