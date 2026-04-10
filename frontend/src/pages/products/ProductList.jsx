import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "@/features/listing/listingSlice";
import {
  Container,
  Typography,
  Box,
  Skeleton,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider
} from "@mui/material";
import ProductCard from "@/components/Product/ProductCard";
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

// 🔥 Refined Skeleton to match ProductCard shape
const ProductSkeleton = () => (
  <Box sx={{ p: 1 }}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4, mb: 1 }} />
    <Skeleton variant="text" width="80%" sx={{ mb: 0.5 }} />
    <Skeleton variant="text" width="40%" />
  </Box>
);

const ProductList = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);
  
  // Local states for filters
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  // Prototype Colors
  const colors = {
    primary: "#0A2647", // Deep Blue from prototype
    bg: "#F4F7F9"
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.bg, py: 6,mt: 8 }}>
      <Container maxWidth="xl">
        
        {/* 🔥 HEADER & FILTER BAR */}
        <Stack 
          direction={{ xs: "column", md: "row" }} 
          justifyContent="space-between" 
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, color: colors.primary, letterSpacing: "-0.5px" }}
            >
              Recently Listed on Campus
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing the latest items from your community
            </Typography>
          </Box>

          {/* 🔥 FILTER CONTROLS */}
          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                startAdornment={<SortIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} />}
                sx={{ bgcolor: 'white', borderRadius: 2, fontWeight: 600 }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                startAdornment={<FilterListIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} />}
                sx={{ bgcolor: 'white', borderRadius: 2, fontWeight: 600 }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="dorm">Dorm Goods</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 4, opacity: 0.6 }} />

        {/* 🔥 DYNAMIC GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {loading ? (
            Array.from(new Array(8)).map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            listings.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          )}
        </Box>

        {/* EMPTY STATE */}
        {!loading && listings.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your filters.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;