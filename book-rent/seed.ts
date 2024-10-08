import { prisma } from '@/db';
import { hashPassword } from '@/lib/utils';
import { permission } from 'process';
import { act } from 'react';

const mockUsers = [
	{
		fullName: 'John Doe',
		email: 'john@exampl02e.com',
		password: 'password123',
		location: 'New York',
		phoneNumber: '1234567890',
		role: 'user'
	},
	{
		fullName: 'Jane Smith',
		email: 'jane@exampl02e.com',
		password: 'password456',
		location: 'Los Angeles',
		phoneNumber: '0987654321',
		role: 'owner'
	},
	{
		fullName: 'Bob Johnson',
		email: 'bob@example02.com',
		password: 'password789',
		location: 'Chicago',
		phoneNumber: '5555555555',
		role: 'admin'
	},
	{
		fullName: 'Alice Williams',
		email: 'alice@examp02le.com',
		password: 'password012',
		location: 'San Francisco',
		phoneNumber: '1112223333',
		role: 'user'
	},
	{
		fullName: 'Tom Brown',
		email: 'tom@example02.com',
		password: 'password345',
		location: 'Boston',
		phoneNumber: '4445556666',
		role: 'owner'
	}
] as const;

const mockBooks = [
	{
		bookNo: 'BK001',
		author: 'J.K. Rowling',
		ownerId: 1,
		bookName: "Harry Potter and the Sorcerer's Stone",
		status: 'free',
		category: 'fiction',
		price: 9.99
	},
	{
		bookNo: 'BK002',
		author: 'Dale Carnegie',
		ownerId: 2, // Replace with the appropriate owner's id
		bookName: 'How to Win Friends and Influence People',
		status: 'rented',
		category: 'selfHelp',
		price: 12.99
	},
	{
		bookNo: 'BK003',
		author: 'Michael E. Porter',
		ownerId: 3, // Replace with the appropriate owner's id
		bookName: 'Competitive Strategy',
		status: 'free',
		category: 'business',
		price: 19.99
	},
	{
		bookNo: 'BK004',
		author: 'Jane Austen',
		ownerId: 1, // Replace with the appropriate owner's id
		bookName: 'Pride and Prejudice',
		status: 'rented',
		category: 'fiction',
		price: 7.99
	},
	{
		bookNo: 'BK005',
		author: 'Stephen R. Covey',
		ownerId: 2, // Replace with the appropriate owner's id
		bookName: 'The 7 Habits of Highly Effective People',
		status: 'free',
		category: 'selfHelp',
		price: 14.99
	}
] as const;

const mockMonthlyIncomeData = [
	// 2023
	{
		userId: 1,
		month: 1,
		year: 2023,
		income: 2000
	},
	{
		userId: 1,
		month: 2,
		year: 2023,
		income: 2200
	},
	{
		userId: 1,
		month: 3,
		year: 2023,
		income: 3000
	},
	{
		userId: 1,
		month: 4,
		year: 2023,
		income: 2500
	},
	{
		userId: 1,
		month: 5,
		year: 2023,
		income: 2800
	},
	{
		userId: 1,
		month: 6,
		year: 2023,
		income: 3100
	},
	{
		userId: 1,
		month: 7,
		year: 2023,
		income: 2700
	},
	{
		userId: 1,
		month: 8,
		year: 2023,
		income: 3200
	},
	{
		userId: 1,
		month: 9,
		year: 2023,
		income: 2900
	},
	{
		userId: 1,
		month: 10,
		year: 2023,
		income: 3400
	},
	{
		userId: 1,
		month: 11,
		year: 2023,
		income: 3000
	},
	{
		userId: 1,
		month: 12,
		year: 2023,
		income: 3500
	},
	// 2024
	{
		userId: 1,
		month: 1,
		year: 2024,
		income: 2800
	},
	{
		userId: 1,
		month: 2,
		year: 2024,
		income: 3200
	},
	{
		userId: 1,
		month: 3,
		year: 2024,
		income: 3000
	},
	{
		userId: 1,
		month: 4,
		year: 2024,
		income: 3500
	},
	{
		userId: 1,
		month: 5,
		year: 2024,
		income: 2900
	},
	{
		userId: 1,
		month: 6,
		year: 2024,
		income: 3700
	},
	{
		userId: 1,
		month: 7,
		year: 2024,
		income: 3100
	},
	{
		userId: 1,
		month: 8,
		year: 2024,
		income: 3800
	},
	{
		userId: 1,
		month: 9,
		year: 2024,
		income: 3300
	},
	{
		userId: 1,
		month: 10,
		year: 2024,
		income: 4000
	},
	{
		userId: 1,
		month: 11,
		year: 2024,
		income: 3600
	},
	{
		userId: 1,
		month: 12,
		year: 2024,
		income: 4200
	}
];

