// components/order/ProductDetailsCard.jsx

import {
  Paper, Box, Typography, Stack,
  Avatar, Divider, Button, Tooltip, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

const ProductDetailsCard = ({ order, isSeller }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const partner = isSeller ? order?.buyer : order?.seller;

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: `${theme.shape.borderRadius}px`,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <Box 
        sx={{ 
          px: 2, 
          py: 1.5, 
          borderBottom: "1px solid", 
          borderColor: "divider",
          bgcolor: alpha(theme.palette.primary.main, 0.02) 
        }}
      >
        <Typography 
          sx={{ 
            fontSize: "10px", 
            fontWeight: 800, 
            color: theme.palette.primary.main, 
            textTransform: "uppercase", 
            letterSpacing: "1px" 
          }}
        >
          Listing Details
        </Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1 }}>
        {/* Product row */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              border: "1px solid",
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
              <ImageOutlinedIcon sx={{ fontSize: 24, color: "text.disabled" }} />
            )}
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.3 }}>
              {order?.listing?.title || "Untitled listing"}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: "15px", 
                fontWeight: 700, 
                color: theme.palette.secondary.main, // Action Orange
                fontFamily: "'JetBrains Mono', monospace", 
                mt: 0.5 
              }}
            >
              ₹{order?.listing?.price?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

        {/* Partner label */}
        <Typography 
          sx={{ 
            fontSize: "10px", 
            fontWeight: 800, 
            color: "text.secondary", 
            textTransform: "uppercase", 
            letterSpacing: "0.8px", 
            mb: 1.5 
          }}
        >
          {isSeller ? "Transaction Buyer" : "Verified Seller"}
        </Typography>

        {/* Partner row */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 42,
              height: 42,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {partner?.fullName?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography 
                sx={{ 
                  fontSize: "13px", 
                  fontWeight: 700, 
                  color: "text.primary", 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  whiteSpace: "nowrap" 
                }}
              >
                {partner?.fullName || "Collex Member"}
              </Typography>
              <Tooltip title="Verified Campus User">
                <VerifiedIcon sx={{ fontSize: 15, color: theme.palette.primary.main, flexShrink: 0 }} />
              </Tooltip>
            </Stack>
            <Typography 
              variant="caption" 
              sx={{ 
                color: "text.secondary", 
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: '9px'
              }}
            >
              {isSeller ? "Verified Buyer" : "Community Seller"}
            </Typography>
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => navigate(`/chat/${partner?._id}`)}
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              borderColor: 'divider',
              color: "text.primary",
              transition: 'all 0.2s',
              "&:hover": { 
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                color: theme.palette.primary.main
              },
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