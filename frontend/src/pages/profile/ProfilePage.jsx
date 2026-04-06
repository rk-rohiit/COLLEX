import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Grid,
  Box,
  Avatar,
  Divider,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyOrders,
  getReceivedOrders,
} from "@/features/order/orderSlice";

// ─── Status Config (Theme Based) ─────────────────────────────
const getStatusConfig = (theme) => ({
  pending: {
    label: "Pending",
    bg: "warning.light",
    text: "warning.main",
    dot: theme.palette.warning.main,
  },
  completed: {
    label: "Completed",
    bg: "success.light",
    text: "success.main",
    dot: theme.palette.success.main,
  },
  cancelled: {
    label: "Cancelled",
    bg: "error.light",
    text: "error.main",
    dot: theme.palette.error.main,
  },
});

// ─── Stat Card ───────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent }) => (
  <Card sx={{ position: "relative" }}>
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        bgcolor: accent || "secondary.main",
      }}
    />
    <CardContent>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="body2">{icon}</Typography>
    </CardContent>
  </Card>
);

// ─── Order Card ──────────────────────────────────────────────
const OrderCard = ({ order, isReceived, onMarkComplete }) => {
  const theme = useTheme();
  const statusConfig = getStatusConfig(theme);
  const status = statusConfig[order.status] || statusConfig.pending;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            {order.listing?.title || "Untitled"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: status.bg,
              color: status.text,
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: status.dot,
              }}
            />
            <Typography variant="caption">{status.label}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>
          <Typography variant="body2">
            Type: <b>{order.type || "—"}</b>
          </Typography>

          {isReceived && (
            <Typography variant="body2">
              Buyer: <b>{order.buyer?.name || "Anonymous"}</b>
            </Typography>
          )}

          {order.createdAt && (
            <Typography variant="body2">
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US")}
            </Typography>
          )}
        </Stack>

        {isReceived && order.status === "pending" && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => onMarkComplete(order._id)}
          >
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Empty State ─────────────────────────────────────────────
const EmptyState = ({ message, icon }) => (
  <Box textAlign="center" py={8}>
    <Typography sx={{ fontSize: "3rem" }}>{icon}</Typography>
    <Typography variant="h6">{message}</Typography>
    <Typography variant="body2" color="text.secondary">
      Your orders will appear here.
    </Typography>
  </Box>
);

// ─── Profile Page ────────────────────────────────────────────
const ProfilePage = () => {
  const theme = useTheme();

  const { user } = useSelector((state) => state.user);
  const { myOrders, receivedOrders, loading } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const pendingReceived =
    receivedOrders?.filter((o) => o.status === "pending").length || 0;

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default",mt:3 }}>
      {/* Top Gradient */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg,
            ${theme.palette.primary.main},
            ${theme.palette.secondary.main},
            ${theme.palette.primary.main}
          )`,
        }}
      />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Profile Card */}
        <Card sx={{ mb: 4 }}>
          <Box
            sx={{
              height: 120,
              background: `linear-gradient(135deg,
                ${theme.palette.primary.main},
                ${theme.palette.secondary.main}
              )`,
            }}
          />

          <CardContent>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                mt: -6,
                mb: 2,
              }}
            >
              {initials}
            </Avatar>

            <Typography variant="h4">
              {user?.fullName || "Guest User"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>

            {user?.campusId && (
              <Box
                sx={{
                  display: "inline-block",
                  mt: 1,
                  px: 1.5,
                  py: 0.4,
                  bgcolor: (theme) =>
                    alpha(theme.palette.secondary.main, 0.1),
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: "secondary.main",
                }}
              >
                <Typography variant="caption" color="secondary.main">
                  🏫 {user.campusId}
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/add-product")}
            >
              List Product
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={6} md={3}>
            <StatCard label="Orders" value={myOrders?.length || 0} />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              label="Received"
              value={receivedOrders?.length || 0}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard label="Pending" value={pendingReceived} />
          </Grid>
        </Grid>

        {/* Orders */}
        <Card>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="My Orders" />
            <Tab label="Received" />
          </Tabs>

          <Box p={3}>
            {tab === 0 && (
              <Grid container spacing={2}>
                {!myOrders?.length ? (
                  <EmptyState message="No orders yet" icon="📦" />
                ) : (
                  myOrders.map((o) => (
                    <Grid item xs={12} md={4} key={o._id}>
                      <OrderCard order={o} />
                    </Grid>
                  ))
                )}
              </Grid>
            )}

            {tab === 1 && (
              <Grid container spacing={2}>
                {!receivedOrders?.length ? (
                  <EmptyState
                    message="No received orders"
                    icon="📥"
                  />
                ) : (
                  receivedOrders.map((o) => (
                    <Grid item xs={12} md={4} key={o._id}>
                      <OrderCard order={o} isReceived />
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ProfilePage;