import React from "react";
import DashboardContent from "@/components/dashboardContent";
import Example from "@/components/liveBookStatusTable";
import { Box } from "@mui/material";
import SharedHeader from "@/components/sharedHead";

function Dashboard() {
  return (
    <>
      <SharedHeader>Admin/Dashboard</SharedHeader>

      <DashboardContent>
        <Box>
          <h3>Live Book Status</h3>
          <Example />
        </Box>
      </DashboardContent>
    </>
  );
}

export default Dashboard;
