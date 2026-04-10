import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Container, Grid, Box, Typography, Paper, 
  Stack, Avatar, Chip, Divider, Button, Stepper, Step, StepLabel 
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Prototype Palette
  const colors = {
    primary: "#0A2647",
    accent: "#E86A33",
    verified: "#2ECC71",
    bg: "#F4F7F9"
  };

  // Mock Data (Replace with your Redux selector/API call)
  const order = {
    _id: id,
    status: "pending",
    totalPrice: 250,
    meetingPoint: "Central Library Main Gate",
    meetingTime: "To be coordinated via Chat",
    otp: "CX-8821", // Verification code for the exchange
    createdAt: "2026-04-10",
    listing: {
      title: "Engineering Physics Vol 2",
      price: 250,
      images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200"],
    },
    seller: {
      name: "Amit Kumar",
      university: "Chandigarh University"
    }
  };

  const steps = ['Order Placed', 'Meeting Coordinated', 'Exchange Completed'];
  const activeStep = order.status === "pending" ? 1 : 2;

  return (
    <Box sx={{ bgcolor: colors.bg, minHeight: "100vh", pt: 12, pb: 8 }}>
      <Container maxWidth="md">
        
        {/* BACK BUTTON */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 3, color: colors.primary, fontWeight: 'bold' }}
        >
          Back to Dashboard
        </Button>

        <Grid container spacing={3}>
          {/* LEFT: ORDER STATUS & PROGRESS */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, mb: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">ORDER ID: {id.slice(-8).toUpperCase()}</Typography>
                  <Typography variant="h5" fontWeight="900" color={colors.primary}>Order Status</Typography>
                </Box>
                <Chip 
                  label={order.status.toUpperCase()} 
                  sx={{ bgcolor: alpha(colors.accent, 0.1), color: colors.accent, fontWeight: 'bold' }} 
                />
              </Stack>

              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          {/* LEFT: PRODUCT & SELLER INFO */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Product Details</Typography>
              <Stack direction="row" spacing={2}>
                <Box 
                  component="img" 
                  src={order.listing.images[0]} 
                  sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }}
                />
                <Box>
                  <Typography fontWeight="bold">{order.listing.title}</Typography>
                  <Typography variant="h6" color={colors.accent} fontWeight="900">₹{order.listing.price}</Typography>
                  <Typography variant="caption" color="text.secondary">Purchased on {order.createdAt}</Typography>
                </Box>
              </Stack>
              
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Seller Information</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: colors.primary }}>{order.seller.name.charAt(0)}</Avatar>
                <Box>
                  <Typography fontWeight="bold">{order.seller.name} <CheckCircleIcon sx={{ fontSize: 14, color: colors.verified, ml: 0.5 }} /></Typography>
                  <Typography variant="caption" color="text.secondary">{order.seller.university}</Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<MessageIcon />}
                  sx={{ ml: 'auto', borderRadius: 2 }}
                >
                  Chat
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT: EXCHANGE INFO & OTP */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: `2px dashed ${colors.accent}` }}>
                <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>Exchange OTP</Typography>
                <Typography variant="h3" fontWeight="900" color={colors.accent} textAlign="center" letterSpacing={4}>
                  {order.otp}
                </Typography>
                <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1, color: "text.secondary" }}>
                  Share this with the seller only after you have inspected and received the item.
                </Typography>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Meeting Details</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <LocationOnIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">Location</Typography>
                      <Typography variant="body2" color="text.secondary">{order.meetingPoint}</Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Typography variant="caption" color="warning.main" fontWeight="bold">
                    ⚠️ Tip: Coordinate the exact time with Amit via the Chat button above.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const alpha = (color, opacity) => {
  const op = Math.round(opacity * 255).toString(16);
  return color + op;
};

export default OrderDetail;