"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import LoginIcon from "@mui/icons-material/Login";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import {
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Herr_Von_Muellerhoff } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const drawerWidth = 300;

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
  const [matches, setMatches] = useState(
    useMediaQuery(theme.breakpoints.up("lg"))
  );
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <Drawer
        variant={"permanent"}
        onClose={() => {
          setMatches(false);
        }}
        sx={{
          width: "100px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 100,
            boxSizing: "border-box",
            backgroundColor: "#191D38",
            color: "white",
            position: "sticky",
            height: "100dvh",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            sx={{ color: "white", ml: -3, py: 3 }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuIcon />
          </Button>
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
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                href={href}
              >
                <Tooltip
                  title={<ListItemText primary={itemName} />}
                  placement="right"
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <Icon sx={{ color: "white" }}>{icon}</Icon>
                  </ListItemIcon>
                </Tooltip>
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
            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              href={`/${"Notification".toLowerCase()}`}
            >
              <Tooltip
                title={<ListItemText primary="Notification" />}
                placement="right"
              >
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: "white" }} />
                </ListItemIcon>
              </Tooltip>
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
            <Tooltip
              title={<ListItemText primary="Setting" />}
              placement="right"
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </Tooltip>
          </ListItem>
          <ListItem
            sx={{
              width: "90%",
              margin: "10px auto",
            }}
          >
            <Tooltip
              title={<ListItemText primary="Login As Admin" />}
              placement="right"
            >
              <ListItemIcon>
                <LoginIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </Tooltip>
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
          <Tooltip title={<ListItemText primary="Logout" />} placement="right">
            <ListItemIcon>
              <LoginIcon sx={{ color: "white" }} />
            </ListItemIcon>
          </Tooltip>
        </ListItem>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={open}
      variant={"persistent"}
      onClose={() => {
        setMatches(false);
      }}
      sx={{
        width: open ? drawerWidth : 0,
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
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          sx={{ color: "white", ml: -3, py: 3 }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <MenuIcon />
        </Button>
        <Image
          src="/Logo.png"
          style={{ objectFit: "contain", objectPosition: "center" }}
          alt="Logo"
          width={50}
          height={50}
        />
        <Typography color={"blue"} variant="h6" noWrap>
          Book Rent
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
