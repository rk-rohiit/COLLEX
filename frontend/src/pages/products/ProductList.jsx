import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "@/features/listing/listingSlice";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Skeleton,
  Stack,
  MenuItem,
  Select,
  Divider,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
} from "@mui/material";
import ProductCard from "@/components/Product/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppsIcon from "@mui/icons-material/Apps";

const categories = [
  { label: "All Items", value: "all", icon: <AppsIcon sx={{ fontSize: 17 }} /> },
  { label: "Textbooks", value: "books", icon: <MenuBookIcon sx={{ fontSize: 17 }} /> },
  { label: "Electronics", value: "electronics", icon: <LaptopMacIcon sx={{ fontSize: 17 }} /> },
  { label: "Clothing", value: "clothing", icon: <CheckroomIcon sx={{ fontSize: 17 }} /> },
  { label: "Furniture", value: "furniture", icon: <ChairIcon sx={{ fontSize: 17 }} /> },
  { label: "Sports", value: "sports", icon: <SportsSoccerIcon sx={{ fontSize: 17 }} /> },
  { label: "Other", value: "other", icon: <MoreHorizIcon sx={{ fontSize: 17 }} /> },
];

const conditions = ["Like New", "Good", "Fair"];

const ProductSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" height={186} sx={{ borderRadius: "16px", mb: 1 }} />
    <Skeleton variant="text" width="75%" sx={{ mb: 0.5 }} />
    <Skeleton variant="text" width="45%" />
  </Box>
);

