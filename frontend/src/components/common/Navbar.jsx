
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
  Select,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports",
  "Beauty",
];

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length ?? 0);
  const wishlistCount = useSelector((state) => state.wishlist?.items?.length ?? 0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}&category=${searchCategory}`);
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${cat}`);
    }
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
      
      {/* PROMO BAR */}
      <Box
        sx={{
          background: "#eaeafc",
          color: "#4f46e5",
          textAlign: "center",
          fontSize: "13px",
          py: 0.5,
        }}
      >
        → Free delivery on orders above ₹499 | Use code <b>COLLEX10</b> for 10% off
      </Box>

      <Container maxWidth="xl" sx={{ mt: 1 }}>
        <Box
          sx={{
            backdropFilter: "blur(12px)",
            background: "rgba(30,30,30,0.85)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            px: 2,
            color: "white",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>

            {/* MOBILE MENU */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* LOGO */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                cursor: "pointer",
                color: "#6c63ff",
              }}
              onClick={() => navigate("/")}
            >
              Collex<span style={{ color: "#ff6f61" }}>.</span>
            </Typography>

            {/* SEARCH */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                flex: 1,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                background: "#1e1e1e",
                borderRadius: "999px",
                px: 1,
                maxWidth: 600,
              }}
            >
              <Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{
                  color: "white",
                  px: 1,
                  fontSize: 13,
                }}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>

              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1, px: 1, color: "white" }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Search
              </Button>
            </Box>

            {/* ACTIONS */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

              {/* WISHLIST */}
              {user && (
                <IconButton sx={{ color: "white", flexDirection: "column" }}>
                  <Badge badgeContent={wishlistCount} color="error">
                    <FavoriteBorderIcon />
                  </Badge>
                  <Typography fontSize={10}>Wishlist</Typography>
                </IconButton>
              )}

              {/* CART */}
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{ color: "white", flexDirection: "column" }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
                <Typography fontSize={10}>Cart</Typography>
              </IconButton>

              {/* AUTH */}
              {user ? (
                <Box textAlign="center">
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  <Typography fontSize={10}>Account</Typography>

                  <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem onClick={() => navigate("/profile")}>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon><LogoutIcon /></ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{
                    borderRadius: "999px",
                    textTransform: "none",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>

          {/* CATEGORY BAR */}
          {user && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                pb: 1,
                overflowX: "auto",
              }}
            >
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  sx={{
                    borderRadius: "999px",
                    px: 2,
                    fontSize: 13,
                    color: activeCategory === cat ? "black" : "white",
                    bgcolor: activeCategory === cat ? "primary.main" : "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {cat}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Container>

      {/* MOBILE DRAWER */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List>
            {CATEGORIES.map((cat) => (
              <ListItem button key={cat} onClick={() => handleCategoryClick(cat)}>
                <ListItemText primary={cat} />
              </ListItem>
            ))}
          </List>

          <Divider />

          {!user && (
            <Box p={2}>
              <Button fullWidth variant="contained" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
