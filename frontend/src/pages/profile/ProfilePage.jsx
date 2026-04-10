import { useSelector, useDispatch } from "react-redux";
import {
  Container, Typography, Card, CardContent, Button, Tabs, Tab,
  Grid, Box, Avatar, Divider, LinearProgress, Stack, Paper, IconButton
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders, getReceivedOrders } from "@/features/order/orderSlice";

// Icons
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SellIcon from "@mui/icons-material/Sell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// ─── Stat Card (Updated for Dashboard) ──────────────────────────
const DashboardStat = ({ label, value, icon, color }) => (
  <Paper 
    elevation={0} 
    sx={{ 
      p: 3, borderRadius: 4, bgcolor: "white", 
      border: "1px solid", borderColor: "divider",
      transition: "0.3s", "&:hover": { boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="overline" color="text.secondary" fontWeight="700">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight="900" sx={{ color: color }}>
          {value}
        </Typography>
      </Box>
      <Avatar sx={{ bgcolor: alpha(color, 0.1), color: color }}>
        {icon}
      </Avatar>
    </Stack>
  </Paper>
);

// ─── Order Row (Clean Dashboard List) ──────────────────────────
const OrderRow = ({ order, isReceived }) => {
  const navigate = useNavigate();
  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 2, mb: 2, borderRadius: 3, "&:hover": { bgcolor: "#fcfcfc" } }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Box 
            component="img" 
            src={order.listing?.images?.[0] || "https://placehold.co/100"} 
            sx={{ width: 50, height: 50, borderRadius: 2, objectFit: "cover" }}
          />
          <Box>
            <Typography fontWeight="bold">{order.listing?.title || "Product"}</Typography>
            <Typography variant="caption" color="text.secondary">
              {isReceived ? `Buyer: ${order.buyer?.name}` : `Price: ₹${order.listing?.price}`}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Chip 
            label={order.status} 
            size="small" 
            color={order.status === "completed" ? "success" : "warning"}
            sx={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "0.6rem" }}
          />
          <IconButton onClick={() => navigate(`/order/${order._id}`)}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

const ProfilePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth); // Changed from .user to match common auth pattern
  const { myOrders, receivedOrders, loading } = useSelector((state) => state.order);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  // Design Colors
  const colors = {
    primary: "#0A2647",
    accent: "#E86A33",
    verified: "#2ECC71",
    bg: "#F4F7F9"
  };

  if (loading) return <LinearProgress sx={{ bgcolor: colors.accent }} />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.bg, pt: 10, pb: 8 }}>
      <Container maxWidth="xl">
        
        {/* 🔥 DASHBOARD HEADER */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 5, mb: 4, bgcolor: "white" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar 
                sx={{ 
                  width: 90, height: 90, 
                  bgcolor: colors.primary, 
                  fontSize: "2.5rem",
                  border: `4px solid ${alpha(colors.primary, 0.1)}`
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4" fontWeight="900" color={colors.primary}>
                  Hey, {user?.name?.split(" ")[0]}!
                </Typography>
                <CheckCircleIcon sx={{ color: colors.verified }} />
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {user?.campusId || "Chandigarh University"} | Verified Student
              </Typography>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-product")}
                sx={{ 
                  bgcolor: colors.accent, 
                  borderRadius: 2, py: 1.5, px: 4, 
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#d15b28" }
                }}
              >
                LIST NEW PRODUCT
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* 🔥 STATS SECTION */}
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              <DashboardStat 
                label="Total Purchases" 
                value={myOrders?.length || 0} 
                icon={<ShoppingBagIcon />} 
                color={colors.primary} 
              />
              <DashboardStat 
                label="Items Sold" 
                value={receivedOrders?.filter(o => o.status === "completed").length || 0} 
                icon={<TrendingUpIcon />} 
                color={colors.verified} 
              />
              <DashboardStat 
                label="Pending Sales" 
                value={receivedOrders?.filter(o => o.status === "pending").length || 0} 
                icon={<SellIcon />} 
                color={colors.accent} 
              />
            </Stack>
          </Grid>

          {/* 🔥 ORDERS & ACTIVITY SECTION */}
          <Grid item xs={12} md={9}>
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
              <Tabs 
                value={tab} 
                onChange={(_, v) => setTab(v)} 
                sx={{ 
                  bgcolor: "white", px: 2, pt: 1,
                  "& .MuiTab-root": { fontWeight: "bold", fontSize: "0.9rem" }
                }}
              >
                <Tab label="My Purchases" />
                <Tab label="Sales Received" />
              </Tabs>
              <Divider />
              
              <Box p={3} sx={{ bgcolor: "white", minHeight: 400 }}>
                {tab === 0 ? (
                  <Box>
                    {!myOrders?.length ? (
                      <EmptyState message="You haven't bought anything yet" icon="🛍️" />
                    ) : (
                      myOrders.map(o => <OrderRow key={o._id} order={o} />)
                    )}
                  </Box>
                ) : (
                  <Box>
                    {!receivedOrders?.length ? (
                      <EmptyState message="No one has ordered your items yet" icon="📦" />
                    ) : (
                      receivedOrders.map(o => <OrderRow key={o._id} order={o} isReceived />)
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Internal Helper Components
const Chip = ({ label, color, sx }) => (
  <Box sx={{ 
    px: 1.5, py: 0.5, borderRadius: "5px", 
    bgcolor: color === "success" ? "#e8f5e9" : "#fff3e0",
    color: color === "success" ? "#2e7d32" : "#ed6c02",
    ...sx 
  }}>
    <Typography variant="caption" fontWeight="bold">{label}</Typography>
  </Box>
);

const EmptyState = ({ message, icon }) => (
  <Box textAlign="center" py={10}>
    <Typography sx={{ fontSize: "4rem", mb: 2 }}>{icon}</Typography>
    <Typography variant="h6" fontWeight="bold" color="text.secondary">{message}</Typography>
    <Button sx={{ mt: 2 }} onClick={() => window.location.href="/"}>Browse Marketplace</Button>
  </Box>
);

export default ProfilePage;