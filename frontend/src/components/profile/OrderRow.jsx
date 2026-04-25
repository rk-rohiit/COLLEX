// components/profile/OrderRow.jsx

import { Paper, Stack, Box, Typography, Chip, IconButton, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";

const OrderRow = ({ order, onSelect, isSelected }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Dynamically generate styles based on the current theme palette
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return {
          bgcolor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.main,
          label: "Completed",
        };
      case "pending":
        return {
          bgcolor: alpha(theme.palette.warning.main, 0.15),
          color: theme.palette.text.primary, // Darker text for readability on yellow
          label: "Pending",
        };
      case "cancelled":
        return {
          bgcolor: alpha(theme.palette.error.main, 0.1),
          color: theme.palette.error.main,
          label: "Cancelled",
        };
      default:
        return {
          bgcolor: alpha(theme.palette.grey[500], 0.1),
          color: theme.palette.grey[700],
          label: status || "Unknown",
        };
    }
  };

  const statusStyle = getStatusStyle(order?.status);

  return (
    <Paper
      elevation={0}
      onClick={() => onSelect?.(order)}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "all 0.2s ease",
        // Trust Blue tint for selection
        bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.05) : "transparent",
        borderLeft: isSelected ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
        "&:hover": { 
          bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.08) : "action.hover" 
        },
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Thumbnail */}
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 1.5,
            overflow: "hidden",
            flexShrink: 0,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            borderColor: "divider",
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
              sx={{ fontSize: 18, color: "text.disabled" }}
            />
          )}
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: isSelected ? theme.palette.primary.main : "text.primary",
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
            ₹{order?.listing?.price?.toLocaleString() || 0} • #
            {order?._id?.slice(-6)?.toUpperCase() || "N/A"}
          </Typography>
        </Box>

        {/* Status & Navigation */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={statusStyle.label}
            size="small"
            sx={{
              height: 20,
              fontSize: "10px",
              fontWeight: 700,
              bgcolor: statusStyle.bgcolor,
              color: statusStyle.color,
              borderRadius: 1,
              textTransform: "uppercase",
              letterSpacing: "0.2px",
              "& .MuiChip-label": { px: 1 },
            }}
          />

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/order/${order?._id}`);
            }}
            sx={{ 
              color: "text.disabled",
              "&:hover": { color: theme.palette.secondary.main } // Action Orange hover
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OrderRow;