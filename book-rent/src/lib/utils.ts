import { prisma } from '@/db';
import { env } from '@/env';
import {
	APIResponse,
	AppAbility,
	EarningsSummaryChartProps,
	FilterSearchParam,
	Permission,
	PermissionType
} from '@/types';
import { AbilityBuilder } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { $Enums, Book, Permission as PermissionModel, Prisma, Role, User } from '@prisma/client';
import crypto from 'crypto';
import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';
import { MRT_FilterOption } from 'material-react-table';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import objectPath from 'object-path';

import jsonSchema from '../../prisma/json-schema/json-schema.json' assert { type: 'json' };

export const numberFilterModes = [
	{ pr: 'equals', name: 'Equals' },
	{ pr: 'not', name: 'Not Equals' },
	{ pr: 'gt', name: 'Greater Than' },
	{ pr: 'gte', name: 'Greater Than or Equal To' },
	{ pr: 'lt', name: 'Less Than' },
	{ pr: 'lte', name: 'Less Than or Equal To' },
	{ pr: 'in', name: 'Between' },
	{ pr: 'in', name: 'Between Inclusive' },
	{ pr: 'isNull', name: 'Is Empty' },
	{ pr: 'isNotNull', name: 'Is Not Empty' }
] as const;

export const stringFilterModes = [
	{ pr: 'contains', name: 'Contains' },
	{ pr: 'equals', name: 'Equals' },
	{ pr: 'startsWith', name: 'Starts With' },
	{ pr: 'endsWith', name: 'Ends With' },
	{ pr: 'isNull', name: 'Is Empty' },
	{ pr: 'isNotNull', name: 'Is Not Empty' },
	{ pr: 'not', name: 'Not Equals' },
	{ pr: 'not', name: 'Not Contains' }
] as const;

const filerModes = [...stringFilterModes, ...numberFilterModes];

export type FilterModes = (typeof filerModes)[number]['pr'];

export const baseURL =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:4000'
		: 'https://book-rent-challenge.vercel.app';

export function hashPassword(password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(password, env.SALT, 1000, 64, 'sha512', (err, derivedKey) => {
			if (err) reject(err);
			const pass = env.SALT + ':' + derivedKey.toString('hex');
			resolve(pass);
		});
	});
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(':');

		crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
			if (err) reject(err);
			resolve(key === derivedKey.toString('hex'));
		});
	});
}

export const UserSchema = z
	.object({
		fullName: z.string().min(5, { message: 'please provide your name ' }),
		email: z.string().email().min(1, { message: 'please provide valid email please' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string(),
		location: z.string(),
		phoneNumber: z.string(),
		role: z.enum(['user', 'admin', 'owner']).optional(),
		terms: z.enum(['on'], { message: 'you need to accept our terms policy' })
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['confirmPassword']
			});
		}
	});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	remember: z.enum(['on']).optional()
});

export function SignUserJwt<T extends Record<string, unknown>>(user: T) {
	const token = jwt.sign(user, env.JWTPRIVATEKEY as string, {
		expiresIn: '7d'
	});
	return token;
}

export function VerifyUserJwt<T extends Record<string, unknown>>(token: string | undefined) {
	if (!token) return null;
	try {
		const user = jwt.verify(token, env.JWTPRIVATEKEY);
		return user as T;
	} catch (err) {
		return null;
	}
}

export async function verify<T extends Record<string, unknown>>(token: string): Promise<T> {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(env.JWTPRIVATEKEY));

	return payload as T;
}

export async function getUser(email: string | undefined) {
	if (!email) return null;
	const user = await prisma.user.findFirst({
		where: {
			email: email
		}
	});
	return user;
}

export const addBookSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	author: z.string().min(1, 'Author is required'),
	category: z.string().min(1, 'Category is required')
});

type ParamType = { name: string; value: string };

export function useCreateQueryString(
	searchParams: ReadonlyURLSearchParams
): (
	param: ParamType[] | ParamType,
	selectedColmunFilterModes: { column: string; mode: FilterModes }[]
) => string {
	return (
		param: ParamType[] | ParamType,
		selectedColmunFilterModes: {
			column: string;
			mode: FilterModes;
		}[]
	) => {
		console.error('selected column filter modes', selectedColmunFilterModes);
		const params = new URLSearchParams(searchParams.toString());
		if (Array.isArray(param)) {
			const filters = param.map(({ value, name }) => {
				const filter = selectedColmunFilterModes.find(
					({ column, mode }) => column.toLowerCase() == name.toLowerCase()
				);
				return {
					op: filter?.mode,
					column: filter?.column,
					value
				};
			});
			params.set('filters', encodeURIComponent(JSON.stringify(filters)));
		}
		if (!Array.isArray(param)) {
			const filter = selectedColmunFilterModes.find(
				({ column, mode }) => column.toLowerCase() == param.name.toLowerCase()
			);

			params.set(
				'filters',
				encodeURIComponent(
					JSON.stringify({
						op: filter?.mode,
						column: filter?.column,
						value: param.value
					})
				)
			);

			params.set(param.name, param.value);
		}
		return params.toString();
	};
}

