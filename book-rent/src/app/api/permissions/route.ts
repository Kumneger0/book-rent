// write a nextjs get endpoint to get list of all available permission

import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
	try {
		const allPermissions = await prisma.permission.findMany({
			include: {
				Role: true
			}
		});

		return NextResponse.json({
			status: 'success',
			data: {
				data: allPermissions
			}
		});
	} catch (err) {
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'internal server error'
				}
			},
			{ status: 500 }
		);
	}
};
