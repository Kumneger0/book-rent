import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
	try {
		const { permissions, roleId } = (await req.json()) as {
			permissions: { id: number }[];
			roleId: number;
		};
		const role = await prisma.role.findFirst({
			where: {
				id: Number(roleId)
			},
			include: {
				permissions: true
			}
		});
		if (!role)
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'no role found with the given id'
					}
				},
				{ status: 400 }
			);
		const updatedRole = await prisma.role.update({
			where: { id: roleId },
			data: {
				permissions: {
					connect: permissions.map((permission) => ({ id: Number(permission.id) }))
				}
			},
			include: {
				permissions: true
			}
		});
		return NextResponse.json({
			status: 'success',
			data: {
				role: updatedRole
			}
		});
	} catch (err) {
		return NextResponse.json({
			status: 'error',
			data: {
				message: err instanceof Error ? err.message : 'Filed to assign permissions'
			}
		});
	}
};
