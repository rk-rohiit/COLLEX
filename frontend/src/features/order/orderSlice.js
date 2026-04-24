import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  getMyOrdersAPI,
  getReceivedOrdersAPI,
  verifyDeliveryAPI,
} from "@/api/order.api";

/* =========================
   🔥 CREATE MULTIPLE ORDERS
========================= */
// export const createOrdersFromCart = createAsyncThunk(
//   "order/createMultiple",
//   async ({ items, meetType }, { rejectWithValue }) => {
//     try {
//       const results = await Promise.all(
//         items.map((item) =>
//           // createOrderAPI(item._id, meetType)
//         createOrderAPI(item.listing?._id || item._id, meetType)
//         )
//       );
//       return results;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );
export const createOrdersFromCart = createAsyncThunk(
  "order/createMultiple",
  async ({ items, meetType }, { rejectWithValue }) => {
    try {
      console.log("🛒 CART ITEMS:", items);

      const results = await Promise.allSettled(
        items.map((item) => {
          const listingId = item.listing?._id || item._id;

          console.log("➡️ Creating order for:", listingId);

          if (!listingId) {
            throw new Error("Listing ID missing");
          }

          return createOrderAPI(listingId, meetType);
        })
      );

      // ✅ Separate success & failed
      const successOrders = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

      const failedOrders = results
        .filter((r) => r.status === "rejected")
        .map((r) => r.reason?.response?.data?.message || r.reason.message);

      // 🔥 If ALL failed
      if (successOrders.length === 0) {
        throw new Error(failedOrders[0] || "All orders failed");
      }

      // ⚠️ Partial success
      if (failedOrders.length > 0) {
        console.warn("⚠️ Some orders failed:", failedOrders);
      }

      return successOrders;

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

// verify delivery

export const verifyDelivery = createAsyncThunk(
  "order/verifyDelivery",
  async ({ orderId, code }, { rejectWithValue }) => {
    try {
      return await verifyDeliveryAPI(orderId, code);
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
    verifyLoading: false,
    verifySuccess: false,
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
      })
      /* 🔥 VERIFY DELIVERY */
      .addCase(verifyDelivery.pending, (state) => {
        state.verifyLoading = true;
        state.verifySuccess = false;
        state.error = null;
      })

      .addCase(verifyDelivery.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = true;

        const updatedOrder = action.payload;

        // 🔥 Update myOrders (SAFE MERGE)
        state.myOrders = state.myOrders.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, ...updatedOrder }
            : order
        );

        // 🔥 Update receivedOrders (FIXED - ALSO MERGE)
        state.receivedOrders = state.receivedOrders.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, ...updatedOrder }
            : order
        );
      })

      .addCase(verifyDelivery.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = false;
        state.error = action.payload || "Verification failed";
      });

  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;