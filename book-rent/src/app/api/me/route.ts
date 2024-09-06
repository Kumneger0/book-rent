import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

		if (!token) {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'You need to be logged in to access this information'
					}
				},
				{ status: 401 }
			);
		}

		const user = await verify<User & { role: { name: string } }>(token);

		const userWithBalance = await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				MonthlyIncome: {
					select: {
						income: true
					}
				},
				Book: true
			}
		});

		if (!userWithBalance) {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'User not found'
					}
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: 'success',
			data: {
				user: userWithBalance
			}
		});
	} catch (error) {
		console.error('Error fetching user balance:', error);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Internal server error'
				}
			},
			{ status: 500 }
		);
	}
}
