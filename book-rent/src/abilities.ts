// import { AbilityBuilder, PureAbility } from '@casl/ability';
// import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
// import { Book, User } from '@prisma/client';

// export type AppAbilityAdmin = PureAbility<
// 	[string, Subjects<{ User: User; Book: Book }>],
// 	PrismaQuery
// >;

// export function defineAbilty(user: User): AppAbilityAdmin {
// 	const { can, cannot, build } = new AbilityBuilder<AppAbilityAdmin>(createPrismaAbility);

// 		can('disable', 'User', { role: { equals: 'owner' } } as any).because(
// 			'Admin can disable owners'
// 		);
// 		can('approve', 'User', { role: { equals: 'owner' } } as any).because(
// 			'admin can approve book owner'
// 		);
// 		can('delete', 'User', {
// 			AND: [{ role: { equals: 'owner' } }, { role: { equals: 'user' } }]
// 		} as any).because('Admin cad delete owner');
// 		can('approve', 'Book').because('Admin can approve book');

// 		can('rent', 'Book').because('User Can Rent Books');

// 	const ability = build();

// 	return ability;
// }
// type Sub = { Book: Book; User: User };
// export type AppAbility = PureAbility<[string, Subjects<Sub>], PrismaQuery>;
// export const defineOwnerAblity = (user: User) => {
// 	const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);
// 		/**
// 		 * Grants the current user, who has the 'owner' role, the ability to update and delete books that they own.
// 		 * to see how it works checkout condtions section on https://casl.js.org/v6/en/guide/intro#conditions
// 		 * The `ownerId` field on the `Book` model is used to determine ownership.
// 		 */
// 		can('update', 'Book', { ownerId: { equals: user.id } }).because('owner can update his books');
// 		can('delete', 'Book', { ownerId: { equals: user.id } }).because('owner can delele his books');

// 	const ability = build();

// 	return ability;
// };

// const permissions = [
// 	{
// 		actions: 'update',
// 		subject: 'Book',
// 		condition: {
// 			ownerId: {
// 				equals: `$user.id`
// 			}
// 		},
// 		name: 'update-book'
// 	},
// 	{
// 		actions: 'update',
// 		subject: 'Book',
// 		condition: {
// 			ownerId: {
// 				equals: `$user.id`
// 			}
// 		},
// 		name: 'delete-book'
// 	},
// 	{
// 		actions: 'update',
// 		subject: 'Book',
// 		condition: {
// 			ownerId: {
// 				equals: `$user.id`
// 			}
// 		},
// 		name: 'update-book'
// 	},
// 	{}
// ];

// const adminPermissions = [
// 	{
// 		actions: 'disable',
// 		subject: 'User',
// 		condition: { role: { equals: 'owner' } },
// 		reason: 'Admin can disable owners',
// 		name: 'disable-owner'
// 	},
// 	{
// 		actions: 'approve',
// 		subject: 'User',
// 		condition: { role: { equals: 'owner' } },
// 		reason: 'admin can approve book owner',
// 		name: 'approve-owner'
// 	},
// 	{
// 		actions: 'delete',
// 		subject: 'User',
// 		condition: {
// 			AND: [{ role: { equals: 'owner' } }, { role: { equals: 'user' } }]
// 		},
// 		reason: 'Admin can delete owner',
// 		name: 'delete-owner'
// 	},
// 	{
// 		actions: 'approve',
// 		subject: 'Book',
// 		reason: 'Admin can approve book',
// 		name: 'approve-book'
// 	}
// ];

// const userPermissions = [
// 	{
// 		actions: 'rent',
// 		subject: 'Book',
// 		reason: 'User Can Rent Books'
// 	}
// ];
