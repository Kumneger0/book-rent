import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value ?? headers().get('token')?.split(' ').at(-1);

		const user = await verify<User>(token ?? '');
		if (!user) {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'Unauthorized'
					}
				},
				{ status: 400 }
			);
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

		const isBookPrevioslyExist = await prisma.book.findFirst({
			where: {
				bookName: book.name
			}
		});

		if (isBookPrevioslyExist) {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'book already exist'
					}
				},
				{
					status: 400
				}
			);
		}

		const newBook = await prisma.book.create({
			data: {
				bookName: book.name,
				author: book.author,
				category: book.category,
				bookNo: Math.floor(Math.random() * 1000).toString(),
				ownerId: userFromDB.id,
				price: book.price,
				coverImage: book.base64image,
				quantity: book.quantity
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
