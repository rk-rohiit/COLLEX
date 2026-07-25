// components/admin/Topbar.jsx

import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  useTheme,
  Popover,
  Stack,
  Divider,
  Avatar,
  Button,
  Chip
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Icons
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import {
  getContactMessages,
  deleteContactMessage
} from "@/features/admin/adminSlice";

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
  const dispatch = useDispatch();

  const { contactMessages } = useSelector((s) => s.admin);

  // Popover State
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getContactMessages());
  }, [dispatch]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id, name) => {
    try {
      await dispatch(deleteContactMessage(id)).unwrap();
      toast.success(`Message from ${name} dismissed`);
    } catch (err) {
      toast.error(err || "Failed to delete message");
    }
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "notification-popover" : undefined;
  
  // Dynamic Title Logic
  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <Box
      sx={{
        height: 65,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 1100,
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
          {/* NOTIFICATIONS BELL */}
          <IconButton
            aria-describedby={popoverId}
            onClick={handleOpenMenu}
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
              badgeContent={contactMessages?.length || 0} 
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

      {/* NOTIFICATIONS POPOVER */}
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 480,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(10,38,71,0.1)",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }
        }}
      >
        {/* Popover Header */}
        <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={800} color="text.primary">
              Contact Us Notifications
            </Typography>
            <Chip 
              label={`${contactMessages?.length || 0} New`} 
              size="small" 
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 700,
                fontSize: "0.65rem"
              }}
            />
          </Stack>
        </Box>
        <Divider />

        {/* Popover Message List */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
          {contactMessages && contactMessages.length > 0 ? (
            contactMessages.map((msg) => (
              <Box key={msg._id}>
                <Box 
                  sx={{ 
                    p: 2, 
                    display: "flex", 
                    gap: 1.5, 
                    alignItems: "flex-start",
                    transition: "background 0.12s",
                    "&:hover": { bgcolor: "action.hover" }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: "0.8rem", 
                      fontWeight: 700,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main
                    }}
                  >
                    {msg.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight={700} color="text.primary" noWrap>
                        {msg.name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(msg._id, msg.name)}
                        sx={{ 
                          color: "text.disabled", 
                          "&:hover": { color: theme.palette.error.main }
                        }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Stack>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ display: "block", mb: 0.5, fontFamily: "monospace", fontSize: "0.7rem" }}
                    >
                      {msg.email}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.primary" 
                      sx={{ fontSize: "0.8rem", wordBreak: "break-word" }}
                    >
                      {msg.message}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.disabled" 
                      sx={{ display: "block", mt: 1, fontSize: "0.65rem" }}
                    >
                      {new Date(msg.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ borderStyle: "dashed" }} />
              </Box>
            ))
          ) : (
            <Stack py={5} alignItems="center" justifyContent="center" spacing={1.5}>
              <MailOutlineIcon sx={{ fontSize: 36, color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                No messages found.
              </Typography>
            </Stack>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;