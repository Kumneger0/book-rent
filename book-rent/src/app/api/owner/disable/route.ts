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
					message: 'you need to be logged to disable owner'
				}
			});
		const user = await verify<User>(token.value);

		const ablity = defineAbilty(user);

		if (ablity.can('disable', 'User')) {
			const json = (await req.json()) as { id: number; isActive: boolean };

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
