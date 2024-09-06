import { hashPassword } from '@/lib/utils';

import { prisma } from '@/db';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';

export const POST = async (req: NextRequest) => {
	const body = (await req?.json()) as unknown as User & {
		confirmPassword: string;
		terms: string;
		role: string;
	};

	const { confirmPassword, terms, role: roleName, ...userData } = body;

	if (!userData)
		return new Response(
			JSON.stringify({
				status: 'error',
				data: { message: 'please fill out the form' }
			}),
			{ status: 400 }
		);

	try {
		const originalPassword = userData.password;
		const hashedPassWord = await hashPassword(originalPassword);

		const user = await prisma.user.findFirst({
			where: {
				email: userData.email
			}
		});

		if (user) {
			return new Response(
				JSON.stringify({
					status: 'error',
					data: { message: 'user already exists' }
				}),
				{ status: 400 }
			);
		}

		const role = await prisma.role.findFirst({
			where: {
				name: roleName
			}
		});

		const newUser = await prisma.user.create({
			data: {
				...userData,
				password: hashedPassWord,
				role: {
					connect: {
						id: role?.id
					}
				}
			}
		});
		return new Response(
			JSON.stringify({
				status: 'success',
				data: {
					message: 'user created successfully',
					user: newUser
				}
			}),
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({
				status: 'error',
				data: { message: 'internal server error' }
			}),
			{ status: 500 }
		);
	}
};
