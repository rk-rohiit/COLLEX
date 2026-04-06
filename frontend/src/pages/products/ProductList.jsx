import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "@/features/listing/listingSlice";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import ProductCard from "@/components/Product/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (loading)
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        mt: 4,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        {/* 🔥 Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Explore Our Products
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Discover amazing deals from your campus
          </Typography>
        </Box>

        {/* 🔥 Product Grid */}
        {listings.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No products available 😢
          </Typography>
        ) : (
          <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
      xl: "repeat(5, 1fr)", // 🔥 better for large screens
    },
    gap: 3,
  }}
>
  {listings.map((item) => (
    <Box key={item._id}>
      <ProductCard product={item} />
    </Box>
  ))}
</Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;