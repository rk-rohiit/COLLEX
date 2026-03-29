import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ borderRadius: 3 }}>
  <CardMedia
    component="img"
    height="200"
    image={product.images?.[0] || "https://via.placeholder.com/300"}
  />

  <CardContent>
    <Typography variant="h6">{product.title}</Typography>

    <Typography color="text.secondary">
      ₹ {product.price}
    </Typography>

    <Typography variant="body2">
      Seller: {product.postedBy?.fullName || "Unknown"}
    </Typography>

    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => dispatch(addToCart(product))}
    >
      Add to Cart
    </Button>
  </CardContent>
</Card>
  );
};

export default ProductCard;