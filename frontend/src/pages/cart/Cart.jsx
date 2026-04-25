// components/cart/Cart.jsx

import { useSelector, useDispatch } from "react-redux";
import {
  Container, Typography, Button, Box, Grid,
  Paper, Stack, IconButton, Divider
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  removeFromCart,
  increaseQty,
  decreaseQty
} from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  /* ================= EMPTY STATE ================= */
  if (!items.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 15 }}>
        <Typography variant="h5" fontWeight={800}>
          Your cart is empty 🛒
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/")}
        >
          Go Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: { xs: 10, md: 14 }, pb: 10 }}>
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ mb: 5 }}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", mb: 1 }}
          >
            Back to Marketplace
          </Button>

          <Typography variant="h4" fontWeight={900}>
            My Cart ({items.length})
          </Typography>
        </Box>

        <Grid container spacing={4}>

          {/* ================= LEFT: PRODUCTS ================= */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {items.map((item) => (
                <Paper
                  key={item._id}
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                  >
                    {/* ✅ IMAGE FIX */}
                    <Box
                      component="img"
                      src={item.images?.[0]}
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    {/* CONTENT */}
                    <Box sx={{ flex: 1, width: "100%" }}>
                      <Typography fontWeight={800}>
                        {item.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Seller: {item.postedBy?.fullName}
                      </Typography>

                      <Typography fontWeight={700} mt={1}>
                        ₹{item.price}
                      </Typography>
                    </Box>

                    {/* ACTIONS */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <IconButton onClick={() => dispatch(decreaseQty(item._id))}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography fontWeight={700}>
                        {item.qty}
                      </Typography>

                      <IconButton onClick={() => dispatch(increaseQty(item._id))}>
                        <AddIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* ================= RIGHT: SUMMARY ================= */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, 0.04),
                position: "sticky",
                top: 100,
              }}
            >
              <Typography variant="h6" fontWeight={800} mb={2}>
                Order Summary
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Subtotal</Typography>
                  <Typography fontWeight={700}>
                    ₹{total}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Delivery</Typography>
                  <Typography color="success.main">FREE</Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={800}>Total</Typography>
                  <Typography fontWeight={900}>
                    ₹{total}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, borderRadius: 3 }}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;