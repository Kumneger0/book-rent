"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import LoginIcon from "@mui/icons-material/Login";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Herr_Von_Muellerhoff } from "next/font/google";

const drawerWidth = 279;

const Sidebar = ({
  lists,
}: {
  lists: {
    itemName: string;
    icon: JSX.Element;
    href: string;
  }[];
}) => {
  const pathname = usePathname();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Drawer
      hidden={!matches}
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#191D38",
          color: "white",
          position: "sticky",
          height: "100dvh",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          <img src={"/frame-3.png"} alt="Frame 3" width={200} height={"auto"} />
        </Typography>
      </Toolbar>
      <Divider
        sx={{ width: "80%", margin: "10px auto", borderColor: "gray" }}
      />
      <List>
        {lists.map(({ icon, itemName, href }, index) => (
          <ListItem
            sx={{
              borderRadius: "10px",
              width: "90%",
              margin: "10px auto",
              backgroundColor: pathname === href ? "#00ABFF" : "transparent",
            }}
            key={itemName}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <Icon sx={{ color: "white" }}>{icon}</Icon>
            </ListItemIcon>
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              href={href}
            >
              <ListItemText primary={itemName} />
            </Link>
          </ListItem>
        ))}
        <Divider
          sx={{ width: "80%", margin: "10px auto", borderColor: "gray" }}
        />
        <ListItem
          sx={{
            width: "90%",
            margin: "10px auto",
            backgroundColor:
              pathname === `/${"Notification".toLowerCase()}`
                ? "#00ABFF"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <NotificationsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            href={`/${"Notification".toLowerCase()}`}
          >
            <ListItemText primary="Notification" />
          </Link>
        </ListItem>
        <ListItem
          sx={{
            width: "90%",
            margin: "10px auto",
            backgroundColor:
              pathname === `/${"Setting".toLowerCase()}`
                ? "#00ABFF"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>
        <ListItem
          sx={{
            width: "90%",
            margin: "10px auto",
          }}
        >
          <ListItemIcon>
            <LoginIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Login as Book Owner" />
        </ListItem>
        <Divider
          sx={{ width: "80%", margin: "10px auto", borderColor: "gray" }}
        />
      </List>
      <ListItem
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "10%",
          padding: "10px",
          width: "80%",
          margin: "0 auto",
          backgroundColor: "gray",
          color: "white",
          borderRadius: "10px",
          justifySelf: "center",
        }}
      >
        <ListItemIcon>
          <LoginIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
