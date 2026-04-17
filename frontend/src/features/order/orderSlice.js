import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  getMyOrdersAPI,
  getReceivedOrdersAPI,
} from "@/api/order.api";

/* =========================
   🔥 CREATE MULTIPLE ORDERS
========================= */
export const createOrdersFromCart = createAsyncThunk(
  "order/createMultiple",
  async ({ items, meetType }, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        items.map((item) =>
          createOrderAPI(item._id, meetType)
        )
      );
      return results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   🔥 GET MY ORDERS
========================= */
export const getMyOrders = createAsyncThunk(
  "order/my",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrdersAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   🔥 GET RECEIVED ORDERS
========================= */
export const getReceivedOrders = createAsyncThunk(
  "order/received",
  async (_, { rejectWithValue }) => {
    try {
      return await getReceivedOrdersAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   🔥 SLICE
========================= */
const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    myOrders: [],
    receivedOrders: [],
    error: null,
  },

  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* 🔥 CREATE ORDER */
      .addCase(createOrdersFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createOrdersFromCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        // ❌ DO NOT manually push orders
        // ✅ Let API refetch handle fresh data
      })

      .addCase(createOrdersFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 🔥 MY ORDERS */
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload; // ✅ clean replace
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 🔥 RECEIVED ORDERS */
      .addCase(getReceivedOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getReceivedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedOrders = action.payload; // ✅ clean replace
      })

      .addCase(getReceivedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;