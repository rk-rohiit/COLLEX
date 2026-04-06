import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "@/features/listing/listingSlice";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ProductCard from "@/components/Product/ProductCard";

// 🔥 Skeleton Loader
const ProductSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
      <Skeleton sx={{ mt: 1 }} />
      <Skeleton width="60%" />
    </Box>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* 🔥 HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              mt:2
            }}
          >
            Explore Our Products
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Discover amazing deals from your campus
          </Typography>
        </Box>

        {/* 🔥 GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {/* Loading */}
          {loading &&
            Array.from(new Array(8)).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}

          {/* Products */}
          {!loading &&
            listings.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </Box>

        {/* Empty */}
        {!loading && listings.length === 0 && (
          <Typography textAlign="center" mt={5} color="text.secondary">
            No products available 😢
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;