import { prisma } from './../../../db/index';
import { FilterSearchParam } from '@/types';
import objectPath from 'object-path';
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

function setNestedValue(
	obj: Record<string, any>,
	keys: string[],
	value: any,
	op: string,
	type: string
): void {
	if (type == 'string') {
		objectPath.set(obj, keys.join('.'), {
			[op]: value,
			mode: 'insensitive'
		});
	}
	if (type == 'enum')
		objectPath.set(obj, keys.join('.'), {
			equals: value
		});
	if (type == 'number' || type == 'integer') {
		objectPath.set(obj, keys.join('.'), {
			[op]: Number(value)
		});
	}
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
const isColumnExists = (
	modelName: keyof typeof jsonSchema.definitions,
	columnName: string
): boolean => {
	return columnName in jsonSchema.definitions[modelName]?.properties;
};

const getModelSchema = (BaseModel: Model) => {
	return jsonSchema.definitions[BaseModel];
};

const checkRelationFiledType = (
	relationFiled: string[],
	BaseModel: Model,
	manyToManyRel?: string
) => {
	const modelSchema = getModelSchema(BaseModel);
	if (!modelSchema) {
		throw new Error(`Schema for model ${BaseModel} not found`);
	}

	if (relationFiled.length == 1)
		return {
			...getColumnType(BaseModel, relationFiled[0]),
			isManyToMany: manyToManyRel === 'array'
		};

	const [key, ...rest] = relationFiled;
	const pkey = modelSchema.properties[key as keyof typeof modelSchema.properties];
	let nextModelToCheck: string | null = null;

	if (pkey?.type === 'array' && 'originalType' in pkey) {
		nextModelToCheck = pkey.originalType;
	} else if (pkey && '$ref' in pkey && typeof pkey.$ref === 'string') {
		nextModelToCheck = pkey.$ref.split('/').at(-1) || null;
	}
	if (!nextModelToCheck)
		throw new Error(`There was an error in ur nested query at fields ${relationFiled}`);
	return checkRelationFiledType(rest, nextModelToCheck as Model, pkey.type);
};

type Model = keyof typeof jsonSchema.definitions;

const validateQueryType = (colType: string, op: string) => {
	const stringOprators = stringFilterModes.map(({ pr }) => pr);
	const numberOprators = numberFilterModes.map(({ pr }) => pr);

	const isNumber = colType === 'integer' || colType === 'number';
	if (colType == 'string' && !stringOprators.includes(op as (typeof stringOprators)[number]))
		throw Error('Not valid oprator for string');
	if (isNumber && !numberOprators.includes(op as (typeof numberOprators)[number]))
		throw Error('Not valid oprator for number');
};

export function validateAndCreateFilter<PrismaWhereInput extends Record<string, unknown>>(
	modelName: Model,
	input: FilterSearchParam
): PrismaWhereInput {
	const modelSchema = jsonSchema.definitions[modelName];
	if (!modelSchema) {
		throw new Error(`Schema for model ${modelName} not found`);
	}

	const where = {};

	for (const filter of input) {
		const { column, op, value } = filter;
		const relationFiled = column?.split('.');

		if (relationFiled?.length > 1) {
			const fieldName = relationFiled[0];
			const isKeyExits = isColumnExists(modelName, fieldName);

			if (!isKeyExits)
				throw new Error(`There is no field named ${relationFiled[0]} in model ${modelName}`);

			const columnType = checkRelationFiledType(relationFiled, modelName);
			validateQueryType(columnType.type, op);

			const nestedValues = columnType.isManyToMany
				? (() => {
						const [last, ...rest] = [...relationFiled].reverse();
						return [...rest.reverse(), 'some', last];
				  })()
				: relationFiled;

			setNestedValue(where, nestedValues, value, op, columnType.type);
		}
		const col = modelSchema.properties[column as keyof typeof modelSchema.properties];

		if (!col) {
			console.error('Invalid column:', column);
			continue;
		}

		const { type, values } = getColumnType(modelName, column);

		validateQueryType(type, op);

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



