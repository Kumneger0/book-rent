import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jsonSchema from '../../../../prisma/json-schema/json-schema.json' assert { type: 'json' };
import { prisma } from './../../../db/index';
import { validateAndCreateFilter } from '@/lib/utils';

export const GET = async (req: NextRequest) => {
	try {
		const queryParams = req.nextUrl.searchParams;

		if (!queryParams.get('model') || !queryParams.get('filters'))
			return NextResponse.json(
				{
					status: 'error',
					data: {
						message: 'please send model name and filers values'
					}
				},
				{ status: 400 }
			);

		const filters = JSON.parse(queryParams.get('filters') ?? `{}`);

		const model = Object.keys(jsonSchema.definitions).find(
			(key) => key.toLowerCase() == queryParams.get('model')?.toLowerCase()
		) as keyof typeof jsonSchema.definitions;
		const where = validateAndCreateFilter(model, filters);
		// const data = await getBOOK(where);
		return NextResponse.json({ where });
	} catch (err) {
		return NextResponse.json(
			{
				status: 'error',
				data: {
					message: err instanceof Error ? err.message : 'there was an error occured'
				}
			},
			{
				status: 500
			}
		);
	}
};

async function getBOOK(where: Prisma.BookWhereInput) {
	const books = await prisma.book.findMany({
		where,
		include: {
			owner: {
				select: { fullName: true }
			}
		}
	});
	return books;
}

async function getUser(where: Prisma.UserWhereInput) {
	const users = await prisma.user.findMany({
		where
	});
	return users;
}
