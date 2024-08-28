import { prisma } from '@/db';
import { APIResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
	try {
		const { permissionId, roleId } = (await req.json()) as {
			permissionId: number;
			roleId: number;
		};
		const permission = await prisma.permission.findFirst({
			where: {
				id: Number(permissionId)
			}
		});
		if (!permission)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'no permission found with the given id'
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
					disconnect: { id: Number(permissionId) }
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
		console.error(error);
		return NextResponse.json(
			{ status: 'error', message: 'Internal server error' },
			{ status: 500 }
		);
	}
};
