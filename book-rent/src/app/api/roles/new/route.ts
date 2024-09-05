import { prisma } from '@/db';
import { APIResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { name } = (await req.json()) as { name: string };

		if (!name) {
			return NextResponse.json(
				{ status: 'error', message: 'Role name is required' },
				{ status: 400 }
			);
		}

		const newRole = await prisma.role.create({
			data: {
				name
			}
		});

		return NextResponse.json({ status: 'success', data: { data: newRole } }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Failed to create role'
				}
			} satisfies APIResponse,
			{ status: 500 }
		);
	}
}
