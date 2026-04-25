// pages/order/OrderDetailPage.jsx

import { useEffect, useState } from "react";
import { Box, Container, Grid, Skeleton, Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getMyOrders, getReceivedOrders } from "@/features/order/orderSlice";

import OrderStatusCard    from "@/components/order/OrderStatusCard";
import ProductDetailsCard from "@/components/order/ProductDetailsCard";
import MeetingDetailsCard from "@/components/order/MeetingDetailsCard";
import DeliverySection    from "@/components/order/DeliverySection";

/* ─── Skeleton ───────────────────────────────────────────────── */
const OrderDetailSkeleton = () => (
  <Stack spacing={2}>
    <Skeleton variant="rounded" width={72} height={30} sx={{ borderRadius: 2 }} />
    {/* Row 1 — status full width */}
    <Skeleton variant="rounded" height={118} sx={{ borderRadius: 3 }} />
    {/* Row 2 — product + meeting */}
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={210} sx={{ borderRadius: 3 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={210} sx={{ borderRadius: 3 }} />
      </Grid>
    </Grid>
    {/* Row 3 — delivery */}
    <Skeleton variant="rounded" height={170} sx={{ borderRadius: 3 }} />
  </Stack>
);

/* ─── Page ───────────────────────────────────────────────────── */
const OrderDetailPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myOrders = [], receivedOrders = [], loading } = useSelector((s) => s.order);
  const { user } = useSelector((s) => s.auth);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  useEffect(() => {
    const found =
      myOrders.find((o) => o._id === id) ||
      receivedOrders.find((o) => o._id === id);
    setOrder(found || null);
  }, [myOrders, receivedOrders, id]);

  const isSeller = user?._id === order?.seller?._id;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: { xs: 7, md: 10 }, pb: 8 }}>
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2, sm: 3, md: 4 } }}
      >
        {loading || !order ? (
          <OrderDetailSkeleton />
        ) : (
          <Stack spacing={2}>

            {/* Back */}
            <Box>
              <Button
                startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
                onClick={() => navigate(-1)}
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "text.secondary",
                  textTransform: "none",
                  px: 1.5,
                  py: 0.625,
                  border: "0.5px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  minWidth: "auto",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                Back
              </Button>
            </Box>

            {/* ── ROW 1: Status card — always full width ── */}
            <OrderStatusCard order={order} isSeller={isSeller} />

            {/* ── ROW 2: Product + Meeting side by side ── */}
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <ProductDetailsCard order={order} isSeller={isSeller} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MeetingDetailsCard order={order} />
              </Grid>
            </Grid>

            {/* ── ROW 3: Delivery — always full width ── */}
            <DeliverySection order={order} isSeller={isSeller} />

          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default OrderDetailPage;