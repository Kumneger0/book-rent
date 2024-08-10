import DashboardContent from "@/components/dashboardContent";
import { TableOwner } from "@/components/liveBookStatusTable";
import SharedHeader from "@/components/sharedHead";
import { getBooks, verify } from "@/lib/utils";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const token = cookies().get("token")!;
  const user = await verify<User>(token.value)!;

  const bookName = searchParams?.bookName;
  const status = searchParams?.status;

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
