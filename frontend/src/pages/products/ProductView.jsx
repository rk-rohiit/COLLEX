import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Grid, Box, Typography, Button, Stack,
  Avatar, Chip, Divider, Paper, IconButton, Breadcrumbs,
  Link, CircularProgress, Skeleton
} from "@mui/material";

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

import { toast } from "react-toastify"; // ← uses your already-integrated toast

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedListing, singleLoading, error } = useSelector(
    (state) => state.listing
  );

  /* ── Add to cart ──────────────────────────────────────────── */
  const addToCartHandler = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!", {
      icon: "🛒",
      duration: 2500,
    });
    navigate("/cart");
  };

  /* ── Wishlist (placeholder) ───────────────────────────────── */
  const handleWishlist = () => {
    toast.success("Saved to wishlist!", {
      icon: "❤️",
      duration: 2000,
    });
  };

  /* ── Chat (placeholder) ───────────────────────────────────── */
  const handleChat = () => {
    toast.warn("This feature is under contruction", {
      icon: "💬",
      duration: 2000,
    });
  };

  /* ── Offer (placeholder) ──────────────────────────────────── */
  const handleOffer = () => {
    toast.warn("Offer feature coming soon!", {
      icon: "🏷️",
      duration: 2000,
    });
  };

  useEffect(() => {
    dispatch(fetchListingById(id));
    return () => {
      dispatch(clearSelectedListing());
    };
  }, [id, dispatch]);

  /* ── Loading ──────────────────────────────────────────────── */
  if (singleLoading) {
    return (
      <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pt: { xs: 8, md: 12 }, pb: 8 }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={260} height={28} />
          </Stack>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Skeleton variant="rounded" width="100%" height={420} sx={{ borderRadius: 4 }} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={2}>
                <Skeleton variant="text" width="40%" height={28} />
                <Skeleton variant="text" width="80%" height={44} />
                <Skeleton variant="text" width="35%" height={52} />
                <Skeleton variant="rounded" width="100%" height={90} sx={{ borderRadius: 3 }} />
                <Skeleton variant="text" width="100%" height={80} />
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rounded" width={90} height={48} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rounded" width={110} height={48} sx={{ borderRadius: 2 }} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  /* ── Error ────────────────────────────────────────────────── */
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          bgcolor: "#F8FAFC",
        }}
      >
        <Typography variant="h6" color="error" fontWeight={600}>
          Something went wrong
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          {error}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 1, borderRadius: 2 }}
        >
          Go back
        </Button>
      </Box>
    );
  }

  if (!selectedListing) return null;

  const product = selectedListing;

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pt: { xs: 8, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* ── Breadcrumb header ────────────────────────────────── */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              bgcolor: "white",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": { bgcolor: "grey.50" },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Breadcrumbs
            separator="›"
            sx={{ fontSize: { xs: 12, sm: 14 }, "& .MuiBreadcrumbs-ol": { flexWrap: "nowrap" } }}
          >
            <Link
              underline="hover"
              color="text.secondary"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="text.secondary"
              sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {product.category}
            </Link>
            <Typography
              fontSize="inherit"
              color="text.primary"
              fontWeight={500}
              noWrap
              sx={{ maxWidth: { xs: 120, sm: 220, md: "none" } }}
            >
              {product.title}
            </Typography>
          </Breadcrumbs>
        </Stack>

        <Grid container spacing={{ xs: 3, md: 4 }}>

          {/* ── Product image ─────────────────────────────────── */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                component="img"
                src={product.images?.[0]}
                alt={product.title}
                sx={{
                  width: "100%",
                  maxHeight: { xs: 300, sm: 420, md: 500 },
                  objectFit: "contain",
                  bgcolor: "#fff",
                  display: "block",
                }}
              />

              {/* Wishlist button */}
              <IconButton
                onClick={handleWishlist}
                sx={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  bgcolor: "white",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "error.50" },
                }}
              >
                <FavoriteBorderIcon color="error" fontSize="small" />
              </IconButton>

              {/* Condition badge on image */}
              <Chip
                label={product.condition}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 0.5,
                }}
              />
            </Paper>
          </Grid>

          {/* ── Product details ───────────────────────────────── */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>

              {/* Title + Price */}
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ lineHeight: 1.3, mb: 1, fontSize: { xs: "1.3rem", md: "1.6rem" } }}
                >
                  {product.title}
                </Typography>

                <Typography
                  fontWeight={900}
                  color="secondary.main"
                  sx={{ fontSize: { xs: "2rem", md: "2.4rem" }, lineHeight: 1 }}
                >
                  ₹{product.price?.toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Divider />

              {/* postedBy card */}
              <Paper
  variant="outlined"
  sx={{
    p: 2,
    borderRadius: 3,
    bgcolor: "background.default",
    borderColor: "divider",
  }}
>
  <Typography
    variant="caption"
    fontWeight={700}
    color="text.secondary"
    letterSpacing={0.8}
  >
    LISTED BY
  </Typography>

  <Stack direction="row" spacing={1.5} alignItems="center" mt={1}>
    
    {/* AVATAR */}
    <Avatar
      src={product?.postedBy?.avatar}
      sx={{
        width: 42,
        height: 42,
        bgcolor: "primary.main",
        fontWeight: 700,
        fontSize: 16,
      }}
    >
      {product?.postedBy?.fullName?.charAt(0) || "U"}
    </Avatar>

    <Box sx={{ flex: 1, minWidth: 0 }}>
      
      {/* NAME + VERIFIED */}
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography fontWeight={700} fontSize={15} noWrap>
          {product?.postedBy?.fullName || "Student"}
        </Typography>

        {/* ✅ Only show if exists */}
        {product?.postedBy?.verified && (
          <CheckCircleIcon sx={{ fontSize: 15, color: "success.main" }} />
        )}
      </Stack>

      {/* LOCATION / CAMPUS */}
      <Stack direction="row" alignItems="center" spacing={0.3}>
        <LocationOnIcon sx={{ fontSize: 13, color: "text.disabled" }} />

        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          sx={{ maxWidth: { xs: 180, sm: "none" } }}
        >
          {product?.location || product?.postedBy?.campusId || "Campus"}
        </Typography>
      </Stack>
    </Box>
  </Stack>
</Paper>

              {/* Description */}
              <Box>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Description
                </Typography>
                <Typography
                  color="text.secondary"
                  fontSize={14}
                  sx={{ lineHeight: 1.75 }}
                >
                  {product.description}
                </Typography>
              </Box>

              {/* Action buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<MessageIcon />}
                  onClick={handleChat}
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    borderRadius: 2,
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" },
                  }}
                >
                  Chat with postedBy
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<LocalOfferOutlinedIcon />}
                  onClick={handleOffer}
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                    minWidth: { xs: "unset", sm: 100 },
                  }}
                >
                  Offer
                </Button>

                <Button
                  variant="outlined"
                  color="primary.main"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={addToCartHandler}
                  sx={{
                    py: 1.4,
                    width:'300px',
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" },
                  }}
                >
                  Add to cart
                </Button>
              </Stack>

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductView;