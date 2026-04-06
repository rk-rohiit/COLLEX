import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
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
      <Box
        sx={{
          height: 200, // 🔥 bigger image
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={product.images?.[0] || "https://placehold.co/600x400"}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)", // 🔥 premium zoom
            },
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2, // 🔥 better spacing
        }}
      >
        {/* TITLE */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Typography>

        {/* DESC */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.85rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "40px",
          }}
        >
          {product.description || "No description available"}
        </Typography>

        {/* SPACE */}
        <Box sx={{ flexGrow: 1 }} />

        {/* PRICE + BTN */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            ₹ {product.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(addToCart(product))}
            sx={{
              borderRadius: 5,
              px: 2.5,
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