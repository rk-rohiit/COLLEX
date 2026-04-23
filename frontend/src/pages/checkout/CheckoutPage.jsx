import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Container, Grid, Box, Typography, Button, Paper,
  Stack, TextField, Radio, RadioGroup, FormControlLabel,
  FormControl, Divider, Alert, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";
import { createOrdersFromCart } from "@/features/order/orderSlice";
import { toast } from "react-toastify";
import {
  createPaymentOrderAPI,
  verifyPaymentAPI,
} from "@/api/payment.api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("cod");
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [meetingPoint, setMeetingPoint] = useState("library");
  const { loading } = useSelector((state) => state.order);

  const colors = {
    primary: "#0A2647",
    accent: "#E86A33",
    bg: "#F4F7F9"
  };
  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

  // const handleConfirmDeal = async () => {
  //   try {
  //     if (!items.length) return;

  //     // 🔥 Map UI → backend
  //     const meetType = "campus"; // all these are campus

  //     await dispatch(
  //       createOrdersFromCart({
  //         items,
  //         meetType,
  //       })
  //     ).unwrap();

  //     dispatch(clearCart());
  //     setOpenDialog(true);

  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error || "Order failed");
  //   }
  // };
const handleConfirmDeal = async () => {
  try {
    if (!items.length) return;

    const meetType = "campus";

    // 🧾 Create backend order
    const res = await dispatch(
      createOrdersFromCart({ items, meetType })
    ).unwrap();

    const backendOrder = res?.[0];

    // 👉 COD FLOW
    if (paymentType === "cod") {
      dispatch(clearCart());
      setOpenDialog(true);
      return;
    }

    // 👉 ONLINE PAYMENT
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      toast.error("Payment SDK failed to load");
      return;
    }

    // 💳 Create Razorpay order
    const data = await createPaymentOrderAPI({
      amount: total,
      orderId: backendOrder._id,
    });

    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.order.amount,
  currency: "INR",
  name: "Collex",
  description: "Secure Payment",
  order_id: data.order.id,

  // 🔥 IMPORTANT FIX
  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: false,
  },

  // 🔥 Force UPI to show first
  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay via UPI",
          instruments: [{ method: "upi" }],
        },
      },
      sequence: ["block.upi", "block.card", "netbanking"],
      preferences: {
        show_default_blocks: true,
      },
    },
  },

  handler: async function (response) {
    try {
      await verifyPaymentAPI(response);

      dispatch(clearCart());
      setOpenDialog(true);
    } catch (err) {
      console.error("Verification failed", err);
    }
  },

  // 🔥 Handle failure properly
  modal: {
    ondismiss: function () {
      console.log("Payment popup closed");
    },
  },

  theme: {
    color: "#0A2647",
  },
};

    const rzp = new window.Razorpay(options);

    // ❌ Handle failure
    rzp.on("payment.failed", function () {
      toast.error("Payment failed. Try again.");
    });

    rzp.open();

  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Something went wrong");
  }
};
  return (
    <>
      <Box sx={{ bgcolor: colors.bg, minHeight: "100vh", pt: 12, pb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="900" color={colors.primary} sx={{ mb: 4 }}>
            Finalize Exchange
          </Typography>

          <Grid container spacing={4}>
            {/* LEFT: EXCHANGE & PAYMENT DETAILS */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>

                {/* 1. CAMPUS EXCHANGE POINT */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <LocationOnIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">1. Select Meeting Point</Typography>
                  </Stack>

                  <RadioGroup
                    value={meetingPoint}
                    onChange={(e) => setMeetingPoint(e.target.value)}
                  >
                    <Stack spacing={1}>

                      {/* <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
                        <FormControlLabel
                          value="library"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                Central Library Main Gate
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Most popular & safe public spot
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper> */}

                      {/* <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
                        <FormControlLabel
                          value="cafe"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                Student Center Cafeteria
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Best for midday exchanges
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper> */}

                      <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
                        <FormControlLabel
                          value="hostel"
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                Hostel Block Common Area
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Verification required at entry
                              </Typography>
                            </Box>
                          }
                        />
                      </Paper>

                    </Stack>
                  </RadioGroup>
                </Paper>

                {/* 2. PAYMENT METHOD */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <VerifiedUserIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">2. Payment Preference</Typography>
                  </Stack>

                  <RadioGroup value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Paper variant="outlined" sx={{ p: 2, flex: 1, borderRadius: 3 }}>
                        <FormControlLabel value="cod" control={<Radio />} label={
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">Pay on Exchange</Typography>
                            <Typography variant="caption">Cash or UPI at meet-up</Typography>
                          </Box>
                        } />
                      </Paper>
                      <Paper variant="outlined" sx={{ p: 2, flex: 1, borderRadius: 3 }}>
                        <FormControlLabel value="online" control={<Radio />} label={
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">Collex Escrow</Typography>
                            <Typography variant="caption">Secure online payment</Typography>
                          </Box>
                        } />
                      </Paper>
                    </Stack>
                  </RadioGroup>
                </Paper>

                <Alert severity="warning" variant="outlined" sx={{ borderRadius: 3 }}>
                  <strong>Safety First:</strong> Never meet a buyer/seller in a private room. Stick to the designated public points above.
                </Alert>
              </Stack>
            </Grid>

            {/* RIGHT: ORDER SUMMARY */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 100 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Order Summary</Typography>

                <Stack spacing={2}>
                  {items.map(item => (
                    <Box key={item._id} display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        {item.title} (x{item.qty})
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">₹{item.price * item.qty}</Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold">To Pay</Typography>
                    <Typography variant="h5" fontWeight="900" color={colors.accent}>₹{total}</Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<HandshakeIcon />}
                  // onClick={() => navigate("/order-success")}
                  onClick={handleConfirmDeal}
                  sx={{
                    mt: 4,
                    bgcolor: colors.primary,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    "&:hover": { bgcolor: "#06172a" }
                  }}
                >
                  {loading ? "Processing..." : "CONFIRM DEAL"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>

        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          🎉 Order Confirmed!
        </DialogTitle>

        <DialogContent>
          <Typography align="center" sx={{ mt: 1 }}>
            Your deal has been successfully confirmed.
            Please meet the seller at your selected location.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              navigate("/"); // 🏠 go home
            }}
            sx={{ borderRadius: 3 }}
          >
            Go to Home
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default CheckoutPage;