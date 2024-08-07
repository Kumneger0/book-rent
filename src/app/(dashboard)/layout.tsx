import Sidebar from "@/components/sidebar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { Box, CssBaseline } from "@mui/material";
import React from "react";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const lists = {
  admin: [
    {
      itemName: "Dashboard",
      icon: <SpaceDashboardOutlinedIcon />,
      href: "/admin/dashboard",
    },
    {
      itemName: "Books",
      icon: <LibraryBooksRoundedIcon />,
      href: "/admin/books",
    },
    {
      itemName: "Owners",
      icon: <AccountCircleOutlinedIcon />,
      href: "/admin/owners",
    },
    {
      itemName: "Others",
      icon: <ControlPointRoundedIcon />,
      href: "/admin/others",
    },
    {
      itemName: "Others",
      icon: <ControlPointRoundedIcon />,
      href: "/admin/others",
    },
  ],
  owner: [
    {
      itemName: "Dashboard",
      icon: <SpaceDashboardOutlinedIcon />,
      href: "/owner/dashboard",
    },
    {
      itemName: "Book upload",
      icon: <LibraryBooksRoundedIcon />,
      href: "/owner/book-upload",
    },
    {
      itemName: "Others",
      icon: <ControlPointRoundedIcon />,
      href: "/owner/others",
    },
    {
      itemName: "Others",
      icon: <ControlPointRoundedIcon />,
      href: "/owner/others",
    },
  ],
};

function App({ children }: { children: React.ReactNode }) {
  const role = "owner";

  const sidebarList = lists[role];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar lists={sidebarList} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default App;
