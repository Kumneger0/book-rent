import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { put, PutBlobResult } from '@vercel/blob';
import { clear } from 'console';

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
		};

		const { searchParams } = new URL(req?.url);
		const filename = searchParams.get('filename');

		let blob: PutBlobResult | { url: string } = {
			url: 'https://placeholder.com/600x400'
		};
		const abortController = new AbortController();
		// try {
		//   blob = await put(filename!, req.body!, {
		//     access: "public",
		//     abortSignal: abortController.signal,
		//   });
		// } catch (e) {
		//   blob = { url: "https://placeholder.com/600x400" };
		//   console.log(e);
		// }

		// console.log(blob);

		// const timeout = setTimeout(() => {
		//   abortController.abort();
		//   console.log("Upload aborted");
		// }, 5000);

		// clearTimeout(timeout);

		const newBook = await prisma.book.create({
			data: {
				bookName: book.name,
				author: book.author,
				category: book.category,
				bookNo: Math.floor(Math.random() * 1000).toString(),
				ownerId: userFromDB.id,
				price: book.price
				// coverImage: blob?.url,
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