// async function main() {
// 	await prisma.user.deleteMany();
// 	await prisma.book.deleteMany();
// 	await prisma.monthlyIncome.deleteMany();

// 	for (const user of mockUsers) {
// 		await prisma.user.create({
// 			data: {
// 				fullName: user.fullName,
// 				email: user.email,
// 				password: await hashPassword(user.password),
// 				location: user.location,
// 				phoneNumber: user.phoneNumber,

// 				MonthlyIncome: {
// 					create: mockMonthlyIncomeData.map(({ userId, ...rest }) => ({
// 						...rest
// 					}))
// 				}
// 			}
// 		});
// 	}

// 	for (const book of mockBooks) {
// 		const owners = mockUsers.filter(({ role }) => role == 'owner');
// 		const ownerEmil = owners[Math.floor(Math.random() * owners.length)].email;
// 		const ownerID = await prisma.user.findFirst({
// 			where: {
// 				email: ownerEmil
// 			}
// 		});

// 		if (ownerID) {
// 			await prisma.book.create({
// 				data: {
// 					bookNo: book.bookNo,
// 					author: book.author,
// 					ownerId: ownerID.id,
// 					bookName: book.bookName,
// 					status: book.status,
// 					category: book.category,
// 					price: book.price
// 				}
// 			});
// 		}
// 	}
// }

// main()
// 	.catch((e) => 
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 		const books = await prisma.book.findMany();
// 	});

// (async () => {
// 	const deleteData = await prisma.monthlyIncome.deleteMany();
// 	
// 	const ownersUsers = await prisma.user.findMany({
// 		where: {
// 			role: 'owner'
// 		}
// 	});

// 	for (const owner of ownersUsers) {
// 		for (const income of mockMonthlyIncomeData) {
// 			const data = await prisma.monthlyIncome.create({
// 				data: {
// 					userId: owner.id,
// 					month: income.month,
// 					year: income.year,
// 					income: Math.floor(Math.random() * 10000)
// 				}
// 			});
// 			
// 		}
// 	}
// })();

// (async () => {
// 	const updateBookQuantity = await prisma.book.updateMany({
// 		data: {
// 			quantity: {
// 				increment: 100
// 			}
// 		}
// 	});
// })();

// const permissions = [
// 	{
// 		actions: 'update',
// 		subject: 'Book',
// 		reason: 'owner can update his book',
// 		condition: {
// 			ownerId: `$user.id`
// 		},
// 		name: 'update-book',
// 	},
// 	{
// 		actions: 'delete',
// 		subject: 'Book',
// 		reason: 'owner can delete his book',
// 		condition: {
// 			ownerId: `$user.id`
// 		},
// 		name: 'delete-book',
// 	},
// 	{
// 		actions: 'disable',
// 		subject: 'User',
// 		condition: { role: `$user.role` },
// 		reason: 'Admin can disable owners',
// 		name: 'disable-owner',
// 		role: 'admin' as const
// 	},
// 	{
// 		actions: 'delete',
// 		subject: 'User',
// 		condition: {
// 			AND: [{ role: '$user.role' }, { role: '$user.role' }]
// 		},
// 		reason: 'Admin can delete owner',
// 		name: 'delete-owner',
// 		role: 'admin' as const
// 	},
// 	{
// 		actions: 'approve',
// 		subject: 'User',
// 		condition: { role: '${user.role}' },
// 		reason: 'admin can approve book owner',
// 		name: 'approve-owner',
// 	},

