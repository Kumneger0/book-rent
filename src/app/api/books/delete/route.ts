import { defineAbilty } from '@/abilities';
import { prisma } from '@/db';
import { verify } from '@/lib/utils';
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

		const ablity = defineAbilty(user);

		if (ablity.can('delete', 'Book')) {
			const { id } = (await req.json()) as { id: string };
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
