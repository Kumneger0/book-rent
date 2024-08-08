import Example from "@/components/books";
import SharedHeader from "@/components/sharedHead";
import { prisma } from "@/db";
import { Box } from "@mui/material";
import React from "react";

async function Books() {
  const books = await prisma.book.findMany({
    include: {
      owner: {
        select: {
          fullName: true,
        },
      },
    },
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/Books</SharedHeader>
      <Box
        sx={{ p: 2, borderRadius: 3, boxShadow: 1, backgroundColor: "white" }}
      >
        <h3>List of Owners</h3>
        <Example data={books} />
      </Box>
    </Box>
  );
}

export default Books;
