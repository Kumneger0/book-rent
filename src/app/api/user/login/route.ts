import { SignUserJwt, verifyPassword } from '@/lib/utils';

import { cookies } from 'next/headers';

import { prisma } from '@/db';
import { UserTypeLOGIN } from '@/types';

export const POST = async (req: Request) => {
	const body = (await req?.json()) as unknown as UserTypeLOGIN;
	const originalPassword = body.password;
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email
			}
		});

		if (!user)
			return new Response(
				JSON.stringify({
					status: 'err',
					data: { message: 'no user found with this email' }
				}),
				{ status: 400 }
			);

		const { password, ...userWithoutPass } = user;

		const isPasswordMatch = await verifyPassword(originalPassword, password);

		if (!isPasswordMatch)
			return new Response(
				JSON.stringify({
					status: 'error',
					data: { message: 'you password is not correct' }
				}),
				{ status: 400 }
			);

		const token = SignUserJwt(userWithoutPass);

		cookies().set('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7
		});

		return new Response(
			JSON.stringify({
				status: 'success',
				data: { message: 'now you are logged' }
			})
		);
	} catch (err) {
		return new Response(
			JSON.stringify({
				status: 'error',
				data: { message: 'internal server error' }
			}),
			{ status: 500 }
		);
	}
};
