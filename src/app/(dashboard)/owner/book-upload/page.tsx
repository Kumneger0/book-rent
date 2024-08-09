import SharedHeader from "@/components/sharedHead";
import UploadBook from "@/components/uploadBook";
import { verify } from "@/lib/utils";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";
import { getBooks } from "../dashboard/page";

async function BookUpload() {
  const token = cookies().get("token")!;
  const user = await verify<User>(token.value)!;
  const books = await getBooks({ email: user.email });

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
        {/* @ts-ignore */}
        <UploadBook books={books ?? []} />;
      </Box>
    </>
  );
}

export default BookUpload;
