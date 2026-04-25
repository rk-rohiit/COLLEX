// components/profile/OrderRow.jsx

import { Paper, Stack, Box, Typography, Chip, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  completed: {
    bgcolor: "#EAF3DE",
    color: "#3B6D11",
    label: "Completed",
  },
  pending: {
    bgcolor: "#FAEEDA",
    color: "#854F0B",
    label: "Pending",
  },
  cancelled: {
    bgcolor: "#FCEBEB",
    color: "#A32D2D",
    label: "Cancelled",
  },
};

const OrderRow = ({ order, onSelect, isSelected }) => {
  const navigate = useNavigate();
  const status = STATUS_STYLES[order?.status] || STATUS_STYLES.pending;

  return (
    <Paper
      elevation={0}
      onClick={() => onSelect?.(order)}
      sx={{
        px: 1.5,
        py: 1.25,
        mb: 0,
        borderRadius: 0,
        border: "none",
        borderBottom: "0.5px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "background 0.15s",
        bgcolor: isSelected ? "action.selected" : "transparent",
        "&:hover": { bgcolor: "action.hover" },
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        {/* Thumbnail */}
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {order?.listing?.images?.[0] ? (
            <Box
              component="img"
              src={order.listing.images[0]}
              alt={order?.listing?.title}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ImageOutlinedIcon
              sx={{ fontSize: 16, color: "text.disabled" }}
            />
          )}
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "text.primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {order?.listing?.title || "Untitled listing"}
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",
              color: "text.secondary",
              mt: 0.25,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ₹{order?.listing?.price?.toLocaleString() || 0} · #
            {order?._id?.slice(-6)?.toUpperCase() || "N/A"}
          </Typography>
        </Box>

        {/* Status */}
        <Chip
          label={status.label}
          size="small"
          sx={{
            height: 20,
            fontSize: "10px",
            fontWeight: 500,
            bgcolor: status.bgcolor,
            color: status.color,
            border: "none",
            "& .MuiChip-label": { px: 1 },
          }}
        />

        {/* Nav */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/order/${order?._id}`);
          }}
          sx={{ p: 0.25, color: "text.disabled" }}
        >
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default OrderRow;