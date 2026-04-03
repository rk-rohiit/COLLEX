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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Menu handlers
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  // 🔥 Nav items
  const baseNav = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  const navItems = user
    ? [...baseNav, { label: "Products", path: "/products" }]
    : baseNav;

  const handleNavClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      const section = document.getElementById(item.id);
      section?.scrollIntoView({ behavior: "smooth" });
    }
    setDrawerOpen(false);
  };

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        background: scrolled
          ? "rgba(15,15,15,0.7)"
          : "rgba(15,15,15,0.3)",
        transition: "0.3s",
      }}
    >
      <Container>
        <Toolbar>

          {/* 🔥 HAMBURGER */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>

          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => handleNavClick({ id: "home" })}
          >
            Collex
          </Typography>

          {/* DESKTOP NAV */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item, i) => (
              <Button
                key={i}
                onClick={() => handleNavClick(item)}
                sx={{ color: "white" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* 🔥 AUTH */}
          {user ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar src={user?.profilePic}>
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>

                {/* ✅ CART ONLY HERE */}
                <MenuItem onClick={() => navigate("/cart")}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  Cart
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                background: gradient,
                borderRadius: "999px",
              }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>

      {/* 🔥 DRAWER (Mobile Menu) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260 }}>
          
          {/* 🔥 CLOSE BUTTON */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item, i) => (
              <ListItem
                button
                key={i}
                onClick={() => handleNavClick(item)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;