// components/listing/ProductView.jsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Grid, Box, Typography, Button, Stack,
  Avatar, Chip, Divider, Paper, IconButton, Breadcrumbs,
  Link, Skeleton, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import { useDispatch, useSelector } from "react-redux";
import { fetchListingById, clearSelectedListing } from "@/features/listing/listingSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { selectedListing, singleLoading, error } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    dispatch(fetchListingById(id));
    return () => {
      dispatch(clearSelectedListing());
    };
  }, [id, dispatch]);

  const addToCartHandler = () => {
    dispatch(addToCart(selectedListing));
    toast.success("Added to cart!", { icon: "🛒" });
    navigate("/profile/cart");
  };

  const handleAction = (msg, icon) => {
    toast.info(msg, { icon });
  };

  if (singleLoading) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width={200} sx={{ mb: 2 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Skeleton variant="rounded" width="100%" height={450} sx={{ borderRadius: 4 }} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Skeleton variant="text" height={60} />
                <Skeleton variant="text" width="40%" height={50} />
                <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3 }} />
                <Skeleton variant="rounded" height={150} sx={{ borderRadius: 3 }} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error || !selectedListing) {
    return (
      <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Typography variant="h6" color="error">{error || "Product not found"}</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>Go Back</Button>
      </Box>
    );
  }

  const product = selectedListing;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: { xs: 10, md: 14 }, pb: 8 }}>
      <Container maxWidth="lg">
        {/* ── BREADCRUMBS ── */}
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Breadcrumbs separator="›" sx={{ fontSize: 14 }}>
            <Link underline="hover" color="text.secondary" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>Home</Link>
            <Typography color="text.primary" fontWeight={700} sx={{ textTransform: 'capitalize' }}>{product.category}</Typography>
          </Breadcrumbs>
        </Stack>

        <Grid container spacing={5}>
          {/* ── LEFT: IMAGE ── */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "white",
              }}
            >
              <Box
                component="img"
                src={product.images?.[0]}
                sx={{ width: "100%", maxHeight: 500, objectFit: "contain", p: 2 }}
              />
              <IconButton
                onClick={() => handleAction("Saved to wishlist!", "❤️")}
                sx={{ position: "absolute", top: 16, right: 16, bgcolor: "white", boxShadow: 2, "&:hover": { bgcolor: "grey.100" } }}
              >
                <FavoriteBorderIcon color="error" />
              </IconButton>
              <Chip
                label={product.condition}
                sx={{
                  position: "absolute", top: 16, left: 16,
                  bgcolor: theme.palette.primary.main, color: "white",
                  fontWeight: 800, textTransform: 'uppercase', fontSize: 10
                }}
              />
            </Paper>
          </Grid>

          {/* ── RIGHT: INFO ── */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: "-0.5px" }}>
                  {product.title}
                </Typography>
                <Typography variant="h3" fontWeight={900} color="primary.main">
                  ₹{product.price?.toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Divider />

              {/* SELLER CARD */}
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.02), borderColor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 1 }}>
                  LISTED BY
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <Avatar 
                    sx={{ width: 48, height: 48, bgcolor: "primary.main", fontWeight: 700 }}
                  >
                    {product.postedBy?.fullName?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography fontWeight={700} variant="body1">
                        {product.postedBy?.fullName}
                      </Typography>
                      <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
                      <LocationOnIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption" fontWeight={600}>{product.location || "Campus"}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

              <Box>
                <Typography variant="subtitle1" fontWeight={800} gutterBottom>Description</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {product.description}
                </Typography>
              </Box>

              {/* ACTIONS */}
              <Stack spacing={2} pt={1}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={addToCartHandler}
                  sx={{ 
                    py: 1.5, borderRadius: 3, fontWeight: 800, fontSize: 15,
                    bgcolor: theme.palette.secondary.main, // Action Orange
                    "&:hover": { bgcolor: theme.palette.secondary.dark }
                  }}
                >
                  Add to Cart
                </Button>

                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<MessageIcon />}
                    onClick={() => handleAction("Chat coming soon!", "💬")}
                    sx={{ py: 1.2, borderRadius: 3, fontWeight: 700, borderColor: 'divider' }}
                  >
                    Chat
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LocalOfferOutlinedIcon />}
                    onClick={() => handleAction("Offers feature coming soon!", "🏷️")}
                    sx={{ py: 1.2, borderRadius: 3, fontWeight: 700, borderColor: 'divider' }}
                  >
                    Offer
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductView;