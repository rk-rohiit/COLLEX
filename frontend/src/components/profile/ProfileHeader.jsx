// components/profile/ProfileHeader.jsx

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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";

const ProfileHeader = () => {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        mb: 1.5,
        position: "relative",
        overflow: "hidden",
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",

        // Refined left-accent instead of heavy gradient
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          background: "linear-gradient(180deg, #5DCAA5 0%, #1D9E75 100%)",
          borderRadius: "3px 0 0 3px",
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        sx={{ pl: 1 }}
      >
        {/* LEFT SIDE */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: { xs: 48, md: 52 },
              height: { xs: 48, md: 52 },
              fontSize: "1.25rem",
              fontWeight: 600,
              bgcolor: "#E1F5EE",
              color: "#0F6E56",
              fontFamily: "'JetBrains Mono', monospace",
              border: "1.5px solid",
              borderColor: "#9FE1CB",
            }}
          >
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box>
            {/* Name + Verified */}
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ letterSpacing: "-0.3px", lineHeight: 1.3 }}
              >
                {user?.fullName || "User Name"}
              </Typography>
              <Tooltip title="Verified">
                <VerifiedIcon sx={{ fontSize: 15, color: "#1D9E75" }} />
              </Tooltip>
            </Stack>

            {/* Badges */}
            <Stack direction="row" spacing={0.75} mt={0.5} flexWrap="wrap">
              <Chip
                label="Verified"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "10px",
                  fontWeight: 600,
                  bgcolor: "#E1F5EE",
                  color: "#0F6E56",
                  border: "0.5px solid #9FE1CB",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
              <Chip
                label="Active"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "10px",
                  fontWeight: 600,
                  bgcolor: "#EAF3DE",
                  color: "#3B6D11",
                  border: "0.5px solid #C0DD97",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Stack>

            {/* Meta */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.5,
                color: "text.secondary",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
              }}
            >
              {user?.campusId || "CAMPUS-ID"} · {user?.email || "email@example.com"}
            </Typography>
          </Box>
        </Stack>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 15 }} />}
            onClick={() => navigate("/create-listing")}
            sx={{
              bgcolor: "#1D9E75",
              color: "#fff",
              fontWeight: 500,
              fontSize: "12px",
              px: 1.75,
              py: 0.75,
              borderRadius: 2,
              boxShadow: "none",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#17876A",
                boxShadow: "none",
              },
            }}
          >
            Post listing
          </Button>

          <Tooltip title="More options">
            <IconButton
              size="small"
              sx={{
                border: "0.5px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
                width: 34,
                height: 34,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <MoreVertIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfileHeader;