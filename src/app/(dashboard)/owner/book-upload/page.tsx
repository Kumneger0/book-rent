import SharedHeader from "@/components/sharedHead";
import UploadBook from "@/components/uploadBook";
import { getBooks, verify } from "@/lib/utils";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";

async function BookUpload() {
  const token = cookies().get("token")!;
  const user = await verify<User>(token.value)!;
  const { books, tableBooks } = await getBooks({ email: user.email });

  return (
    <>
      <SharedHeader>Owner/UploadBook</SharedHeader>

      <Box
        sx={{
          width: "100%",
          height: "100dvh",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <UploadBook
          books={
            tableBooks?.map((book) => ({
              ...book,
              price: Number(book.price),
              bookNo: book.BookNo.toString(),
            })) ?? []
          }
        />
      </Box>
    </>
  );
}

export default BookUpload;
