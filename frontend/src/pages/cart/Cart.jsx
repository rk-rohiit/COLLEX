import { useSelector, useDispatch } from "react-redux";
import {
  Container, Typography, Button, Box, Grid,
  Paper, Stack, IconButton, Divider, Avatar, Alert, Tooltip
} from "@mui/material";
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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  // Prototype Palette
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    verified: "#2ECC71", // Green
    bg: "#F4F7F9"
  };

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: "80vh", display: 'flex', alignItems: 'center', bgcolor: colors.bg, pt: 10 }}>
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 5 }}>
            <ShoppingBagIcon sx={{ fontSize: 80, color: '#DDD', mb: 2 }} />
            <Typography variant="h4" fontWeight="800" color={colors.primary}>Your Cart is Empty</Typography>
            <Typography color="text.secondary" sx={{ mb: 4, mt: 1 }}>Explore deals from fellow students on campus!</Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ bgcolor: colors.primary, px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
              Back to Marketplace
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: colors.bg, minHeight: "100vh", pt: 12, pb: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight="900" color={colors.primary} sx={{ mb: 4, letterSpacing: '-1px' }}>
          Your Campus Cart
        </Typography>

        <Grid container spacing={4}>
          {/* 🔥 LEFT: ITEM LIST */}
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {items.map((item) => (
                <Paper
                  key={item._id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: "1px solid #edf2f7",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">

                    {/* IMAGE */}
                    <Grid item xs={3} sm={2}>
                      <Box
                        component="img"
                        src={item.images?.[0] || "https://placehold.co/200"}
                        sx={{
                          width: "100%",
                          height: 80,
                          borderRadius: 3,
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/200";
                        }}
                      />
                    </Grid>

                    {/* INFO */}
                    <Grid item xs={9} sm={6}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: colors.primary }}
                        noWrap
                      >
                        {item.title}
                      </Typography>

                      {/* SELLER */}
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Seller: {item.postedBy?.fullName || "Student"}
                        </Typography>

                        {/* optional verified */}
                        {item.postedBy?.verified && (
                          <CheckCircleIcon
                            sx={{ fontSize: 12, color: colors.verified }}
                          />
                        )}
                      </Stack>

                      {/* LOCATION */}
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        Location: {item.location || item.postedBy?.campusId || "Campus"}
                      </Typography>
                    </Grid>

                    {/* ACTIONS */}
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ textAlign: { sm: "right" } }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent={{
                          xs: "flex-start",
                          sm: "flex-end",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => dispatch(decreaseQty(item._id))}
                          sx={{ border: "1px solid #DDD" }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          fontWeight="bold"
                          sx={{ minWidth: 24, textAlign: "center" }}
                        >
                          {item.qty}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => dispatch(increaseQty(item._id))}
                          sx={{ border: "1px solid #DDD" }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>

                        <Tooltip title="Remove">
                          <IconButton
                            onClick={() => dispatch(removeFromCart(item._id))}
                            sx={{ ml: 2, color: "error.light" }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      {/* PRICE */}
                      <Typography
                        variant="h6"
                        fontWeight="900"
                        color={colors.primary}
                        sx={{ mt: 1 }}
                      >
                        ₹ {(item.price * item.qty).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* 🔥 RIGHT: ORDER SUMMARY (STICKY) */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 100, border: '1px solid #edf2f7' }}>
              <Typography variant="h5" fontWeight="900" color={colors.primary} gutterBottom>
                Order Summary
              </Typography>

              <Stack spacing={2} sx={{ my: 3 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight="bold">₹ {total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Campus Pickup</Typography>
                  <Typography fontWeight="bold" color={colors.verified}>FREE</Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h5" fontWeight="900" color={colors.accent}>₹ {total}</Typography>
                </Box>
              </Stack>

              <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontSize: '0.8rem' }}>
                Meet in a public campus location for the exchange. Stay safe!
              </Alert>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate("/checkout")}
                sx={{
                  bgcolor: colors.accent,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  "&:hover": { bgcolor: "#d15b28" }
                }}
              >
                Checkout
              </Button>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 2, color: colors.verified }}>
                <SecurityIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" fontWeight="bold">Secure Student Transaction</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;