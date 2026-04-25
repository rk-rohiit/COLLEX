// components/profile/OrderDetailPanel.jsx

import { Paper, Box, Typography, Stack, Divider } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import OrderTimeline from "./OrderTimeline";

const DetailRow = ({ label, value, mono }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" py={0.625}>
    <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "11px",
        fontWeight: 500,
        color: "text.primary",
        fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit",
      }}
    >
      {value}
    </Typography>
  </Stack>
);

const OrderDetailPanel = ({ order }) => {
  if (!order) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "0.5px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          p: 2,
          height: "100%",
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <InboxOutlinedIcon sx={{ fontSize: 32, color: "text.disabled" }} />
        <Typography sx={{ fontSize: "12px", color: "text.secondary", textAlign: "center" }}>
          Select an order to view details
        </Typography>
      </Paper>
    );
  }

  const {
    listing,
    status,
    _id,
    buyer,
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

  const sellerName =
    typeof seller === "object"
      ? seller?.fullName || "—"
      : "—";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Panel header label */}
      <Box
        sx={{
          px: 1.75,
          py: 1.25,
          borderBottom: "0.5px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.7px",
          }}
        >
          Order detail
        </Typography>
      </Box>

      <Box sx={{ p: 1.75 }}>
        {/* Order card header */}
        <Stack direction="row" spacing={1.25} alignItems="center" mb={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "8px",
              bgcolor: "action.hover",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              <ImageOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            )}
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}
            >
              {listing?.title || "Untitled"}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                color: "text.secondary",
                fontFamily: "'JetBrains Mono', monospace",
                mt: 0.25,
              }}
            >
              #{_id?.slice(-6)?.toUpperCase() || "N/A"} · {formattedDate}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 1.25 }} />

        {/* Key-value rows */}
        <Box>
          <DetailRow label="Seller" value={sellerName} />
          <DetailRow
            label="Amount"
            value={`₹${listing?.price?.toLocaleString() || 0}`}
            mono
          />
          <DetailRow
            label="Payment"
            value={paymentMethod || "UPI · Confirmed"}
          />
          <DetailRow
            label="Pickup"
            value={deliveryLocation || "Campus Block C"}
          />
        </Box>

        <Divider sx={{ my: 1.25 }} />

        {/* Timeline */}
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.7px",
            mb: 0.5,
          }}
        >
          Status
        </Typography>

        <OrderTimeline status={status} />
      </Box>
    </Paper>
  );
};

export default OrderDetailPanel;