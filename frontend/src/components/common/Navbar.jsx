// components/layout/Navbar.jsx

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
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { logout } from "../../features/auth/authSlice";

const categories = [
  { name: "Books", icon: "📚" },
  { name: "Electronics", icon: "💻" },
  { name: "Dorm", icon: "🛏️" },
  { name: "Clothing", icon: "👕" },
  { name: "Stationery", icon: "✏️" },
];

const Navbar = () => {
  const theme = useTheme();
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

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", height: 70, px: { xs: 1, md: 2 } }}>
          
          {/* LEFT: LOGO */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1.5} 
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                bgcolor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              <SchoolIcon sx={{ fontSize: 20, color: "white" }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: "-0.5px", 
                display: { xs: "none", sm: "block" },
                color: theme.palette.primary.main 
              }}
            >
              COLLEX
            </Typography>
          </Stack>

          {/* CENTER: SEARCH BAR */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", px: 4 }}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                borderRadius: "12px",
                width: "100%",
                maxWidth: 600,
                height: 44,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: alpha(theme.palette.background.default, 0.8),
                transition: "all 0.2s",
                "&:focus-within": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: "background.paper",
                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}
            >
              <SearchIcon sx={{ color: "text.disabled", mr: 1.5, fontSize: 20 }} />
              <InputBase
                placeholder="Search textbooks, tech, dorm essentials..."
                fullWidth
                sx={{ 
                  fontSize: "0.875rem", 
                  fontWeight: 500,
                  "& input::placeholder": { color: "text.disabled", opacity: 1 }
                }}
              />
            </Paper>
          </Box>

          {/* RIGHT: ACTIONS */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
            {user ? (
              <>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => navigate("/create-listing")}
                  startIcon={<AddIcon />}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    px: 3,
                    "&:hover": { bgcolor: theme.palette.primary.dark }
                  }}
                >
                  Post Listing
                </Button>

                <IconButton 
                  onClick={() => navigate("/profile/cart")}
                  sx={{ 
                    color: "text.secondary",
                    "&:hover": { color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.05) }
                  }}
                >
                  <Badge 
                    badgeContent={3} 
                    sx={{ "& .MuiBadge-badge": { bgcolor: theme.palette.secondary.main, color: "white", fontWeight: 700 } }}
                  >
                    <ShoppingCartIcon fontSize="medium" />
                  </Badge>
                </IconButton>

                {/* USER PROFILE BOX */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ 
                    cursor: "pointer", 
                    ml: 1, 
                    p: 0.5, 
                    borderRadius: "12px",
                    transition: "0.2s",
                    "&:hover": { bgcolor: alpha(theme.palette.action.hover, 0.04) }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                  >
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="body2" fontWeight={700} color="text.primary">
                        {user?.fullName?.split(' ')[0]}
                      </Typography>
                      <CheckCircleIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, display: "block", mt: -0.2 }}>
                      Verified Student
                    </Typography>
                  </Box>
                  <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.disabled" }} />
                </Stack>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: { 
                      mt: 1.5, 
                      width: 220, 
                      borderRadius: "14px", 
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                      p: 0.5
                    }
                  }}
                >
                  <MenuItem onClick={() => { setAnchorEl(null); navigate("/profile"); }} sx={{ borderRadius: "10px", py: 1 }}>
                    <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                    <Typography variant="body2" fontWeight={600}>My Profile</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 1, borderStyle: "dashed" }} />
                  <MenuItem onClick={handleLogout} sx={{ borderRadius: "10px", py: 1, color: "error.main" }}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    <Typography variant="body2" fontWeight={600}>Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={1.5}>
                <Button 
                  sx={{ color: theme.palette.primary.main, fontWeight: 700, textTransform: "none" }} 
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ 
                    bgcolor: theme.palette.secondary.main, 
                    fontWeight: 700, 
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    "&:hover": { bgcolor: theme.palette.secondary.dark }
                  }}
                  onClick={() => navigate("/register")}
                >
                  Join Collex
                </Button>
              </Stack>
            )}
            
            <IconButton 
              sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* MOBILE DRAWER */}
      <Drawer 
        anchor="right"
        open={drawer} 
        onClose={() => setDrawer(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Categories</Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {categories.map((cat) => (
              <ListItem 
                button 
                key={cat.name} 
                sx={{ borderRadius: "10px", mb: 0.5 }}
                onClick={() => setDrawer(false)}
              >
                <ListItemIcon sx={{ fontSize: 20, minWidth: 40 }}>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;