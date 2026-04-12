import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

// Map paths to page titles
const pageTitles = {
  "/admin":            "Dashboard",
  "/admin/products":   "Products",
  "/admin/orders":     "Orders",
  "/admin/students":   "Students",
  "/admin/categories": "Categories",
  "/admin/reports":    "Reports",
  "/admin/settings":   "Settings",
  "/admin/support":    "Support",
};

const Topbar = () => {
  const location = useLocation();
  // const title = pageTitles[location.pathname] || "";

  return (
    <Box
      sx={{
        height: 65,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      {/* PAGE TITLE */}
      <Typography fontWeight={800} fontSize="1.05rem" color="text.primary">
        {/* {title} */}
      </Typography>

      {/* RIGHT CONTROLS */}
      <Box display="flex" alignItems="center" gap={1.5}>
        {/* SEARCH */}
        <TextField
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontSize: "0.82rem",
              bgcolor: "background.default",
            },
          }}
        />

        {/* NOTIFICATIONS */}
        <IconButton
          size="small"
          sx={{
            border: "0.5px solid",
            borderColor: "divider",
            borderRadius: "10px",
            p: 0.75,
          }}
        >
          <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", minWidth: 16, height: 16 } }}>
            <NotificationsNoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </Badge>
        </IconButton>

        {/* SETTINGS */}
        <IconButton
          size="small"
          sx={{
            border: "0.5px solid",
            borderColor: "divider",
            borderRadius: "10px",
            p: 0.75,
          }}
        >
          <SettingsIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;