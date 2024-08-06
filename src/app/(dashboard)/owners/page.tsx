import Example from "@/components/ownerTable";
import SharedHeader from "@/components/sharedHead";
import { Box } from "@mui/material";
import React from "react";

function Owners() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/owners</SharedHeader>
      <Example />
    </Box>
  );
}

export default Owners;