export async function getBooks({ where }: { where: Prisma.BookWhereInput }) {
	const books = await prisma.book.findMany({
		where
	});

	return {
		books,
		tableBooks: books?.map((book, i) => ({
			id: book.id,
			No: String(book.id),
			bookNo: book.bookNo,
			bookName: book.bookName,
			status: book.status,
			price: String(book.price),
			approved: book.isApproved,
			category: book.category
		}))
	};
}

export async function getIncome(userId: number) {
	const income = await prisma.monthlyIncome.findMany({
		where: {
			userId: userId
		},
		orderBy: {
			month: 'asc'
		}
	});

	return income;
}

export async function getTotalIncome() {
	try {
		const totalIncome = await prisma.monthlyIncome.findMany();
		return totalIncome;
	} catch (err) {
		return [];
	}
}

export const fillerSixMonthsChartData = (
	income: Pick<Awaited<ReturnType<typeof getIncome>>[number], 'income' | 'month' | 'year'>[]
) => {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();

	const earningsSummaryChartMonthes: EarningsSummaryChartProps['monthes'] = income
		.map(({ year, month }) => {
			if (year === currentYear && month >= currentMonth) return null;
			const date = new Date(0, month, year).toLocaleDateString('en-US', {
				month: 'short'
			});

			return { date, month, year: year };
		})
		.filter((item): item is { date: string; month: number; year: number } => item !== null)
		.map(({ date }) => date)
		.slice(-6);

	const lastSixMontes: EarningsSummaryChartProps['lastSixMontes'] = income
		.filter(({ year, month }) => {
			if (year === currentYear && month >= currentMonth) return null;

			return year == currentYear;
		})
		.map(({ income }) => income)
		.slice(-6);

	const samePeriodLastYear: EarningsSummaryChartProps['samePeriodLastYear'] = income
		.filter(({ year, month }) => {
			if (year === currentYear && month >= currentMonth) return null;

			return year == currentYear - 1;
		})
		.map(({ income }) => income)
		.slice(-6);
	return {
		lastSixMontes,
		samePeriodLastYear,
		monthes: earningsSummaryChartMonthes
	} satisfies EarningsSummaryChartProps;
};

export async function combineEachUserMontheyIncome(
	income: NonNullable<Awaited<ReturnType<typeof getTotalIncome>>>
) {
	const combinedData = income.reduce(
		(acc, curr) => {
			const { month, year, income } = curr;
			const key = `${month}-${year}`;
			if (!acc[key]) {
				acc[key] = {
					month,
					year,
					income: 0
				};
			}
			acc[key].income += income;
			return acc;
		},
		{} as Record<string, { month: number; year: number; income: number }>
	);
	return Object.values(combinedData);
}

export function onColumnFiltersChange({
	getFilterData,
	pathname,
	router,
	createQueryString,
	model,
	selectedColmunFilterModes
}: {
	getFilterData: () => { id: string; value: string }[];
	pathname: string;
	router: AppRouterInstance;
	createQueryString: (
		param: { name: string; value: string }[],
		selectedColmunFilterModes: {
			column: string;
			mode: FilterModes;
		}[]
	) => string;
	model: keyof typeof jsonSchema.definitions;
	selectedColmunFilterModes: {
		column: string;
		mode: FilterModes;
	}[];
}) {
	const filters = getFilterData();

	if (!filters.length) {
		router.push(pathname);
		return;
	}

	const modelProperties = jsonSchema.definitions[model].properties;

	const searchParamURL = createQueryString(
		filters?.map(({ id, value }) => {
			const key = Object.keys(modelProperties).find(
				(key) => key.toLowerCase().trim() == id.toLowerCase().trim()
			);

			return {
				name: key ?? id,
				value: String(value)
			};
		}),
		selectedColmunFilterModes
	);

	router.push(pathname + '?' + searchParamURL);
}

