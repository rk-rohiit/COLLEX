// components/admin/Sidebar.jsx

import {
  Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Avatar, Divider, IconButton, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
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

const NavItem = ({ item, active, onClick }) => {
  const theme = useTheme();
  
  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={() => onClick(item.path)}
        sx={{
          borderRadius: "10px",
          px: 1.75,
          py: 1,
          // Use Trust Blue from theme
          bgcolor: active ? alpha(theme.palette.primary.main, 0.08) : "transparent",
          color: active ? theme.palette.primary.main : theme.palette.text.secondary,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: active ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.action.hover, 0.04),
            transform: active ? "none" : "translateX(4px)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
            color: active ? theme.palette.primary.main : theme.palette.text.disabled,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          primaryTypographyProps={{
            fontSize: "0.85rem",
            fontWeight: active ? 700 : 600, // Bold active states
            color: "inherit",
            letterSpacing: "-0.2px"
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => navigate(path);

  return (
    <Box
      sx={{
        width: 240, // Slightly wider for better text breathing room
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
      }}
    >
      {/* LOGO AREA */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            // Trust Blue Logo
            bgcolor: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <SchoolIcon sx={{ fontSize: 18, color: "white" }} />
        </Box>
        <Typography 
          sx={{ 
            fontWeight: 800, 
            fontSize: "1.05rem", 
            color: "text.primary",
            letterSpacing: "-0.5px"
          }}
        >
          Collex <Box component="span" sx={{ color: theme.palette.secondary.main }}>Admin</Box>
        </Typography>
      </Box>

      {/* NAVIGATION SCROLL AREA */}
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

        <Divider sx={{ my: 2.5, borderStyle: 'dashed' }} />

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

      {/* USER PROFILE SECTION */}
      <Box
        sx={{
          mx: 1.5,
          mb: 2,
          p: 1.5,
          borderRadius: "12px",
          bgcolor: alpha(theme.palette.background.default, 0.8),
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            fontSize: "0.85rem",
            fontWeight: 800,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}
        >
          A
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography fontSize="0.8rem" fontWeight={700} noWrap color="text.primary">
            Admin User
          </Typography>
          <Typography fontSize="0.7rem" color="text.secondary" noWrap fontWeight={500}>
            System Master
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "text.disabled", "&:hover": { color: theme.palette.secondary.main } }}>
          <SettingsIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;