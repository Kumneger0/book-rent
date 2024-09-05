import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const books = await prisma.book.findMany({
			where: {
				isApproved: true,
				quantity: {
					gt: 0
				}
			},
			select: {
				id: true,
				bookName: true,
				author: true,
				category: true,
				price: true,
				quantity: true,
				coverImage: true,
				isApproved: true
			}
		});

		return NextResponse.json({
			status: 'success',
			data: {
				books
			}
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Failed to fetch approved books'
				}
			},
			{ status: 500 }
		);
	}
}
