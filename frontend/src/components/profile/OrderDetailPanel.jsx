// components/profile/OrderDetailPanel.jsx

import { Paper, Box, Typography, Stack, Divider, useTheme,Avatar } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import OrderTimeline from "./OrderTimeline";

const DetailRow = ({ label, value, highlight }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" py={0.75}>
      <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: highlight ? 700 : 500,
          color: highlight ? theme.palette.primary.main : "text.primary",
          fontFamily: highlight ? "'JetBrains Mono', monospace" : "inherit",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

const OrderDetailPanel = ({ order }) => {
  const theme = useTheme();

  if (!order) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: `${theme.shape.borderRadius}px`,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.background.default, 0.5),
          p: 3,
          height: "100%",
          minHeight: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: alpha(theme.palette.text.disabled, 0.1),
            width: 56, 
            height: 56 
          }}
        >
          <InboxOutlinedIcon sx={{ fontSize: 28, color: "text.disabled" }} />
        </Avatar>
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Select an order to view details
        </Typography>
      </Paper>
    );
  }

  const {
    listing,
    status,
    _id,
    seller,
    createdAt,
    deliveryLocation,
    paymentMethod,
  } = order;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Header Label */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 800,
            color: theme.palette.primary.main,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Order detail
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Product Info Section */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "action.hover",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {listing?.images?.[0] ? (
              <Box
                component="img"
                src={listing.images[0]}
                alt={listing.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <ImageOutlinedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
            )}
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}
            >
              {listing?.title || "Untitled Product"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontFamily: "'JetBrains Mono', monospace",
                mt: 0.5,
              }}
            >
              ID: {_id?.slice(-6)?.toUpperCase()} • {formattedDate}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 1.5, borderStyle: "dashed" }} />

        {/* Transaction Details */}
        <Box mb={2}>
          <DetailRow label="Seller" value={seller?.fullName || "Collex Member"} />
          <DetailRow
            label="Total Amount"
            value={`₹${listing?.price?.toLocaleString() || 0}`}
            highlight // Applies Primary Blue and Mono font
          />
          <DetailRow
            label="Payment"
            value={paymentMethod || "UPI · Confirmed"}
          />
          <DetailRow
            label="Pickup point"
            value={deliveryLocation || "Central Library"}
          />
        </Box>

        {/* Status Section */}
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.secondary.main, 0.04),
            border: "1px solid",
            borderColor: alpha(theme.palette.secondary.main, 0.1)
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 800,
              color: theme.palette.secondary.main, // Action Orange
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Order Status
          </Typography>
          <OrderTimeline status={status} />
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderDetailPanel;