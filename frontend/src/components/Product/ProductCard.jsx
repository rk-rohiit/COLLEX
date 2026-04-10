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
  Divider
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prototype Colors
  const colors = {
    primary: "#0A2647",
    accent: "#E86A33",
    verified: "#2ECC71",
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* IMAGE SECTION */}
      <Box sx={{ position: "relative", height: 180 }}>
        <CardMedia
          component="img"
          image={product.images?.[0] || "https://placehold.co/600x400"}
          sx={{ height: "100%", objectFit: "cover" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(4px)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        
        {/* CONDITION CHIP */}
        <Chip 
          label={product.condition || "Used"} 
          size="small"
          sx={{ 
            position: "absolute", bottom: 8, left: 8, 
            bgcolor: "white", fontWeight: "bold", fontSize: "0.7rem" 
          }} 
        />
      </Box>

      {/* CONTENT SECTION */}
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="800" noWrap color={colors.primary}>
          {product.title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight="900" color={colors.accent}>
            ₹{product.price}
          </Typography>
          {product.isVerified && (
            <Typography variant="caption" sx={{ color: colors.verified, fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 12, ml: 0.5, mr: 0.2 }} /> Verified
            </Typography>
          )}
        </Stack>

        {/* SELLER INFO (Crucial for Campus Trust) */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, mb: 1.5 }}>
          <Avatar 
            src={product.seller?.avatar} 
            sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: colors.primary }}
          >
            {product.seller?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="caption" fontWeight="bold" display="block" sx={{ lineHeight: 1 }}>
              {product.seller?.name || "Student"} 
              <CheckCircleIcon sx={{ fontSize: 10, color: colors.verified, ml: 0.3 }} />
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              {product.seller?.university || "Chandigarh University"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1, opacity: 0.5 }} />

        {/* LOCATION & ACTION */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" color="text.secondary">
            <LocationOnIcon sx={{ fontSize: 14, mr: 0.3 }} />
            <Typography variant="caption" fontWeight="500">
              {product.location || "Hostel C"}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            size="small"
            // onClick={() => dispatch(addToCart(product))}
            onClick={() => navigate(`/product/${product._id}`)}
            sx={{
              bgcolor: colors.primary,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": { bgcolor: "#06172a" }
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;