import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchListingsAPI,
  fetchListingByIdAPI,
} from "@/api/listing.api";

/* =========================
   🔥 THUNKS
========================= */

// ✅ Get all listings
export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchListingsAPI();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching listings");
    }
  }
);

// ✅ Get single listing by ID
export const fetchListingById = createAsyncThunk(
  "listing/fetchListingById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchListingByIdAPI(id);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching listing");
    }
  }
);

/* =========================
   🔥 SLICE
========================= */

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    selectedListing: null, // 🔥 NEW
    loading: false,
    singleLoading: false, // 🔥 NEW
    error: null,
  },

  reducers: {
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         🔥 FETCH ALL
      ========================= */
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* =========================
         🔥 FETCH BY ID
      ========================= */
      .addCase(fetchListingById.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.selectedListing = action.payload;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload;
      });
  },
});

/* =========================
   🔥 EXPORTS
========================= */

export const { clearSelectedListing } = listingSlice.actions;

export default listingSlice.reducer;