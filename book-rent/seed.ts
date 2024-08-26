import { prisma } from '@/db';
import { hashPassword } from '@/lib/utils';

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

async function main() {
	await prisma.user.deleteMany();
	await prisma.book.deleteMany();
	await prisma.monthlyIncome.deleteMany();

	for (const user of mockUsers) {
		await prisma.user.create({
			data: {
				fullName: user.fullName,
				email: user.email,
				password: await hashPassword(user.password),
				location: user.location,
				phoneNumber: user.phoneNumber,

				role: user.role,
				MonthlyIncome: {
					create: mockMonthlyIncomeData.map(({ userId, ...rest }) => ({
						...rest
					}))
				}
			}
		});
	}

	for (const book of mockBooks) {
		const owners = mockUsers.filter(({ role }) => role == 'owner');
		const ownerEmil = owners[Math.floor(Math.random() * owners.length)].email;
		const ownerID = await prisma.user.findFirst({
			where: {
				email: ownerEmil
			}
		});

		if (ownerID) {
			await prisma.book.create({
				data: {
					bookNo: book.bookNo,
					author: book.author,
					ownerId: ownerID.id,
					bookName: book.bookName,
					status: book.status,
					category: book.category,
					price: book.price
				}
			});
		}
	}
}

// main()
// 	.catch((e) => console.error(e))
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 		const books = await prisma.book.findMany();
// 	});

// (async () => {
// 	const deleteData = await prisma.monthlyIncome.deleteMany();
// 	console.log(deleteData);
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
// 			console.log(data);
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




const permissions = [
	{
		actions: 'update',
		subject: 'Book',
		reason: 'owner can update his book',
		condition: {
			ownerId: `$user.id`
		},
		name: 'update-book',
		role: 'owner' as const
	},
	{
		actions: 'delete',
		subject: 'Book',
		reason: 'owner can delete his book',
		condition: {
			ownerId: `$user.id`
		},
		name: 'delete-book',
		role: 'owner' as const
	},
	{
		actions: 'disable',
		subject: 'User',
		condition: { role: `$user.role` },
		reason: 'Admin can disable owners',
		name: 'disable-owner',
		role: 'admin' as const
	},
	{
		actions: 'delete',
		subject: 'User',
		condition: {
			AND: [{ role: '$user.role' }, { role: '$user.role' }]
		},
		reason: 'Admin can delete owner',
		name: 'delete-owner',
		role: 'admin' as const
	},
	{
		actions: 'approve',
		subject: 'User',
		condition: { role: '$user.role' },
		reason: 'admin can approve book owner',
		name: 'approve-owner',
		role: 'admin' as const
	},

	{
		actions: 'approve',
		subject: 'Book',
		reason: 'Admin can approve book',
		name: 'approve-book',
		role: 'admin' as const
	}
];

async function seedPerimissions() {
	await prisma.permission.deleteMany();
	const permission = await Promise.all(
		permissions.map((permission) => {
			return prisma.permission.create({
				data: {
					actions: permission.actions,
					subject: permission.subject,
					condition: permission.condition,
					name: permission.name,
					role: permission.role
				}
			});
		})
	);
	console.log(permission);
}
seedPerimissions();