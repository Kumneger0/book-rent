import { defineAbilty } from '@/abilities';
import { prisma } from '@/db';
import { verify } from '@/lib/utils';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	try {
		const token = req.cookies.get('token');
		const decoded = await verify<User>(token?.value ?? '');
		if (!decoded) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'Unauthorized'
				}
			});
		}

		const user = await prisma.user.findFirst({
			where: {
				email: decoded.email
			},
			include: {
				rentedBooks: true
			}
		});

		if (!user) {
			return NextResponse.json({
				status: 'error',
				data: {
					message: 'User not found'
				}
			});
		}

		const ablity = defineAbilty(user);

		if (ablity.can('rent', 'Book')) {
			const { bookId, authorId, price } = (await req.json()) as {
				bookId: string;
				authorId: string;
				price: number;
			};

			if (!bookId || !authorId || !price)
				return NextResponse.json(
					{
						status: 'error',
						data: { message: 'please send nessary details to rent' }
					},
					{
						status: 400
					}
				);

			const isAlreayRented = user.rentedBooks.some(({ id }) => id == Number(bookId));

			if (isAlreayRented) {
				return NextResponse.json(
					{
						status: 'error',
						data: {
							message: 'You alredy rented this book before'
						}
					},
					{
						status: 403
					}
				);
			}

			const result = await increaseAuthorIncome(Number(authorId), Number(price));

			const updatedRentedBooks = [...user.rentedBooks.map((book) => book.id), Number(bookId)];

			const updatedUser = await prisma.user.update({
				where: {
					email: decoded.email
				},
				data: {
					rentedBooks: {
						connect: updatedRentedBooks.map((id) => ({ id }))
					}
				}
			});

			return NextResponse.json({
				status: 'success',
				data: {
					message: 'Book rented successfully',
					user: updatedUser
				}
			});
		} else {
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: "You don't have permission to rent books"
					}
				},
				{ status: 403 }
			);
		}
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: 'An error occurred while processing your request'
				}
			},
			{ status: 500 }
		);
	}
}

async function increaseAuthorIncome(authorId: number, price: number) {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();

	const upgradedIncome = await prisma.monthlyIncome.findFirst({
		where: {
			userId: {
				equals: authorId
			},
			year,
			month
		}
	});

if (upgradedIncome) {
		await prisma.monthlyIncome.update({
			where: {
				id: upgradedIncome.id
			},
			data: {
				income: {
					increment: price
				}
			}
		});
		return { status: 'incremneted', income: upgradedIncome };
	}
	const newIncome = await prisma.monthlyIncome.create({
		data: {
			userId: authorId,
			month,
			year,
			income: price
		}
	});
	return { status: 'incremneted', income: newIncome };
}
