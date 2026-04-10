// components/Sidebar.jsx
import {
  Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Avatar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const menu = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Products", icon: <ShoppingBagIcon /> },
    { text: "Orders", icon: <ReceiptIcon /> },
    { text: "Students", icon: <PeopleIcon /> },
    { text: "Categories", icon: <CategoryIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#F8FAFC",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP */}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ p: 2 }}>
          🎓 College Market
        </Typography>

        <List>
          {menu.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* BOTTOM USER */}
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>A</Avatar>
          <Box>
            <Typography fontSize={14}>Admin User</Typography>
            <Typography fontSize={12} color="text.secondary">
              admin@college.edu
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;