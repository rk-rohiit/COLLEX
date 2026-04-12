import {
  Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Avatar, Divider, IconButton
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SchoolIcon from "@mui/icons-material/School";

const mainMenu = [
  { text: "Dashboard",  icon: <DashboardIcon  sx={{ fontSize: 18 }} />, path: "/admin" },
  { text: "Products",   icon: <ShoppingBagIcon sx={{ fontSize: 18 }} />, path: "/admin/products" },
  { text: "Orders",     icon: <ReceiptIcon     sx={{ fontSize: 18 }} />, path: "/admin/orders" },
  { text: "Students",   icon: <PeopleIcon      sx={{ fontSize: 18 }} />, path: "/admin/students" },
  { text: "Categories", icon: <CategoryIcon    sx={{ fontSize: 18 }} />, path: "/admin/categories" },
  { text: "Reports",    icon: <BarChartIcon    sx={{ fontSize: 18 }} />, path: "/admin/reports" },
];

const bottomMenu = [
  { text: "Settings", icon: <SettingsIcon    sx={{ fontSize: 18 }} />, path: "/admin/settings" },
  { text: "Support",  icon: <HelpOutlineIcon sx={{ fontSize: 18 }} />, path: "/admin/support" },
];

const NavItem = ({ item, active, onClick }) => (
  <ListItem disablePadding sx={{ mb: 0.25 }}>
    <ListItemButton
      onClick={() => onClick(item.path)}
      sx={{
        borderRadius: "10px",
        px: 1.5,
        py: 0.9,
        bgcolor: active ? "rgba(26,35,126,0.08)" : "transparent",
        color: active ? "primary.main" : "text.secondary",
        "&:hover": {
          bgcolor: active ? "rgba(26,35,126,0.08)" : "rgba(0,0,0,0.04)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
          color: active ? "primary.main" : "text.disabled",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        primaryTypographyProps={{
          fontSize: "0.875rem",
          fontWeight: active ? 700 : 500,
          color: "inherit",
        }}
      />
    </ListItemButton>
  </ListItem>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => navigate(path);

  return (
    <Box
      // sx={{
      //   width: 220,
      //   height: "100vh",
      //   bgcolor: "background.paper",
      //   borderRight: "0.5px solid",
      //   borderColor: "divider",
      //   display: "flex",
      //   flexDirection: "column",
      //   flexShrink: 0,
      //   position: "fixed",
      //   left: 0,
      //   top: 0,
      //   zIndex: 100,
      // }}
      sx={{
        width: 220,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "0.5px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0, // CRITICAL: Prevents sidebar from squishing
        position: "sticky", // Changed from fixed to sticky
        top: 0,
        // Removed left: 0 and zIndex: 100
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          borderBottom: "0.5px solid",
          borderColor: "divider",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "9px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SchoolIcon sx={{ fontSize: 17, color: "white" }} />
        </Box>
        <Typography fontWeight={800} fontSize="0.95rem" color="text.primary">
          College Market
        </Typography>
      </Box>

      {/* MAIN MENU */}
      <Box sx={{ flex: 1, px: 1.5, overflowY: "auto" }}>
        <List dense disablePadding>
          {mainMenu.map((item) => (
            <NavItem
              key={item.text}
              item={item}
              active={location.pathname === item.path}
              onClick={handleNav}
            />
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <List dense disablePadding>
          {bottomMenu.map((item) => (
            <NavItem
              key={item.text}
              item={item}
              active={location.pathname === item.path}
              onClick={handleNav}
            />
          ))}
        </List>
      </Box>

      {/* USER */}
      <Box
        sx={{
          px: 2,
          py: 1.75,
          borderTop: "0.5px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: "0.8rem",
            fontWeight: 700,
            bgcolor: "rgba(26,35,126,0.12)",
            color: "primary.main",
          }}
        >
          A
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography fontSize="0.82rem" fontWeight={700} noWrap color="text.primary">
            Admin User
          </Typography>
          <Typography fontSize="0.7rem" color="text.secondary" noWrap>
            admin@college.edu
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "text.disabled" }}>
          <MoreHorizIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;