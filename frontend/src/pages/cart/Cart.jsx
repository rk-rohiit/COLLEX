// components/cart/Cart.jsx

import { useSelector, useDispatch } from "react-redux";
import {
  Container, Typography, Button, Box, Grid,
  Paper, Stack, IconButton, Divider,
} from "@mui/material";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

import DeleteOutlineIcon  from "@mui/icons-material/DeleteOutline";
import AddIcon            from "@mui/icons-material/Add";
import RemoveIcon         from "@mui/icons-material/Remove";
import ArrowBackIcon      from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon  from "@mui/icons-material/ImageOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

/* ─── Item card ──────────────────────────────────────────────── */
const CartItem = ({ item, dispatch }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: "12px 14px", md: "14px 16px" },
      borderRadius: "12px",
      border: "0.5px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <Stack direction="row" alignItems="center" gap={{ xs: 1.25, sm: 1.75 }}>

      {/* ── Image — fixed square, never stretches ── */}
      <Box
        sx={{
          width: { xs: 64, sm: 72 },
          height: { xs: 64, sm: 72 },
          flexShrink: 0,           // ← never shrinks on small screens
          borderRadius: "8px",
          border: "0.5px solid",
          borderColor: "divider",
          overflow: "hidden",
          bgcolor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.images?.[0] ? (
          <Box
            component="img"
            src={item.images[0]}
            alt={item.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",   // ← always fills the square, no stretch/squash
              display: "block",
            }}
          />
        ) : (
          <ImageOutlinedIcon sx={{ fontSize: 22, color: "text.disabled" }} />
        )}
      </Box>

      {/* ── Item info ── */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: { xs: "13px", sm: "14px" },
            fontWeight: 500,
            color: "text.primary",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{ fontSize: "11px", color: "text.secondary", mt: 0.375 }}
        >
          Seller: {item.postedBy?.fullName || "—"}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "secondary.main",
            fontFamily: "'JetBrains Mono', monospace",
            mt: 0.625,
          }}
        >
          ₹{Number(item.price).toLocaleString("en-IN")}
        </Typography>
      </Box>

      {/* ── Qty + delete controls ── */}
      <Stack direction="row" alignItems="center" gap={0.5} flexShrink={0}>
        {/* Decrease */}
        <IconButton
          size="small"
          onClick={() => dispatch(decreaseQty(item._id))}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "7px",
            border: "0.5px solid",
            borderColor: "divider",
            bgcolor: "background.default",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <RemoveIcon sx={{ fontSize: 13 }} />
        </IconButton>

        {/* Qty number */}
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 500,
            color: "text.primary",
            minWidth: "22px",
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {item.qty || 1}
        </Typography>

        {/* Increase */}
        <IconButton
          size="small"
          onClick={() => dispatch(increaseQty(item._id))}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "7px",
            border: "0.5px solid",
            borderColor: "divider",
            bgcolor: "background.default",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <AddIcon sx={{ fontSize: 13 }} />
        </IconButton>

        {/* Delete */}
        <IconButton
          size="small"
          onClick={() => dispatch(removeFromCart(item._id))}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "7px",
            border: "0.5px solid",
            borderColor: "#FCEBEB",
            bgcolor: "#FCEBEB",
            ml: 0.5,
            "&:hover": { bgcolor: "#F7C1C1" },
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 14, color: "#A32D2D" }} />
        </IconButton>
      </Stack>
    </Stack>
  </Paper>
);

