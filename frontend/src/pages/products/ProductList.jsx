import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "@/features/listing/listingSlice";
import { Grid, Container, CircularProgress } from "@mui/material";
import ProductCard from "@/components/Product/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

if (loading)
  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {listings.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;