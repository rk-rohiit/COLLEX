// components/admin/Topbar.jsx

import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

// Map paths to page titles
const pageTitles = {
  "/admin":            "System Overview",
  "/admin/products":   "Product Inventory",
  "/admin/orders":     "Order Management",
  "/admin/students":   "Student Directory",
  "/admin/categories": "Category Hierarchy",
  "/admin/reports":    "Analytics & Reports",
  "/admin/settings":   "System Settings",
  "/admin/support":    "Support Tickets",
};

const Topbar = () => {
  const theme = useTheme();
  const location = useLocation();
  
  // Dynamic Title Logic
  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <Box
      sx={{
        height: 65,
        px: 4, // Increased padding for a more spacious feel
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 1100, // Ensure it stays above content
      }}
    >
      {/* PAGE TITLE */}
      <Box>
        <Typography 
          sx={{ 
            fontWeight: 800, 
            fontSize: "1.1rem", 
            color: "text.primary",
            letterSpacing: "-0.5px"
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* RIGHT CONTROLS */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* SEARCH BAR */}
        <TextField
          placeholder="Search records..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 260,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              fontSize: "0.85rem",
              bgcolor: alpha(theme.palette.background.default, 0.7),
              transition: "all 0.2s ease",
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "text.disabled" },
              "&.Mui-focused": {
                bgcolor: "background.paper",
                "& fieldset": { 
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`
                },
              },
            },
          }}
        />

        <Box display="flex" alignItems="center" gap={1}>
          {/* NOTIFICATIONS */}
          <IconButton
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
              p: 1,
              transition: "all 0.2s",
              "&:hover": { 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderColor: theme.palette.primary.main 
              },
            }}
          >
            <Badge 
              badgeContent={3} 
              // Using Action Orange for the badge
              sx={{ 
                "& .MuiBadge-badge": { 
                  fontSize: "0.65rem", 
                  fontWeight: 700,
                  minWidth: 18, 
                  height: 18,
                  bgcolor: theme.palette.secondary.main,
                  color: "white"
                } 
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            </Badge>
          </IconButton>

          {/* SETTINGS */}
          <IconButton
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
              p: 1,
              transition: "all 0.2s",
              "&:hover": { 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 20, color: "text.secondary" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;