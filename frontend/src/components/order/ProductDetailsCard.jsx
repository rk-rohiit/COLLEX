// components/order/ProductDetailsCard.jsx

import {
  Paper, Box, Typography, Stack,
  Avatar, Divider, Button, Tooltip,
} from "@mui/material";
import ImageOutlinedIcon    from "@mui/icons-material/ImageOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedIcon          from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

const ProductDetailsCard = ({ order, isSeller }) => {
  const navigate = useNavigate();
  const partner  = isSeller ? order?.buyer : order?.seller;

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <Box sx={{ px: 2, py: 1.25, borderBottom: "0.5px solid", borderColor: "divider" }}>
        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.7px" }}>
          Product
        </Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1 }}>
        {/* Product row */}
        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "10px",
              border: "0.5px solid",
              borderColor: "divider",
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
                alt={order.listing.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <ImageOutlinedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
            )}
          </Box>

          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}>
              {order?.listing?.title || "Untitled listing"}
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#1D9E75", fontFamily: "'JetBrains Mono', monospace", mt: 0.25 }}>
              ₹{order?.listing?.price?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Partner label */}
        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.7px", mb: 1.25 }}>
          {isSeller ? "Buyer info" : "Seller info"}
        </Typography>

        {/* Partner row */}
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#E1F5EE",
              color: "#0F6E56",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              border: "1px solid #9FE1CB",
            }}
          >
            {partner?.fullName?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "text.primary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {partner?.fullName || "Unknown"}
              </Typography>
              <Tooltip title="Verified">
                <VerifiedIcon sx={{ fontSize: 13, color: "#1D9E75", flexShrink: 0 }} />
              </Tooltip>
            </Stack>
            <Typography sx={{ fontSize: "10px", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.4px" }}>
              {isSeller ? "Buyer" : "Seller"}
            </Typography>
          </Box>

          <Button
            size="small"
            startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 13 }} />}
            onClick={() => navigate(`/chat/${partner?._id}`)}
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "none",
              px: 1.5,
              py: 0.625,
              border: "0.5px solid",
              borderColor: "divider",
              borderRadius: 2,
              color: "text.primary",
              bgcolor: "background.default",
              flexShrink: 0,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Chat
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductDetailsCard;