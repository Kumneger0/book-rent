import SharedHeader from "@/components/sharedHead";
import UploadBook from "@/components/uploadBook";
import { Box } from "@mui/material";
import React from "react";

function BookUpload() {
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
        <UploadBook />;
      </Box>
    </>
  );
}

export default BookUpload;
