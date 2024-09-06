import { prisma } from '@/db';
import { createAblity, getRolePermissions, mapPermissions, verify } from '@/lib/utils';
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
				rentedBooks: true,
				role: true
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

		const userPermissions = await getRolePermissions(user.role);
		const mappedPermissions = mapPermissions(userPermissions, user);
		const ablity = createAblity(mappedPermissions);

		if (ablity.can('read', 'Book')) {
			const { bookId } = (await req.json()) as {
				bookId: string;
				authorId: string;
				price: number;
			};

			if (!bookId)
				return NextResponse.json(
					{
						status: 'error',
						data: { message: 'please send bookId' }
					},
					{
						status: 400
					}
				);

			const isAlreayRented = user.rentedBooks.some(({ id }) => id == Number(bookId));

			if (!isAlreayRented) {
				return NextResponse.json(
					{
						status: 'error',
						data: {
							message: "You have't rented this book before"
						}
					},
					{
						status: 403
					}
				);
			}

			const filterbooks = user.rentedBooks
				.map((book) => book.id)
				.filter((id) => id !== Number(bookId))
				.map((id) => ({ id }));

			const updatedUser = await prisma.user.update({
				where: {
					email: decoded.email
				},
				data: {
					rentedBooks: {
						set: filterbooks
					}
				}
			});

			const updateBookQuantity = await prisma.book.update({
				where: {
					id: Number(bookId)
				},
				data: {
					quantity: {
						increment: 1
					}
				}
			});

			return NextResponse.json({
				status: 'success',
				data: {
					message: 'Book rented successfully',
					user: updatedUser,
					increamentBook: updateBookQuantity
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

async function checkBookAvailablityAndUpdate(bookId: number) {
	const book = await prisma.book.findFirst({
		where: {
			id: bookId
		}
	});
	const bookQuatity = book?.quantity;
	if (bookQuatity) {
		const newBookQuantity = await prisma.book.update({
			where: {
				id: bookId
			},
			data: {
				quantity: {
					decrement: 1
				}
			}
		});
		return { status: 'available' } as const;
	}
	return { status: 'not available' } as const;
}
