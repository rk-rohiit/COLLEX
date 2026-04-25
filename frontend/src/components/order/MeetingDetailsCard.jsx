// components/order/MeetingDetailsCard.jsx

import { Paper, Box, Typography, Stack, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

/* ─── Reusable key-value row ─────────────────────────────────── */
const KVRow = ({ label, value, mono, isLast }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ 
      py: 1, 
      borderBottom: isLast ? "none" : "1px solid", 
      borderColor: "divider" 
    }}
  >
    <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "11px",
        fontWeight: 600,
        color: "text.primary",
        fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit",
      }}
    >
      {value}
    </Typography>
  </Stack>
);

const MeetingDetailsCard = ({ order }) => {
  const theme = useTheme();

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
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Section label */}
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
          Meeting details
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Meet type banner - Using Secondary (Action Orange) for visibility */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{
            bgcolor: alpha(theme.palette.secondary.main, 0.08),
            borderRadius: 2,
            px: 1.5,
            py: 1.25,
            mb: 2,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
          }}
        >
          {order?.meetType === "campus" ? (
            <SwapHorizOutlinedIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
          ) : (
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
          )}
          <Typography
            sx={{ 
                fontSize: "12px", 
                fontWeight: 700, 
                color: theme.palette.secondary.main 
            }}
          >
            {meetLabel}
          </Typography>
        </Stack>

        {/* Key-value rows */}
        <KVRow label="Location" value={order?.listing?.location || "Central Library"} />
        <KVRow label="Date placed" value={formattedDate} mono />
        <KVRow label="Payment" value={order?.paymentMethod || "UPI · Confirmed"} />
        <KVRow
          label="Order ID"
          value={`#${order?._id?.slice(-6)?.toUpperCase() || "N/A"}`}
          mono
        />

        {/* Last row — highlighted with Trust Blue */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 1.5 }}
        >
          <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 700 }}>
            Total Amount
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              color: theme.palette.primary.main,
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