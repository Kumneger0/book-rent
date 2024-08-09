import DashboardContent from "@/components/dashboardContent";
import { TableOwner } from "@/components/liveBookStatusTable";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";
import { verify } from "@/lib/utils";
import { UserType } from "@/types";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

async function Dashboard() {
  const token = cookies().get("token")!;
  const user = await verify<UserType>(token.value)!;
  const books = await prisma.user.findFirst({
    where: {
      email: user.email,
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

  const booksToDisplay = books?.Book.map((book, i) => ({
    id: book.id,
    No: String(book.id),
    BookNo: i,
    BookName: book.bookName,
    status: book.status,
    price: String(book.price),
  }));
  return (
    <>
      <SharedHeader>Owner/Dashboard</SharedHeader>
      <DashboardContent>
        <Box>
          <h3>Live Book Status</h3>
          <TableOwner data={booksToDisplay ?? []} />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
