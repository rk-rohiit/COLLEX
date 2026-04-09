
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
   <AppBar
  position="fixed"
  elevation={0}
  sx={{
    background: "#fff",
    borderBottom: "1px solid #E5E7EB",
  }}
>

  {/* 🔥 TOP BAR */}
  <Box
    sx={{
      textAlign: "center",
      fontSize: "12px",
      py: 0.6,
      bgcolor: "primary.main",
      color: "#fff",
    }}
  >
    🚀 Free delivery above ₹499 | Use COLLEX10
  </Box>

  <Container maxWidth="xl">
    <Toolbar sx={{ gap: 2, py: 1 }}>

      {/* MOBILE MENU */}
      <IconButton
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* LOGO */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Collex<span style={{ color: theme.palette.primary.main }}>.</span>
      </Typography>

      {/* 🔥 SEARCH BAR */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          border: "1px solid #E5E7EB",
          borderRadius: "999px",
          px: 2,
          py: 0.5,
          maxWidth: 600,
          background: "#F9FAFB",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <Select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          variant="standard"
          disableUnderline
          sx={{
            mr: 1,
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
          sx={{ flex: 1 }}
        />

        <IconButton type="submit" color="primary">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* 🔥 ACTIONS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

        {/* WISHLIST */}
        {user && (
          <IconButton>
            <Badge badgeContent={wishlistCount} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        )}

        {/* CART */}
        <IconButton onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* AUTH */}
        {user ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <Avatar>
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>

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
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 999 }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Toolbar>

    {/* 🔥 CATEGORY BAR */}
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
            color: activeCategory === cat ? "#fff" : "text.primary",
            bgcolor: activeCategory === cat ? "primary.main" : "transparent",
            "&:hover": {
              bgcolor: "primary.main",
              color: "#fff",
            },
          }}
        >
          {cat}
        </Button>
      ))}
    </Box>
  </Container>

  {/* 🔥 MOBILE DRAWER */}
  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    <Box sx={{ width: 260 }}>
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
