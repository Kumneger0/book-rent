import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Book, User } from '@prisma/client';

type AppAbilityAdmin = PureAbility<[string, Subjects<{ User: User; Book: Book }>], PrismaQuery>;

export function defineAbilty(user: User): AppAbilityAdmin {
	const { can, cannot, build } = new AbilityBuilder<AppAbilityAdmin>(createPrismaAbility);

	if (user.role == 'admin') {
		can('disable', 'User' as any, { role: { equals: 'owner' } }).because(
			'Admin can disable owners'
		);
		can('approve', 'User' as any, { role: { equals: 'owner' } }).because(
			'admin can approve book owner'
		);
		can('delete', 'User' as any, {
			AND: [{ role: { equals: 'owner' } }, { role: { equals: 'user' } }]
		}).because('Admin cad delete owner');
		can('approve', 'Book').because('Admin can approve book');
	}

	if (user.role == 'user') {
		can('rent', 'Book').because('User Can Rent Books');
	}

	const ability = build();

	return ability;
}

type Sub = { Book: Book };
export type AppAbility = PureAbility<[string, Subjects<Sub>], PrismaQuery>;
export const defineOwnerAblity = (user: User) => {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);
	if (user.role == 'owner') {
		/**
		 * Grants the current user, who has the 'owner' role, the ability to update and delete books that they own.
		 * to see how it works checkout condtions section on https://casl.js.org/v6/en/guide/intro#basics
		 * The `ownerId` field on the `Book` model is used to determine ownership.
		 */
		can('update', 'Book', { ownerId: { equals: user.id } }).because('owner can update his books');
		can('delete', 'Book', { ownerId: { equals: user.id } }).because('owner can delele his books');
	}

	const ability = build();

	return ability;
};
