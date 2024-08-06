import Example from "@/components/ownerTable";
import SharedHeader from "@/components/sharedHead";
import { Box } from "@mui/material";
import React from "react";

function Books() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/Books</SharedHeader>
      <Box
        sx={{ p: 2, borderRadius: 3, boxShadow: 1, backgroundColor: "white" }}
      >
        <h3>List of Owners</h3>
        <Example />
      </Box>
    </Box>
  );
}

export default Books;
