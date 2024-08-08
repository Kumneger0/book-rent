import React from "react";
import DashboardContent from "@/components/dashboardContent";
import Example from "@/components/liveBookStatusTable";
import { Box } from "@mui/material";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";

async function Dashboard() {
  const books = await prisma.book.findMany({
    include: {
      owner: {
        select: {
          fullName: true,
        },
      },
    },
  });

  const liveBookStatus = books.map((book) => {
    return {
      No: book.id.toString(),
      BookNo: book.bookNo,
      Owner: book.owner.fullName,
      status: book.status,
      price: book.price.toString(),
    } satisfies {
      No: string;
      BookNo: string;
      Owner: string;
      status: "rented" | "free";
      price: string;
    };
  });

  return (
    <>
      <SharedHeader>Admin/Dashboard</SharedHeader>

      <DashboardContent>
        <Box>
          <h3>Live Book Status</h3>
          <Example data={liveBookStatus} />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
