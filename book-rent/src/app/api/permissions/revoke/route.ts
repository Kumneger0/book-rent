import { prisma } from '@/db';
import { APIResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
	try {
		const { permissionIds, roleId } = (await req.json()) as {
			permissionIds: string[];
			roleId: number;
		};
		if (!permissionIds)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'please provide permission ids'
					}
				},
				{ status: 400 }
			);

		const role = await prisma.role.findFirst({
			where: {
				id: roleId
			}
		});
		if (!role) {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'No role found with the given id'
					}
				},
				{ status: 400 }
			);
		}
		const updatedRole = await prisma.role.update({
			where: { id: roleId },
			data: {
				permissions: {
					disconnect: permissionIds.map((id) => ({ id: Number(id) }))
				}
			}
		});
		return NextResponse.json({
			status: 'success',
			data: {
				message: 'successfully revoked the permission'
			}
		} satisfies APIResponse);
	} catch (error) {
		return NextResponse.json(
			{ status: 'error', message: 'Internal server error' },
			{ status: 500 }
		);
	}
};
