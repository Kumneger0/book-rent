import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verify } from './lib/utils';
import { User } from '@prisma/client';



export async function middleware(req: NextRequest) {
	try {
		const token = req.cookies.get('token');

		if (!token) return NextResponse.redirect(new URL('/login', req.url));

		const user = await verify<User & { role: { name: string } }>(token?.value);

		const role = user?.role.name;

		if (!user) return NextResponse.redirect(new URL('/login', req.url));

		const pathname = req.nextUrl.pathname;

		if (!pathname.startsWith(`/${role}`)) {
			return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
		}

		return NextResponse.next();
	} catch (err) {
		return NextResponse.next();
	} finally {
	}
}

export const config = {
	matcher: ['/admin/:path*', '/owner/:path*', '/user/:path*']
};
