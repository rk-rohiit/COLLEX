import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        // borderRadius: 4,
        p: 1.5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        // "&:hover": {
        //   transform: "translateY(-6px)",
        //   boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        // },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={product.images?.[0] || "https://placehold.co/600x400"}
          sx={{
            borderRadius: 1,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{
        px: 1, display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {product.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.8rem", mb: 1 }}
        >
          {product.description?.slice(0, 60) || "No description available"}
        </Typography>

        {/* Price + Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            ₹ {product.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(addToCart(product))}
            sx={{
              borderRadius: 3,
              px: 2,
              textTransform: "none",
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;