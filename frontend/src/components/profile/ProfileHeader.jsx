// components/profile/ProfileHeader.jsx
import { useState } from "react";
import {
  Paper,
  Stack,
  Avatar,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Tooltip,
  useTheme,
  Menu,
  MenuItem
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";

// Icons
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const ProfileHeader = () => {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      variant="outlined" // Using outlined to match your AppBar's clean border style
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: `${theme.shape.borderRadius}px`,
        mb: 2,
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",

        // Accent bar using your Theme's Primary Blue
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        sx={{ pl: 1 }}
      >
        {/* LEFT SIDE: Identity */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: { xs: 52, md: 60 },
              height: { xs: 52, md: 60 },
              fontSize: "1.4rem",
              fontWeight: theme.typography.fontWeightBold,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box>
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1.2
                }}
              >
                {user?.fullName || "Collex User"}
              </Typography>
              <Tooltip title="Verified Account">
                <VerifiedIcon sx={{ fontSize: 18, color: theme.palette.success.main }} />
              </Tooltip>
            </Stack>

            {/* Badges using Theme Palette */}
            <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
              <Chip
                label="Verified"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "10px",
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  borderRadius: 1.5,
                }}
              />
              <Chip
                label="Active"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "10px",
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.warning.main, 0.15),
                  color: "text.primary", // Warning yellow is light, keep text dark
                  borderRadius: 1.5,
                }}
              />
            </Stack>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.75,
                color: "text.secondary",
                fontFamily: "monospace",
                fontSize: "11px",
              }}
            >
              {user?.campusId || "ID-UNKNOWN"} • {user?.email || "user@collex.edu"}
            </Typography>
          </Box>
        </Stack>

        {/* RIGHT SIDE: Actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create-listing")}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2, // Matches button theme
            }}
          >
            Post Listing
          </Button>

          <IconButton
            size="small"
             onClick={handleMenuOpen}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1,
              "&:hover": {
                bgcolor: "action.hover",
                color: theme.palette.secondary.main // Action Orange on hover
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleMenuClose}
  PaperProps={{
    sx: {
      borderRadius: 2,
      minWidth: 180,
      boxShadow: 3,
    },
  }}
>
  <MenuItem
    onClick={() => {
      handleMenuClose();
      navigate("/edit-profile");
    }}
  >
    <EditIcon sx={{ mr: 1 }} /> Edit Profile
  </MenuItem>

  <MenuItem
    onClick={() => {
      handleMenuClose();
      navigate("/settings");
    }}
  >
    <SettingsIcon sx={{ mr: 1 }} /> Settings
  </MenuItem>

  <MenuItem
    onClick={() => {
      handleMenuClose();
      console.log("Logout clicked");
    }}
  >
    <LogoutIcon sx={{ mr: 1 }} /> Logout
  </MenuItem>
</Menu>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfileHeader;