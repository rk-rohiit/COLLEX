import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const conditionColor = (condition) => {
  switch (condition?.toLowerCase()) {
    case "like new": return { bg: "rgba(46,125,50,0.1)", color: "#2e7d32" };
    case "good":     return { bg: "rgba(26,35,126,0.08)", color: "#1a237e" };
    case "fair":     return { bg: "rgba(237,108,2,0.1)", color: "#e65100" };
    default:         return { bg: "rgba(0,0,0,0.06)", color: "#555" };
  }
};

const timeAgo = (date) => {
  if (!date) return "Recently";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const cond = conditionColor(product.condition);

  return (
    <Card
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "0.5px solid",
        borderColor: "divider",
        boxShadow: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(26,35,126,0.10)",
          borderColor: "rgba(26,35,126,0.2)",
        },
      }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative", height: 186, bgcolor: "grey.100" }}>
        <CardMedia
          component="img"
          image={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
          alt={product.title}
          sx={{ height: "100%", objectFit: "cover" }}
        />

        {/* WISHLIST */}
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          sx={{
            position: "absolute", top: 8, right: 8,
            width: 32, height: 32,
            bgcolor: "rgba(255,255,255,0.92)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          {liked
            ? <FavoriteIcon sx={{ fontSize: 16, color: "#e53935" }} />
            : <FavoriteBorderIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
        </IconButton>

        {/* CONDITION CHIP */}
        <Chip
          label={product.condition || "Used"}
          size="small"
          sx={{
            position: "absolute", bottom: 8, left: 8,
            bgcolor: cond.bg,
            color: cond.color,
            fontWeight: 700,
            fontSize: "0.68rem",
            height: 22,
            border: "none",
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ p: 2, pb: "12px !important" }}>
        {/* TITLE */}
        <Typography
          variant="subtitle2"
          fontWeight="800"
          noWrap
          color="text.primary"
          mb={0.25}
          fontSize="0.88rem"
        >
          {product.title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          display="block"
          mb={1}
          fontSize="0.75rem"
        >
          {product.description || `${product.condition || "Good condition"}`}
        </Typography>

        {/* PRICE + TIME */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.25}>
          <Typography fontWeight="900" fontSize="1.05rem" color="primary.main">
            ₹{product.price}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.3} color="text.disabled">
            <AccessTimeIcon sx={{ fontSize: 11 }} />
            <Typography variant="caption" fontSize="0.68rem">
              {timeAgo(product.createdAt)}
            </Typography>
          </Stack>
        </Box>

        {/* SELLER */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={product.seller?.avatar}
            sx={{
              width: 22, height: 22,
              fontSize: "0.65rem",
              fontWeight: 700,
              bgcolor: "rgba(26,35,126,0.12)",
              color: "primary.main",
            }}
          >
            {product.seller?.name?.charAt(0)}
          </Avatar>
          <Box flex={1} minWidth={0}>
            <Stack direction="row" alignItems="center" spacing={0.4}>
              <Typography
                variant="caption"
                fontWeight="700"
                fontSize="0.72rem"
                noWrap
                color="text.primary"
              >
                {product.seller?.name || "Student"}
              </Typography>
              <CheckCircleIcon sx={{ fontSize: 10, color: "success.main" }} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <LocationOnIcon sx={{ fontSize: 10, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary" fontSize="0.68rem" noWrap>
                {product.location || product.seller?.university || "Campus"}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;