// pages/profile/ProfilePage.jsx

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, getReceivedOrders } from "@/features/order/orderSlice";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import OrdersTabs from "@/components/profile/OrdersTabs";
import OrderDetailPanel from "@/components/profile/OrderDetailPanel";

/* ─── Loading skeleton ─────────────────────────────────────── */
const ProfileSkeleton = () => (
  <Box>
    <Skeleton
      variant="rounded"
      height={88}
      sx={{ borderRadius: 3, mb: 1.5 }}
    />
    <Grid container spacing={1.25} mb={1.5}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={4} key={i}>
          <Skeleton variant="rounded" height={90} sx={{ borderRadius: 3 }} />
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={7}>
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
      </Grid>
    </Grid>
  </Box>
);

/* ─── Page ──────────────────────────────────────────────────── */
const ProfilePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { myOrders = [], receivedOrders = [], loading } = useSelector(
    (s) => s.order
  );

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  // Auto-select first order for the detail panel
  useEffect(() => {
    if (!selectedOrder && myOrders.length > 0) {
      setSelectedOrder(myOrders[0]);
    }
  }, [myOrders]);

  const hasNoActivity =
    !loading && myOrders.length === 0 && receivedOrders.length === 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        pt: { xs: 7, md: 10 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* Header */}
            <ProfileHeader />

            {/* Stats */}
            <ProfileStats
              myOrders={myOrders}
              receivedOrders={receivedOrders}
            />

            {/* Main grid */}
            <Grid container spacing={1.5}>
              {/* Orders list */}
              <Grid item xs={12} md={7}>
                <OrdersTabs
                  myOrders={myOrders}
                  receivedOrders={receivedOrders}
                  onSelectOrder={setSelectedOrder}
                  selectedOrder={selectedOrder}
                />
              </Grid>

              {/* Detail panel */}
              <Grid item xs={12} md={5}>
                <OrderDetailPanel order={selectedOrder} />
              </Grid>
            </Grid>

            {/* Whole-page empty state */}
            {hasNoActivity && (
              <Box textAlign="center" mt={8}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ letterSpacing: "-0.3px" }}
                >
                  No activity yet
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.75}
                >
                  Start buying or selling to see your activity here.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;