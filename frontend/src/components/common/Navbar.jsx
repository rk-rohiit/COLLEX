import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Badge,
  Divider,
  Paper,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SchoolIcon from "@mui/icons-material/School";
import WarningIcon from '@mui/icons-material/Warning';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const categories = [
  { name: "Books", icon: "📚" },
  { name: "Electronics", icon: "💻" },
  { name: "Dorm", icon: "🛏️" },
  { name: "Clothing", icon: "👕" },
  { name: "Stationery", icon: "✏️" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleCreateList = () => {
    navigate("/create-listing")
    //  toast("Under Construction");
  }

  // Theme Colors from Prototype
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    verified: "#2ECC71", // Green
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        color: colors.primary,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: `2px solid ${colors.primary}10`
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>

          <Box
            onClick={() => navigate("/")}
            sx={{
              px: 2.5,
              py: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              borderColor: "divider",
              mb: 1,
              cursor: "pointer"
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
              COLLEX
            </Typography>
          </Box>

          {/* CENTER: SEARCH BAR (DESKTOP) */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 0.5,
                borderRadius: "12px",
                width: "100%",
                maxWidth: 500,
                border: "1.5px solid #E0E0E0",
                bgcolor: "#F8F9FA"
              }}
            >
              <SearchIcon sx={{ color: "gray", mr: 1, fontSize: 20 }} />
              <InputBase
                placeholder="Search textbooks, dorm goods, tech..."
                fullWidth
                sx={{ fontSize: "0.9rem" }}
              />
            </Paper>
          </Box>

          {/* RIGHT: ACTIONS */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {user ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleCreateList}
                  startIcon={<AddIcon />}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    bgcolor: colors.primary,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    px: 3,
                    "&:hover": { bgcolor: "#06172a" }
                  }}
                >
                  LIST AN ITEM
                </Button>
{/* 
                <IconButton sx={{ color: colors.primary }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}

                {/* USER PROFILE BOX */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ cursor: "pointer", ml: 1 }}
                >
                  <Avatar sx={{ width: 35, height: 35, bgcolor: colors.primary }}>
                    {user?.fullName?.charAt(0)}
                  </Avatar>
                  <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    <Typography variant="subtitle2" fontWeight="bold" lineHeight={1.2}>
                      {user?.fullName || "User"} <CheckCircleIcon sx={{ fontSize: 14, color: colors.verified, ml: 0.5 }} />
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      LPU University
                    </Typography>
                  </Box>
                  <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "gray" }} />
                </Stack>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: { mt: 1.5, width: 200, borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }
                  }}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profile/cart")}>
                    <ListItemIcon><ShoppingCartIcon fontSize="small" /></ListItemIcon>
                    Cart
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button sx={{ color: colors.primary, fontWeight: "bold" }} onClick={() => navigate("/login")}>
                  LOGIN
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: "bold", "&:hover": { borderColor: colors.accent } }}
                  onClick={() => navigate("/register")}
                >
                  REGISTER
                </Button>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>

      {/* MOBILE DRAWER */}
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, pb: 2, fontWeight: "bold" }}>Categories</Typography>
          <Divider />
          <List>
            {categories.map((cat) => (
              <ListItem button key={cat.name}>
                <ListItemIcon sx={{ fontSize: 20 }}>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;