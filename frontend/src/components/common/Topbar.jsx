// components/Topbar.jsx
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const Topbar = () => {
  return (
    <Box
      sx={{
        height: 70,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #E5E7EB",
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Dashboard
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <InputBase
          placeholder="Search..."
          sx={{
            px: 2,
            py: 0.5,
            bgcolor: "#F1F5F9",
            borderRadius: 2,
          }}
        />

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;