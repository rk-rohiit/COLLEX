import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  getMyOrdersAPI,
  getReceivedOrdersAPI,
} from "@/api/order.api";

// 🔥 Create Orders
export const createOrdersFromCart = createAsyncThunk(
  "order/createMultiple",
  async ({ items, meetType }, { rejectWithValue }) => {
    try {
      const results = [];

      for (let item of items) {
        const order = await createOrderAPI(item._id, meetType);
        results.push(order);
      }

      return results;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔥 My Orders
export const getMyOrders = createAsyncThunk(
  "order/my",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrdersAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔥 Received Orders
export const getReceivedOrders = createAsyncThunk(
  "order/received",
  async (_, { rejectWithValue }) => {
    try {
      return await getReceivedOrdersAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    myOrders: [],        // ✅ FIXED
    receivedOrders: [],  // ✅ FIXED
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔥 CREATE ORDER
      .addCase(createOrdersFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrdersFromCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrdersFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔥 MY ORDERS
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state) => {
        state.loading = false;
      })

      // 🔥 RECEIVED ORDERS
      .addCase(getReceivedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceivedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedOrders = action.payload;
      })
      .addCase(getReceivedOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;