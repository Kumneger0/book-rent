import { prisma } from './../../../db/index';
import { FilterSearchParam } from '@/types';

import jsonSchema from '../../../../prisma/json-schema/json-schema.json' assert { type: 'json' };
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { numberFilterModes, stringFilterModes } from '@/lib/utils';

const getColumnType = (modelName: keyof typeof jsonSchema.definitions, columnName: string) => {
	const columnDefinition =
		jsonSchema.definitions[modelName]?.properties?.[
		columnName as keyof (typeof jsonSchema.definitions)[typeof modelName]['properties']
		];
	const isEnum = columnDefinition && 'enum' in columnDefinition;
	return {
		type: isEnum ? ('enum' as const) : columnDefinition?.type,
		values: isEnum ? (columnDefinition.enum as Array<string>) : null
	};
};

function setNestedValue(obj: Record<string, any>, keys: string[], value: any, op: string): void {
	for (let i = 0; i < keys.length - 1; i++) {
		if (!(keys[i] in obj)) {
			obj[keys[i]] = {};
		}
		obj = obj[keys[i]];
	}
	obj[keys[keys.length - 1]] = {
		[op]: value,
		mode: 'insensitive'
	};
}


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

		const filters = JSON.parse(queryParams.get('filters') ?? '{}');

		const model = Object.keys(jsonSchema.definitions).find(
			(key) => key.toLowerCase() == queryParams.get('model')?.toLowerCase()
		) as keyof typeof jsonSchema.definitions;
		const where = validateAndCreateFilter(model, filters);

		console.error('where', where);

		const data = queryParams.get('model') == 'book' ? await getBOOK(where) : await getUser(where);
		return NextResponse.json(JSON.stringify({ data }));
	} catch (err) {
		return NextResponse.json({
			status: 'error',
			data: {
				message: err instanceof Error ? err.message : 'there was an error occured'
			}
		});
	}
};

export function validateAndCreateFilter<PrismaWhereInput extends Record<string, unknown>>(
	modelName: keyof typeof jsonSchema.definitions,
	input: FilterSearchParam
): PrismaWhereInput {
	console.error('modelName', modelName);

	const modelSchema = jsonSchema.definitions[modelName];
	if (!modelSchema) {
		throw new Error(`Schema for model ${modelName} not found`);
	}

	const where = {};

	for (const filter of input) {
		const { column, op, value } = filter;

		const relationFiled = column?.split('.');

		const checkRelationFiledType = (relationFiled: string[]) => {
			let filedType: ReturnType<typeof getColumnType> | null = null;
			for (const key of relationFiled) {
				const pkey = modelSchema.properties[key as keyof typeof modelSchema.properties];
				if (pkey && '$ref' in pkey) {
					const targetModelName = (pkey.$ref as string).split('/').at(-1);
					const targetModel =
						jsonSchema.definitions[targetModelName as keyof typeof jsonSchema.definitions];
					if (!targetModel) {
						throw new Error(`Target model ${targetModelName} not found`);
					}
					const prop =
						targetModel.properties[relationFiled.at(-1) as keyof typeof targetModel.properties];
					if (prop) {
						filedType = getColumnType(
							targetModelName as keyof typeof jsonSchema.definitions,
							relationFiled.at(-1) as string
						);
					}
				}
			}
			return filedType;
		};

		if (relationFiled?.length > 1) {
			const columnType = checkRelationFiledType(relationFiled);
			const stringOprators = stringFilterModes.map(({ pr }) => pr);
			const numberOprators = numberFilterModes.map(({ pr }) => pr)


			const isNumber = columnType?.type === 'integer' || columnType?.type === 'number';
			if (
				columnType?.type == 'string' &&
				!stringOprators.includes(op as (typeof stringOprators)[number])) throw Error('Not valid oprator for string')
			if (isNumber && !numberOprators.includes(op as (typeof numberOprators)[number])) throw Error('Not valid oprator for number')
			setNestedValue(where, relationFiled, value, op);

		}
		const col = modelSchema.properties[column as keyof typeof modelSchema.properties];

		if (!col) {
			console.error('Invalid column:', column);
			continue;
		}

		const { type, values } = getColumnType(modelName, column);

		const filterValue =
			type == 'enum'
				? (values?.find((v) => v.toLowerCase().includes(value.toLowerCase())) as string)
				: value;

		const isNumber = type === 'integer' || type === 'number';
		const parsedValue = isNumber ? Number(value) : value;

		if (isNumber && isNaN(parsedValue as number)) {
			console.error('Invalid number value for column:', column);
			continue;
		}

		if (type == 'enum') {
			(where as Record<string, any>)[column] = {
				equals: filterValue
			};
		} else {
			(where as Record<string, any>)[column] = isNumber
				? { [op]: parsedValue }
				: { [op]: filterValue, mode: 'insensitive' };
		}
	}

	return where as PrismaWhereInput;
}

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
