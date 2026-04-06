import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
        boxShadow: theme.shadows[1],
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative", height: 200 }}>
        <CardMedia
          component="img"
          image={product.images?.[0] || "https://placehold.co/600x400"}
          sx={{
            height: "100%",
            objectFit: "cover",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        {/* ❤️ Wishlist */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "white",
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.85rem",
            mt: 0.5,
            minHeight: "40px",
          }}
        >
          {product.description || "No description"}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            ₹ {product.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(addToCart(product))}
            sx={{
              borderRadius: 5,
              px: 2,
              textTransform: "none",
            }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;