import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container, Grid, Box, Typography, Button, Stack,
  Avatar, Chip, Divider, Paper, IconButton, Breadcrumbs, Link, CircularProgress
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useDispatch, useSelector } from "react-redux";
import { fetchListingById, clearSelectedListing } from "@/features/listing/listingSlice";
import {addToCart} from "@/features/cart/cartSlice";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedListing, singleLoading, error } = useSelector(
    (state) => state.listing
  );

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  alert("Added to cart 🛒");
  navigate("/cart");
  }

  useEffect(() => {
    dispatch(fetchListingById(id));

    return () => {
      dispatch(clearSelectedListing()); // 🔥 prevent old data
    };
  }, [id, dispatch]);

  /* =========================
     🔥 LOADING STATE
  ========================= */
  if (singleLoading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  /* =========================
     🔥 ERROR STATE
  ========================= */
  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!selectedListing) return null;

  const product = selectedListing;

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", pt: 12, pb: 8 }}>
      <Container maxWidth="lg">

        {/* 🔥 HEADER */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "white" }}>
            <ArrowBackIcon />
          </IconButton>

          <Breadcrumbs separator="›">
            <Link underline="hover" onClick={() => navigate("/")}>Home</Link>
            <Link underline="hover">{product.category}</Link>
            <Typography>{product.title}</Typography>
          </Breadcrumbs>
        </Stack>

        <Grid container spacing={4}>

          {/* 🔥 IMAGE */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ borderRadius: 4, overflow: "hidden", position: "relative" }}>
              <Box
                component="img"
                src={product.images?.[0]}
                sx={{
                  width: "100%",
                  maxHeight: 500,
                  objectFit: "contain",
                  bgcolor: "#fff"
                }}
              />

              <IconButton sx={{ position: "absolute", top: 16, right: 16, bgcolor: "white" }}>
                <FavoriteBorderIcon color="error" />
              </IconButton>
            </Paper>
          </Grid>

          {/* 🔥 DETAILS */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>

              {/* TITLE + PRICE */}
              <Box>
                <Chip label={product.condition} color="primary" size="small" sx={{ mb: 1 }} />

                <Typography variant="h4" fontWeight="900">
                  {product.title}
                </Typography>

                <Typography variant="h3" fontWeight="900" color="secondary.main">
                  ₹{product.price}
                </Typography>
              </Box>

              <Divider />

              {/* 🔥 SELLER */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="caption" fontWeight="bold">
                  LISTED BY
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <Avatar>
                    {product?.seller?.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight="bold">
                      {product?.seller?.name}
                      {product?.seller?.verified && (
                        <CheckCircleIcon sx={{ fontSize: 16, color: "green", ml: 0.5 }} />
                      )}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      <LocationOnIcon sx={{ fontSize: 14 }} />
                      {product?.seller?.university}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* 🔥 DESCRIPTION */}
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Description
                </Typography>

                <Typography color="text.secondary">
                  {product.description}
                </Typography>
              </Box>

              {/* 🔥 ACTIONS */}
              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<MessageIcon />}
                  sx={{ py: 1.5 }}
                >
                  CHAT WITH SELLER
                </Button>

                <Button variant="outlined">
                  OFFER
                </Button>
                <Button variant="outlined"
                size="small"
            onClick={addToCartHandler}
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