// Sidebar section wrapper
const SideSection = ({ title, children }) => (
  <Box mb={3}>
    <Typography
      variant="caption"
      fontWeight={700}
      color="text.secondary"
      sx={{ fontSize: "0.7rem", letterSpacing: "0.07em", textTransform: "uppercase", display: "block", mb: 1.25 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const ProductList = () => {
  const dispatch = useDispatch();
  // const { listings, loading } = useSelector((state) => state.listing);
  const { listings, loading, totalPages, totalItems } = useSelector(
    (state) => state.listing
  );
  const [viewMode, setViewMode] = useState("grid");
  // const [page, setPage] = useState(1);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("newest"); // ✅ FIX
  const [conditions_, setConditions] = useState([]); // ✅ FIX

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  useEffect(() => {
  setMinPriceInput(minPrice);
  setMaxPriceInput(maxPrice);
}, [minPrice, maxPrice]);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
  setSearchInput(search);
}, [search]);

  const handleSearch = () => {
  const params = new URLSearchParams(searchParams);

  if (searchInput) {
    params.set("search", searchInput);
  } else {
    params.delete("search"); // ✅ FIX
  }

  params.set("page", 1);
  setSearchParams(params);
};

  // useEffect(() => {
  //   // dispatch(fetchListings({ page, limit: 10 }));
  //   dispatch(
  //     fetchListings({
  //       page,
  //       limit: 10,
  //       category: category !== "all" ? category : undefined,
  //       search,
  //       minPrice,
  //       maxPrice,
  //     })
  //   );
  // }, [dispatch, page, category, search, minPrice, maxPrice]);

  useEffect(() => {
  const params = {
    page,
    limit: 10,
  };

  if (category !== "all") params.category = category;
  if (search) params.search = search;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  dispatch(fetchListings(params));
}, [dispatch, page, category, search, minPrice, maxPrice]);

  const toggleCondition = (val) =>
    setConditions((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );

  // const totalItems = listings.length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>

          {/* ─── LEFT SIDEBAR ─── */}
          <Box
            sx={{
              width: 220,
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 88,
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                border: "0.5px solid",
                borderColor: "divider",
                borderRadius: "16px",
                p: 2.5,
              }}
            >
              {/* CATEGORIES */}
              <SideSection title="Categories">
                <Stack spacing={0.5}>
                  {categories.map((cat) => (
                    <Box
                      key={cat.value}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set("category", cat.value);
                        params.set("page", 1); // reset page
                        setSearchParams(params);
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        px: 1.5,
                        py: 0.9,
                        borderRadius: "10px",
                        cursor: "pointer",
                        bgcolor: category === cat.value ? "rgba(26,35,126,0.08)" : "transparent",
                        color: category === cat.value ? "primary.main" : "text.secondary",
                        fontWeight: category === cat.value ? 700 : 400,
                        transition: "all 0.15s ease",
                        "&:hover": {
                          bgcolor: category === cat.value
                            ? "rgba(26,35,126,0.08)"
                            : "rgba(0,0,0,0.04)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          color: category === cat.value ? "primary.main" : "text.disabled",
                        }}
                      >
                        {cat.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={category === cat.value ? 700 : 500}
                        fontSize="0.85rem"
                        color="inherit"
                      >
                        {cat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </SideSection>

              <Divider sx={{ my: 2 }} />

              {/* PRICE RANGE */}
              <SideSection title="Price Range">
                <Stack direction="row" spacing={1} mb={1.5}>
                  <TextField
                    placeholder="Min"
                    size="small"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    type="number"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.82rem" },
                    }}
                  />
                  <TextField
                    placeholder="Max"
                    size="small"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    type="number"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.82rem" },
                    }}
                  />
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => {
  const params = new URLSearchParams(searchParams);

  if (minPriceInput) {
    params.set("minPrice", minPriceInput);
  } else {
    params.delete("minPrice"); // ✅ FIX
  }

  if (maxPriceInput) {
    params.set("maxPrice", maxPriceInput);
  } else {
    params.delete("maxPrice"); // ✅ FIX
  }

  params.set("page", 1);
  setSearchParams(params);
}}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    py: 0.85,
                    boxShadow: "none",
                    fontSize: "0.82rem",
                  }}
                >
                  Apply
                </Button>
              </SideSection>

              <Divider sx={{ my: 2 }} />

              {/* CONDITION */}
              <SideSection title="Condition">
                <Stack spacing={0.5}>
                  {conditions.map((c) => (
                    <FormControlLabel
                      key={c}
                      control={
                        <Checkbox
                          size="small"
                          checked={conditions_.includes(c)}
                          onChange={() => toggleCondition(c)}
                          sx={{
                            p: 0.5,
                            color: "text.disabled",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" fontSize="0.83rem" fontWeight={500}>
                          {c}
                        </Typography>
                      }
                      sx={{ mx: 0, "& .MuiFormControlLabel-label": { ml: 0.5 } }}
                    />
                  ))}
                </Stack>
              </SideSection>
            </Box>
          </Box>

          {/* ─── MAIN CONTENT ─── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>

            {/* TOP BAR */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                mb: 2.5,
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="800" color="text.primary" lineHeight={1.2}>
                  Campus Marketplace
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize="0.8rem">
                  {totalItems.toLocaleString()} items available
                </Typography>
              </Box>

              <Stack direction="row" spacing={1.5} alignItems="center">
                {/* SEARCH */}
                <TextField
                  placeholder="Search items, textbooks..."
                  size="small"
                  value={searchInput} 
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: 17, color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: { xs: "100%", sm: 220 },
                    "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.83rem" },
                  }}
                />

                {/* SORT */}
                <Select
                  value={sortBy}
                  // onChange={(e) => setSortBy(e.target.value)}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="small"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    minWidth: 150,
                    bgcolor: "background.paper",
                  }}
                >
                  <MenuItem value="newest">Recent</MenuItem>
                  <MenuItem value="price-low">Price: Low → High</MenuItem>
                  <MenuItem value="price-high">Price: High → Low</MenuItem>
                </Select>

                {/* VIEW TOGGLE */}
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, v) => v && setViewMode(v)}
                  size="small"
                  sx={{
                    "& .MuiToggleButton-root": {
                      border: "0.5px solid",
                      borderColor: "divider",
                      borderRadius: "10px !important",
                      px: 1,
                    },
                  }}
                >
                  <ToggleButton value="grid">
                    <GridViewIcon sx={{ fontSize: 17 }} />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewListIcon sx={{ fontSize: 17 }} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Box>

            <Divider sx={{ mb: 3, opacity: 0.5 }} />

            {/* PRODUCT GRID */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: viewMode === "grid"
                  ? { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }
                  : "1fr",
                gap: 2.5,
              }}
            >
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                : listings.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
            </Box>

            {/* EMPTY STATE */}
            {!loading && listings.length === 0 && (
              <Box
                textAlign="center"
                py={12}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: "16px",
                  border: "0.5px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" fontWeight={700} color="text.secondary" mb={0.5}>
                  No items found
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Try adjusting your filters or search query
                </Typography>
              </Box>
            )}

            {/* PAGINATION */}
            {!loading && listings.length > 0 && (
              <Box display="flex" justifyContent="center" mt={5}>
                <Pagination
                  count={totalPages}
                  page={page}
                  // onChange={(_, v) => setPage(v)}
                  onChange={(_, v) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", v);
                    setSearchParams(params);
                  }}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: "0.83rem",
                    },
                    "& .Mui-selected": {
                      bgcolor: "primary.main !important",
                      color: "white",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;