import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Book, User } from '@prisma/client';

type AppAbility = PureAbility<
	[
		string,
		Subjects<{
			User: User;
			Book: Book;
		}>
	],
	PrismaQuery
>;

export function defineAbilty(user: User, bookOwnerId?: number): AppAbility {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

	if (user.role == 'admin') {
		can('disable', 'User', { role: 'owner' }).because('Admin can disable owners');
		can('approve', 'User', { role: 'owner' }).because('admin can approve book owner');
		can('delete', 'User', {
			AND: [{ role: 'owner' }, { role: 'user' }]
		}).because('Admin cad delete owner');
		can('approve', 'Book').because('Admin can approve book');
	}

	if (user.role == 'owner' && bookOwnerId === user.id) {
		can('update', 'Book').because('owner can update his books');
		can('delete', 'Book').because('owner can delele his books');
	}

	if (user.role == 'user') {
		can('rent', 'Book').because('User Can Rent Books');
	}

	const ability = build();

	return ability;
}