/* ─── Order summary panel ────────────────────────────────────── */
const SummaryPanel = ({ items, total, onCheckout }) => {
  const totalQty = items.reduce((acc, i) => acc + (i.qty || 1), 0);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "12px",
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        // Sticky only on md+; on mobile it stacks below the items
        position: { md: "sticky" },
        top: { md: 100 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}
        >
          Order summary
        </Typography>
      </Box>

      {/* Rows */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Stack spacing={0.25}>
          <Stack direction="row" justifyContent="space-between" py={0.625}>
            <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
              Subtotal ({totalQty} {totalQty === 1 ? "item" : "items"})
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "'JetBrains Mono', monospace",
                color: "text.primary",
              }}
            >
              ₹{total.toLocaleString("en-IN")}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" py={0.625}>
            <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
              Delivery
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, color: "#3B6D11" }}
            >
              Free
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" py={0.625}>
            <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
              Platform fee
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, color: "#3B6D11" }}
            >
              Free
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.25 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}
          >
            Total
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "'JetBrains Mono', monospace",
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            ₹{total.toLocaleString("en-IN")}
          </Typography>
        </Stack>

        {/* CTA */}
        <Button
          fullWidth
          variant="contained"
          onClick={onCheckout}
          sx={{
            mt: 1.75,
            py: 1.125,
            bgcolor: "primary.main",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
          }}
        >
          Proceed to checkout
        </Button>

        {/* Trust note */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.625}
          mt={1.25}
        >
          <ShieldOutlinedIcon sx={{ fontSize: 13, color: "#3B6D11" }} />
          <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
            Secure campus exchange
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

/* ─── Empty state ────────────────────────────────────────────── */
const EmptyCart = ({ onNavigate }) => (
  <Box
    sx={{
      textAlign: "center",
      mt: { xs: 10, md: 15 },
      px: 2,
    }}
  >
    <Typography
      sx={{ fontSize: "20px", fontWeight: 500, color: "text.primary" }}
    >
      Your cart is empty
    </Typography>
    <Typography
      sx={{ fontSize: "14px", color: "text.secondary", mt: 1 }}
    >
      Browse the marketplace and add items to get started.
    </Typography>
    <Button
      variant="contained"
      onClick={onNavigate}
      sx={{
        mt: 3,
        bgcolor: "primary.main",
        color: "#fff",
        textTransform: "none",
        fontSize: "13px",
        fontWeight: 500,
        borderRadius: "8px",
        boxShadow: "none",
        px: 3,
        "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
      }}
    >
      Go to marketplace
    </Button>
  </Box>
);

/* ─── Main Cart ──────────────────────────────────────────────── */
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  if (!items.length) {
    return <EmptyCart onNavigate={() => navigate("/")} />;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        pt: { xs: 9, md: 12 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Back + title */}
        <Box mb={{ xs: 2.5, md: 3.5 }}>
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
            onClick={() => navigate("/")}
            sx={{
              mb: 1.25,
              fontSize: "12px",
              fontWeight: 500,
              color: "text.secondary",
              textTransform: "none",
              px: 1.5,
              py: 0.625,
              border: "0.5px solid",
              borderColor: "divider",
              borderRadius: "8px",
              bgcolor: "background.paper",
              minWidth: "auto",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Back to marketplace
          </Button>

          <Stack direction="row" alignItems="baseline" gap={1}>
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "22px" },
                fontWeight: 500,
                color: "text.primary",
                letterSpacing: "-0.4px",
              }}
            >
              My cart
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {items.length} {items.length === 1 ? "item" : "items"}
            </Typography>
          </Stack>
        </Box>

        {/*
          ── Layout:
             xs/sm  → single column, summary below items
             md+    → items left (8 cols), summary right (4 cols)
        ──*/}
        <Grid container spacing={{ xs: 1.5, md: 2.5 }} alignItems="flex-start">

          {/* Left — item list */}
          <Grid item xs={12} md={8}>
            <Stack spacing={{ xs: 1, md: 1.25 }}>
              {items.map((item) => (
                <CartItem key={item._id} item={item} dispatch={dispatch} />
              ))}
            </Stack>
          </Grid>

          {/* Right — summary */}
          <Grid item xs={12} md={4}>
            <SummaryPanel
              items={items}
              total={total}
              onCheckout={() => navigate("/checkout")}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;