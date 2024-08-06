import OwnerTable from "@/components/owner-Table";
import Example from "@/components/ownerTable";
import SharedHeader from "@/components/sharedHead";
import { Box } from "@mui/material";
import React from "react";

function Owners() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SharedHeader>Admin/owners</SharedHeader>
      <Box
        sx={{ p: 2, borderRadius: 1, boxShadow: 1, backgroundColor: "white" }}
      >
        <h3>List of Owners</h3>
        <OwnerTable />
      </Box>
    </Box>
  );
}

export default Owners;
