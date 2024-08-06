import React from "react";
import { Box, chipClasses, CssBaseline } from "@mui/material";
import Sidebar from "@/components/sidebar";

function App({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default App;
