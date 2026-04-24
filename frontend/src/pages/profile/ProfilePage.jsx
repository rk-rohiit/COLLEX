import { useSelector, useDispatch } from "react-redux";
import {
  Container, Typography, Button, Tabs, Tab,
  Grid, Box, Avatar, Stack, Paper, IconButton, Chip
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders, getReceivedOrders } from "@/features/order/orderSlice";

// Icons
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SellIcon from "@mui/icons-material/Sell";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import SettingsIcon from "@mui/icons-material/Settings";
import DeliveryPanel from "../../components/ui/DeliveryPanel";

/* =========================
   STAT CARD
========================= */
const DashboardStat = ({ label, value, icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 6,
      border: "1px solid",
      borderColor: "divider",
      flex: 1,
    }}
  >
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: alpha(color, 0.1), color, width: 44, height: 44 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h5" fontWeight="bold" lineHeight={1}>
          {value}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "0.65rem", fontWeight: 700 }}
        >
          {label}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

/* =========================
   ORDER ROW
========================= */
const OrderRow = ({ order, onSelect }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isBuyer = user?._id === (order.buyer?._id || order.buyer);

  return (
    <Paper
      elevation={0}
      onClick={() => onSelect && onSelect(order)} // ✅ SAFE CALL
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          bgcolor: "grey.50",
        },
      }}
    >
      {/* 🔹 TOP SECTION */}
      <Stack direction="row" spacing={2} alignItems="center">

        {/* IMAGE */}
        <Box
          component="img"
          src={order.listing?.images?.[0] || "https://via.placeholder.com/60"}
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            objectFit: "cover",
            bgcolor: "grey.100",
          }}
        />

        {/* DETAILS */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight="bold" noWrap>
            {order.listing?.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Typography variant="body2" fontWeight="bold" color="primary.main">
              ₹{order.listing?.price}
            </Typography>

            <Chip
              label={order.status}
              size="small"
              color={
                order.status === "completed"
                  ? "success"
                  : order.status === "cancelled"
                    ? "error"
                    : "warning"
              }
            />
          </Stack>

          <Typography variant="caption" color="text.secondary">
            ID: #{order._id.slice(-6).toUpperCase()}
          </Typography>
        </Box>

        {/* NAV BUTTON */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // ✅ IMPORTANT: prevent triggering onSelect
            navigate(`/order/${order._id}`);
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};
/* =========================
   EMPTY STATE
========================= */
const EmptyState = () => (
  <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
    No data found.
  </Typography>
);

/* =========================
   MAIN PAGE
========================= */
const ProfilePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { myOrders, receivedOrders, loading } = useSelector((state) => state.order);

  const [tab, setTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  if (loading) return <Typography p={5}>Loading...</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4F7FA", pt: { xs: 3, md: 8 }, pb: 6, mt: 5 }}>
      <Container maxWidth="lg">

        {/* ── HEADER ── */}
        <Paper
          sx={{
            p: { xs: 2.5, md: 5 },
            borderRadius: { xs: 6, md: 10 },
            bgcolor: "#0D2344",
            color: "white",
            mb: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            flexWrap="wrap"
            useFlexGap
          >
            {/* User info */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
              <Avatar
                sx={{
                  width: { xs: 54, md: 76 },
                  height: { xs: 54, md: 76 },
                  bgcolor: "white",
                  color: "#0D2344",
                  fontSize: { xs: "1.2rem", md: "1.6rem" },
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {user?.fullName?.charAt(0)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.fullName || "Rohit Kumar"}
                  </Typography>
                  <VerifiedIcon sx={{ fontSize: 17, color: "#00C8FF", flexShrink: 0 }} />
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ opacity: 0.75, mt: 0.25 }}
                >
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <SchoolIcon sx={{ fontSize: 13 }} />
                    <Typography variant="caption">{user?.campusId || "LPU"}</Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ display: { xs: "none", sm: "block" } }}>•</Typography>
                  <Typography variant="caption" noWrap>{user?.email || "student@email.com"}</Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Actions */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/create-listing")}
                size="small"
                sx={{
                  borderRadius: 5,
                  bgcolor: "white",
                  color: "#0D2344",
                  textTransform: "none",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#e0e0e0" },
                }}
              >
                Post an Ad
              </Button>
              <IconButton sx={{ color: "white", bgcolor: alpha("#fff", 0.1) }}>
                <SettingsIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>

        {/* ── STATS GRID ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <DashboardStat
            label="Items Bought"
            value={myOrders.length || 0}
            icon={<ShoppingBagIcon />}
            color="#3F51B5"
          />
          <DashboardStat
            label="Successful Sales"
            value={receivedOrders.filter((o) => o.status === "completed").length || 0}
            icon={<TrendingUpIcon />}
            color="#4CAF50"
          />
          <DashboardStat
            label="Active Requests"
            value={receivedOrders.filter((o) => o.status === "pending").length || 0}
            icon={<SellIcon />}
            color="#FF9800"
          />
        </Box>

        {/* ── ORDERS / SALES TABS ── */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
                <Tabs
                  value={tab}
                  onChange={(_, v) => setTab(v)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    label="MY PURCHASES"
                    sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                  />
                  <Tab
                    label="SALES MANAGER"
                    sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                  />
                </Tabs>
              </Box>

              <Box p={{ xs: 2, md: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  {tab === 0 ? "Recent Orders" : "Sales History"}
                </Typography>

                {tab === 0
                  ? myOrders.length
                    ? myOrders.map((o) => (
                      <OrderRow
                        key={o._id}
                        order={o}
                        onSelect={setSelectedOrder}
                      />
                    ))
                    : <EmptyState />
                  : receivedOrders.length
                    ? receivedOrders.map((o) => <OrderRow key={o._id} order={o} />)
                    : <EmptyState />}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>

          {/* LEFT SIDE (ORDERS) */}
          <Grid item xs={12} md={6}>
            {/* your existing orders UI */}
          </Grid>

          {/* RIGHT SIDE (DELIVERY PANEL) */}
          <Grid item xs={12} md={6}>
            <DeliveryPanel order={selectedOrder} />
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};

export default ProfilePage;