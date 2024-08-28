import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
	try {
		const roles = await prisma.role.findMany({
			include: {
				permissions: true
			}
		});
		return NextResponse.json({ status: 'success', data: { data: roles } }, { status: 200 });
	} catch (error) {
		console.error('Error fetching roles:', error);
		return NextResponse.json(
			{ status: 'error', data: { message: 'Failed to fetch roles' } },
			{ status: 500 }
		);
	}
}