export function getBooKPieChart(book: Book[]) {
	const numberOfBooksByCategory = book.reduce(
		(acc, book) => {
			const category = book.category;
			if (!acc[category]) {
				acc[category] = 0;
			}
			acc[category]++;
			return acc;
		},
		{} as Record<$Enums.Category, number>
	);

	const data = Object.entries(numberOfBooksByCategory ?? {}).map(([label, value]) => ({
		label,
		value,
		color: label === 'fiction' ? '#006AFF' : label === 'business' ? 'green' : 'red'
	}));
	return { data, numberOfBooksByCategory };
}

export const useDeviceWith = () => {
	const subscribe = (cb: () => any) => {
		window?.addEventListener('resize', cb);
		return () => {
			window.removeEventListener('resize', cb);
		};
	};

	return React.useSyncExternalStore(
		subscribe,
		() => window.innerWidth,
		() => 1000
	);
};

export function mapPermissions(
	permissions: (PermissionModel & { Role: Role[] })[],
	user: User & { role: { name: string; id: number } }
): Permission[] {
	return permissions.map(
		({ updatedAt, createdAt, ...p }) =>
			({
				...p,
				subject: p.subject as PermissionType['subject'],
				actions: p.actions as PermissionType['actions'],
				role: p.Role[0].name as PermissionType['role'],
				condition: JSON.parse(JSON.stringify(p.condition), (_, value) => {
					if (typeof value === 'string' && value.includes('${')) {
						const val = parseTemplate(value, { user });
						return isNaN(Number(val)) ? val : Number(val);
					}
					return value;
				})
			}) satisfies Permission
	);
}

export function createAblity(permissions: Permission[]) {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

	permissions?.forEach(({ actions, condition, subject }) => {
		can(actions, subject, condition ?? {});
	});
	return build();
}

function parseTemplate(template: string, context: Record<string, unknown>): string {
	return template.replace(/\$\{([\w.]+)\}/g, (_, path) => {
		const value = path
			.split('.')
			.reduce(
				<Obj extends Record<string, unknown>, Key extends keyof Obj>(obj: Obj, key: Key) =>
					obj?.[key],
				context
			);
		return value !== undefined ? String(value) : '';
	});
}

export async function getRolePermissions(role: Role) {
	const permissions = await prisma.permission.findMany({
		where: {
			Role: {
				some: {
					name: role.name
				}
			}
		},
		include: {
			Role: true
		}
	});

	return permissions;
}

export const getRoles = async () => {
	try {
		const res = await fetch(`${baseURL}/api/roles`, { cache: 'no-store' });
		if (!res.ok) throw new Error('Failed to get roles');
		const { data } = (await res.json()) as APIResponse;
		return (data as unknown as { data: (Role & { permissions: PermissionModel[] })[] }).data;
	} catch (error) {
		return [] as (Role & { permissions: PermissionModel[] })[];
	}
};

type Model = keyof typeof jsonSchema.definitions;
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
) {
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

const isColumnExists = (
	modelName: keyof typeof jsonSchema.definitions,
	columnName: PropertyKey
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

	if (!input?.length) return {} as PrismaWhereInput;

	const where = {};

	for (const filter of input) {
		const { column, op, value, manyToManyOp } = filter;
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
						return [...rest.reverse(), manyToManyOp ?? 'some', last];
					})()
				: relationFiled;

			setNestedValue(where, nestedValues, value, op, columnType.type);
		}
		const col = modelSchema.properties[column as keyof typeof modelSchema.properties];

		if (!col) {
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

export const onFilterModeChange = <TableDataKeys>({
	mode,
	column,
	onSelectFilterMode,
	setSelectedColmunFilterMode
}: {
	mode: MRT_FilterOption;
	column: TableDataKeys;
	onSelectFilterMode: (mode: MRT_FilterOption) => void;
	setSelectedColmunFilterMode: React.Dispatch<
		React.SetStateAction<{ column: string; mode: FilterModes }[]>
	>;
}) => {
	setSelectedColmunFilterMode((prv) => {
		const prvSelectedFilterModes = [...prv];
		const indexOf = prvSelectedFilterModes.findIndex((modes) => modes.column == column);
		if (indexOf !== -1) {
			prvSelectedFilterModes[indexOf].mode =
				mode as unknown as (typeof prvSelectedFilterModes)[number]['mode'];
			return prvSelectedFilterModes;
		}
		const newSelectedFilterModes = [
			...prv,
			{ mode: mode as unknown as FilterModes, column: column as (typeof prv)[number]['column'] }
		] satisfies typeof prv;
		return newSelectedFilterModes;
	});

	onSelectFilterMode(mode);
};
