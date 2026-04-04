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
    <Box sx={{  minHeight: "100vh", py: 6,mt: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ mb: 1 }}
          >
            Explore Our Products
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Discover amazing deals from your campus
          </Typography>
        </Box>

        {/* Product Grid */}
        {listings.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No products available 😢
          </Typography>
        ) : (
          <Grid container spacing={4} alignItems="stretch">
            {listings.map((item) => (
              <Grid
                item
                key={item._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex" }}
              >
                <ProductCard product={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;