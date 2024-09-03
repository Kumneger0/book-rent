import { prisma } from '@/db';
import { LoginSchema, UserSchema } from '@/lib/utils';
import { PureAbility } from '@casl/ability';
import { Box } from '@mui/material';

import { PrismaQuery, Subjects } from '@casl/prisma';
import { Book, Role, User } from '@prisma/client';

import { ComponentProps } from 'react';
import { z } from 'zod';

export type MUITypes = ComponentProps<typeof Box>['sx'];

export type APIResponse = {
	status: 'success' | 'error';
	data: { message: string };
};

export type UserType = z.infer<typeof UserSchema>;

export type UserTypeLOGIN = z.infer<typeof LoginSchema>;

export type BookType = Awaited<ReturnType<typeof prisma.book.findMany>>;

export interface BookTable extends Pick<BookType[number], never> {
	owner: {
		fullName: string;
	};
	id: number;
	isApproved: boolean;
}

export type EarningsSummaryChartProps = {
	monthes: string[];
	lastSixMontes: number[];
	samePeriodLastYear: number[];
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type AppAbilityAdmin = PureAbility<
	[string, Subjects<{ User: User; Book: Book }>],
	PrismaQuery
>;

type Sub = { Book: Book; User: User };

export type AppAbility = PureAbility<[string, Subjects<Sub>], PrismaQuery>;

export type PermissionType = {
	actions: 'update' | 'delete' | 'disable' | 'approve';
	subject: 'Book' | 'User';
	reason: string;
	condition: {
		ownerId?: number;
		role?: string;
	} & Record<string, any>;
	name: string;
	role: Role['name'];
};

export type Permission = {
	actions: PermissionType['actions'];
	subject: PermissionType['subject'];
	condition: PermissionType['condition'];
	name: PermissionType['name'];
	role: PermissionType['role'];
};


export type FilterSearchParam = {
	op: string;
	column: string;
	value: string;
	manyToManyOp?: string;
}[];