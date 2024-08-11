import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		const user = await verify<User>(token?.value ?? '');
		if (!user) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Unauthorized'
				}
			});
		}

		const userFromDB = await prisma.user.findUnique({
			where: {
				email: user.email
			}
		});

		if (!userFromDB) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'User not found'
				}
			});
		}

		const book = (await req.json()) as {
			name: string;
			author: string;
			category: 'business' | 'fiction' | 'selfHelp';
			quantity: number;
			price: number;
			file: File;
			base64image: string;
		};

		const newBook = await prisma.book.create({
			data: {
				bookName: book.name,
				author: book.author,
				category: book.category,
				bookNo: Math.floor(Math.random() * 1000).toString(),
				ownerId: userFromDB.id,
				price: book.price,
				coverImage: book.base64image
			}
		});

		return NextResponse.json({
			status: 'success',
			data: {
				message: 'Book uploaded successfully',
				book: newBook
			}
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'Book upload failed'
				}
			},
			{ status: 500 }
		);
	}
}
