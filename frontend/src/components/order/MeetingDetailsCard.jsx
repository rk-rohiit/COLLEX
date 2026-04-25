// components/order/MeetingDetailsCard.jsx

import { Paper, Box, Typography, Stack } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

/* ─── Reusable key-value row ─────────────────────────────────── */
const KVRow = ({ label, value, mono }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ py: 0.625, borderBottom: "0.5px solid", borderColor: "divider" }}
  >
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

const MeetingDetailsCard = ({ order }) => {
  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const meetLabel =
    order?.meetType === "campus" ? "Campus exchange" : "Protected delivery";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Section label */}
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
          Meeting details
        </Typography>
      </Box>

      <Box sx={{ p: 1.75 }}>
        {/* Meet type banner */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            bgcolor: "#E1F5EE",
            borderRadius: 2,
            px: 1.25,
            py: 0.875,
            mb: 1.5,
          }}
        >
          {order?.meetType === "campus" ? (
            <SwapHorizOutlinedIcon sx={{ fontSize: 15, color: "#0F6E56" }} />
          ) : (
            <LocationOnOutlinedIcon sx={{ fontSize: 15, color: "#0F6E56" }} />
          )}
          <Typography
            sx={{ fontSize: "12px", fontWeight: 500, color: "#0F6E56" }}
          >
            {meetLabel}
          </Typography>
        </Stack>

        {/* Key-value rows */}
        <KVRow label="Location" value={order?.listing?.location || "Campus Block C"} />
        <KVRow label="Date placed" value={formattedDate} mono />
        <KVRow label="Payment" value={order?.paymentMethod || "UPI · Confirmed"} />
        <KVRow
          label="Order ID"
          value={`#${order?._id?.slice(-6)?.toUpperCase() || "N/A"}`}
          mono
        />

        {/* Last row — no bottom border */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 0.625 }}
        >
          <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
            Amount
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#1D9E75",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ₹{order?.listing?.price?.toLocaleString() || 0}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MeetingDetailsCard;