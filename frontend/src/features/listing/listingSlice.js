import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchListingsAPI,
  fetchListingByIdAPI,
  createListingAPI,
} from "@/api/listing.api";

/* =========================
   🔥 THUNKS
========================= */

// ✅ Get all listings
export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchListingsAPI(params);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching listings"
      );
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
      return rejectWithValue(
        err.response?.data?.message || "Error fetching listing"
      );
    }
  }
);

// ✅ Create listing
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (data, { rejectWithValue }) => {
    try {
      return await createListingAPI(data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error creating listing"
      );
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
    selectedListing: null,

    totalPages: 1,
    totalItems: 0,

    loading: false,
    singleLoading: false,
    createLoading: false,

    createSuccess: false,
    error: null,
  },

  reducers: {
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },

    clearCreateState: (state) => {
      state.createSuccess = false;
      state.createLoading = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
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
        // state.listings = action.payload || [];
        // state.totalPages = action.payload;
        // state.totalItems = action.payload
        state.listings = action.payload.data;       // ✅ actual listings
        state.totalPages = action.payload.pages;    // ✅ total pages
        state.totalItems = action.payload.total;
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
      })

      /* =========================
         🔥 CREATE LISTING
      ========================= */
      .addCase(createListing.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.error = null;

        const newListing = action.payload?.data;

        // ✅ Prevent duplicates
        if (newListing) {
          const exists = state.listings.find(
            (item) => item._id === newListing._id
          );

          if (!exists) {
            state.listings.unshift(newListing);
          }
        }
      })
      .addCase(createListing.rejected, (state, action) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.error = action.payload;
      });
  },
});

/* =========================
   🔥 EXPORTS
========================= */

export const {
  clearSelectedListing,
  clearCreateState,
  clearError,
} = listingSlice.actions;

export default listingSlice.reducer;