import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListingsAPI } from "@/api/listing.api";

export const fetchListings = createAsyncThunk(
  "products/fetchListings",
  async () => {
    return await fetchListingsAPI();
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default listingSlice.reducer;