import DashboardContent from "@/components/dashboardContent";
import { TableOwner } from "@/components/liveBookStatusTable";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";
import { verify } from "@/lib/utils";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import { cookies } from "next/headers";


export async function getBooks({
  email,
  filterBy,
}: {
  email: string;
  filterBy?: {
    bookName: string;
    status: string;
  };
}) {
  const books = await prisma.user.findFirst({
    where: {
      email: email,
      Book: {
        every: {
          bookName: {
            contains: filterBy?.bookName,
          },
        },
      },
    },
    include: {
      Book: {
        select: {
          id: true,
          bookNo: true,
          bookName: true,
          status: true,
          price: true,
        },
      },
    },
  });

  return books?.Book.map((book, i) => ({
    id: book.id,
    No: String(book.id),
    BookNo: i,
    bookName: book.bookName,
    status: book.status,
    price: String(book.price),
  }));
}

async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const token = cookies().get("token")!;
  const bookName = searchParams?.bookName;
  const status = searchParams?.status;

  const user = await verify<User>(token.value)!;

  const books = await getBooks({
    email: user?.email ?? "",
    filterBy: {
      bookName,
      status,
    },
  });

  return (
    <>
      <SharedHeader>Owner/Dashboard</SharedHeader>
      <DashboardContent>
        <Box>
          <h3>Live Book Status</h3>
          <TableOwner data={books ?? []} />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