// 	{
// 		actions: 'approve',
// 		subject: 'Book',
// 		reason: 'Admin can approve book',
// 		name: 'approve-book',
// 		role: 'admin' as const
// 	}
// ];

// async function seedPerimissions() {
// 	await prisma.permission.deleteMany();
// 	const permission = await Promise.all(
// 		permissions.map((permission) => {
// 			return prisma.permission.create({
// 				data: {
// 					actions: permission.actions,
// 					subject: permission.subject,
// 					condition: permission.condition,
// 					name: permission.name,
// 					role: permission.role
// 				}
// 			});
// 		})
// 	);
// 	
// }
// seedPerimissions();

const mockRoles = [
	{ name: 'admin', permissions: ['approve-user', 'approve-book', 'disable-owner', 'delete-owner'] },
	{ name: 'owner', permissions: ['create-book', 'update-book', 'delete-book'] },
	{ name: 'user', permissions: ['read-book'] }
];

const mockPermissions = [
	{ actions: 'read', subject: 'Book', condition: null, name: 'read-book' },
	{ actions: 'create', subject: 'Book', condition: null, name: 'create-book' },
	{
		actions: 'update',
		subject: 'Book',
		condition: { ownerId: '${user.id}' },
		name: 'update-book'
	},
	{
		actions: 'delete',
		subject: 'Book',
		condition: { ownerId: '${user.id}' },
		name: 'delete-book'
	},
	{ actions: 'approve', subject: 'User', condition: null, name: 'approve-user' },
	{ actions: 'approve', subject: 'Book', condition: null, name: 'approve-book' },
	{
		actions: 'disable',
		subject: 'User',
		condition: null,
		name: 'disable-owner'
	},
	{
		actions: 'delete',
		subject: 'User',
		condition: null,
		name: 'delete-owner'
	}
];

async function main2() {
	await prisma.monthlyIncome.deleteMany();
	await prisma.book.deleteMany();
	await prisma.user.deleteMany();
	await prisma.role.deleteMany();
	await prisma.permission.deleteMany();

	const permissions = await Promise.all(
		mockPermissions.map((permission) =>
			prisma.permission.create({
				data: {
					...permission,
					condition: permission.condition === null ? undefined : permission.condition
				}
			})
		)
	);
	const roles = await Promise.all(
		mockRoles.map((role) => {
			const rolePermsssion = role.permissions.map((permission) => {
				return permissions.find((p) => p.name === permission);
			});
			return prisma.role.create({
				data: {
					name: role.name,
					permissions: {
						connect: rolePermsssion.map((permission) => ({ id: permission?.id }))
					}
				}
			});
		})
	);

	for (const user of mockUsers) {
		const role = roles.find((r) => r.name === user.role);
		await prisma.user.create({
			data: {
				fullName: user.fullName,
				email: user.email,
				password: await hashPassword(user.password),
				location: user.location,
				phoneNumber: user.phoneNumber,
				approved: true,
				isActive: true,
				wallet: Math.floor(Math.random() * 1000),
				role: {
					connect: {
						id: role?.id
					}
				}
			}
		});
	}

	for (const book of mockBooks) {
		const owner = await prisma.user.findFirst({ where: { role: { name: 'owner' } } });
		if (owner) {
			await prisma.book.create({
				data: {
					...book,
					ownerId: owner.id,
					isApproved: Math.random() > 0.5,
					quantity: Math.floor(Math.random() * 10) + 1
				}
			});
		}
	}

	const users = await prisma.user.findMany();
	for (const user of users) {
		for (let month = 1; month <= 12; month++) {
			await prisma.monthlyIncome.create({
				data: {
					userId: user.id,
					month,
					year: 2024,
					income: Math.floor(Math.random() * 5000) + 1000
				}
			});
		}
	}
}

async function displayData() {
	
	
	
	
	
		await prisma.role.findMany({
			include: {
				permissions: true
			}
		})
	);
	
}

main2()
	.catch((e) => 
	.finally(async () => {
		await displayData();
		await prisma.$disconnect();
	});

