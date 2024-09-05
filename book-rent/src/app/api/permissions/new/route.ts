import { verify } from '@/lib/utils';
import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { Permission, Prisma } from '@prisma/client';
import { User } from '@prisma/client';
import { APIResponse } from '@/types';
export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		if (!token)
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'you need to be logged to create new permission'
				}
			});
		const user = await verify<User & { role: { name: string } }>(token.value);
		const { permission } = (await req.json()) as {
			permission: Pick<Permission, 'actions' | 'condition' | 'name' | 'subject'>;
		};

		if (!permission)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'permission is required to create new permission'
					}
				} satisfies APIResponse,
				{ status: 400 }
			);

		const perm = await prisma.permission.create({
			data: {
				name: permission.name,
				actions: permission.actions,
				subject: permission.subject,
				condition: permission.condition as Prisma.InputJsonValue
			}
		});

		return NextResponse.json({
			status: 'success',
			data: {
				message: 'you are sucessfully created new permission',
				data: perm
			}
		});
	} catch (err) {
		return NextResponse.json({
			status: 'error',
			data: {
				message: 'failed to create new permission'
			}
		});
	}
}
