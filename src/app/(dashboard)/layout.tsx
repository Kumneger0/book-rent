import Sidebar from "@/components/sidebar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { Box, CssBaseline } from "@mui/material";
import React from "react";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { getUser, verify } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserType } from "@/types";

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
  user: [],
};

async function App({ children }: { children: React.ReactNode }) {
  const token = cookies().get("token");

  const decoded = await verify<UserType>(token?.value ?? "");

  const sidebarList = lists[decoded.role ?? "user"];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar role={decoded.role ?? "user"} lists={sidebarList} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: "1600px", mx: "auto" }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default App;
