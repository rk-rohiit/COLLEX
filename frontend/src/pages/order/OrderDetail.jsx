import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container, Grid, Box, Typography, Paper,
  Stack, Avatar, Chip, Divider, Button, Stepper, Step, StepLabel,
  CircularProgress
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LockIcon from "@mui/icons-material/Lock";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { TextField } from "@mui/material";
import { useState } from "react";
import { verifyDelivery } from "@/features/order/orderSlice";
import { toast } from "react-toastify";

import {
  getMyOrders,
  getReceivedOrders
} from "@/features/order/orderSlice";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [code, setCode] = useState("");
const { verifyLoading } = useSelector((state) => state.order);
  const { myOrders, receivedOrders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  /* =========================
     FETCH ORDERS
  ========================= */
  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(getReceivedOrders());
  }, [dispatch]);

  /* =========================
     FIND ORDER
  ========================= */
  const order =
    myOrders.find((o) => o._id === id) ||
    receivedOrders.find((o) => o._id === id);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading || !order) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "80vh" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Fetching order details...</Typography>
      </Stack>
    );
  }

  /* =========================
     ROLE LOGIC
  ========================= */
  const isSeller = user?._id === order.seller?._id;
  const partner = isSeller ? order.buyer : order.seller;

  /* =========================
     STATUS & STEPPER
  ========================= */
  const steps = ["Order Placed", "Meeting Coordinated", "Completed"];

  const getStep = () => {
    if (order.status === "completed") return 2;
    if (order.status === "cancelled") return 0;
    return 1;
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "success";
    if (status === "cancelled") return "error";
    return "warning";
  };

  const handleVerify = async () => {
  if (!code) return toast.error("Enter delivery code");

  const res = await dispatch(verifyDelivery({ orderId: order._id, code }));

  if (verifyDelivery.fulfilled.match(res)) {
    toast.success("Delivery completed ✅");
  } else {
    toast.error(res.payload);
  }
};

  /* =========================
     UI
  ========================= */
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: 10, pb: 6 }}>
      <Container maxWidth="md">

        {/* BACK BUTTON */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Grid container spacing={3}>

          {/* STATUS CARD */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ORDER ID: {order._id.slice(-8).toUpperCase()}
                  </Typography>

                  <Typography variant="h5" fontWeight="bold" color="primary.main">
                    {isSeller ? "Sales Tracker" : "Order Status"}
                  </Typography>
                </Box>

                <Chip
                  label={order.status.toUpperCase()}
                  color={getStatusColor(order.status)}
                />
              </Stack>

              <Stepper activeStep={getStep()} alternativeLabel sx={{ mt: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          {/* PRODUCT DETAILS */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Product Details
              </Typography>

              <Stack direction="row" spacing={2}>
                <Box
                  component="img"
                  src={order.listing?.images?.[0] || "https://via.placeholder.com/80"}
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                />

                <Box>
                  <Typography fontWeight="bold">
                    {order.listing?.title}
                  </Typography>

                  <Typography color="secondary.main" fontWeight="bold">
                    ₹{order.listing?.price}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* BUYER / SELLER */}
              <Typography fontWeight="bold" mb={2}>
                {isSeller ? "Buyer Info" : "Seller Info"}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>
                  {partner?.fullName?.charAt(0)}
                </Avatar>

                <Box>
                  <Typography fontWeight="bold">
                    {partner?.fullName}
                    <CheckCircleIcon sx={{ ml: 1, fontSize: 14, color: "success.main" }} />
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {partner?.campusId}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<MessageIcon />}
                  onClick={() => navigate(`/chat/${partner?._id}`)}
                  sx={{ ml: "auto" }}
                >
                  Chat
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* MEETING DETAILS */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Meeting Details
              </Typography>

              <Stack spacing={2}>

                {/* MEET TYPE */}
                <Stack direction="row" spacing={1}>
                  <LocationOnIcon color="primary" />
                  <Box>
                    <Typography fontWeight="bold">
                      Meeting Type
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.meetType === "campus"
                        ? "Campus Exchange Point"
                        : "Protected Delivery"}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                {/* LOCATION */}
                <Typography variant="body2" color="text.secondary">
                  {order.listing?.location || "Campus Common Area"}
                </Typography>

                <Typography variant="caption" color="warning.main">
                  Meet in public campus areas for safety.
                </Typography>

              </Stack>
            </Paper>
          </Grid>
        {/* DELIVERY SECTION */}
<Grid item xs={12}>
  <Paper sx={{ p: 3, borderRadius: 4 }}>

    <Typography variant="h6" fontWeight="bold" mb={2}>
      Delivery Verification
    </Typography>

    {/* ✅ COMPLETED */}
    {order.isDelivered && (
      <Stack alignItems="center" spacing={2}>
        <DoneAllIcon sx={{ fontSize: 40, color: "success.main" }} />
        <Typography color="success.main" fontWeight="bold">
          Product Delivered Successfully
        </Typography>
      </Stack>
    )}

    {/* 👤 BUYER VIEW → SHOW CODE ONLY */}
    {!order.isDelivered && !isSeller && (
      <Stack spacing={2}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Share this code with seller at delivery time
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ letterSpacing: 4 }}
          >
            {order.deliveryCode || "------"}
          </Typography>
        </Box>
      </Stack>
    )}

    {/* 🧑‍💼 SELLER VIEW → ENTER CODE */}
    {!order.isDelivered && isSeller && (
      <Stack spacing={2}>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.warning.main, 0.1),
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <LockIcon color="warning" />
            <Typography>
              Enter delivery code from buyer to complete order
            </Typography>
          </Stack>
        </Box>

        <TextField
          label="Enter Delivery Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleVerify}
          disabled={verifyLoading}
        >
          {verifyLoading ? "Verifying..." : "Verify Delivery"}
        </Button>

      </Stack>
    )}

  </Paper>
</Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default OrderDetail;