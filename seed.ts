import { prisma } from "@/db";
import { hashPassword } from "@/lib/utils";

const mockUsers = [
  {
    fullName: "John Doe",
    email: "john@example.com",
    password: "password123",
    location: "New York",
    phoneNumber: "1234567890",
    role: "user",
  },
  {
    fullName: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    location: "Los Angeles",
    phoneNumber: "0987654321",
    role: "owner",
  },
  {
    fullName: "Bob Johnson",
    email: "bob@example.com",
    password: "password789",
    location: "Chicago",
    phoneNumber: "5555555555",
    role: "admin",
  },
  {
    fullName: "Alice Williams",
    email: "alice@example.com",
    password: "password012",
    location: "San Francisco",
    phoneNumber: "1112223333",
    role: "user",
  },
  {
    fullName: "Tom Brown",
    email: "tom@example.com",
    password: "password345",
    location: "Boston",
    phoneNumber: "4445556666",
    role: "owner",
  },
] as const;

const mockBooks = [
  {
    bookNo: "BK001",
    author: "J.K. Rowling",
    ownerId: 1,
    bookName: "Harry Potter and the Sorcerer's Stone",
    status: "free",
    category: "fiction",
    price: 9.99,
  },
  {
    bookNo: "BK002",
    author: "Dale Carnegie",
    ownerId: 2, // Replace with the appropriate owner's id
    bookName: "How to Win Friends and Influence People",
    status: "rented",
    category: "selfHelp",
    price: 12.99,
  },
  {
    bookNo: "BK003",
    author: "Michael E. Porter",
    ownerId: 3, // Replace with the appropriate owner's id
    bookName: "Competitive Strategy",
    status: "free",
    category: "business",
    price: 19.99,
  },
  {
    bookNo: "BK004",
    author: "Jane Austen",
    ownerId: 1, // Replace with the appropriate owner's id
    bookName: "Pride and Prejudice",
    status: "rented",
    category: "fiction",
    price: 7.99,
  },
  {
    bookNo: "BK005",
    author: "Stephen R. Covey",
    ownerId: 2, // Replace with the appropriate owner's id
    bookName: "The 7 Habits of Highly Effective People",
    status: "free",
    category: "selfHelp",
    price: 14.99,
  },
] as const;

async function main() {
  await prisma.user.deleteMany();
  await prisma.book.deleteMany();

  for (const user of mockUsers) {
    await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: await hashPassword(user.password),
        location: user.location,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  }

  for (const book of mockBooks) {
    const owners = mockUsers.filter(({ role }) => role == "owner");
    const ownerEmil = owners[Math.floor(Math.random() * owners.length)].email;
    const ownerID = await prisma.user.findFirst({
      where: {
        email: ownerEmil,
      },
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
          price: book.price,
        },
      });
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    const books = await prisma.book.findMany();
    console.log(books);
  });
