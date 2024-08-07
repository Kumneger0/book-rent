import React from "react";
import DashboardContent from "@/components/dashboardContent";
import Example, { TableOwner } from "@/components/liveBookStatusTable";
import { Box } from "@mui/material";
import SharedHeader from "@/components/sharedHead";

function Dashboard() {
  return (
    <>
      <SharedHeader>Owner/Dashboard</SharedHeader>
      <DashboardContent>
        <Box>
          <h3>Live Book Status</h3>
          <TableOwner />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
