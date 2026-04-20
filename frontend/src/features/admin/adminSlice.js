import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboardStatsAPI,
  getRecentOrdersAPI,
  getTopCategoriesAPI,
  getAllUsersAPI,
  deleteUserAPI,
  getAllOrdersAPI,
  updateOrderStatusAPI,
} from "@/api/admin.api";

/* =========================
   🔥 DASHBOARD STATS
========================= */
export const getDashboardStats = createAsyncThunk(
  "admin/getDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDashboardStatsAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stats"
      );
    }
  }
);

/* =========================
   🔥 RECENT ORDERS
========================= */
export const getRecentOrders = createAsyncThunk(
  "admin/getRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRecentOrdersAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch recent orders"
      );
    }
  }
);

/* =========================
   🔥 TOP CATEGORIES
========================= */
export const getTopCategories = createAsyncThunk(
  "admin/getTopCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTopCategoriesAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

/* =========================
   🔥 USERS
========================= */
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllUsersAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUserAPI(id);
      return id; // return deleted user id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/* =========================
   🔥 ORDERS
========================= */
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllOrdersAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await updateOrderStatusAPI(id, status);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order"
      );
    }
  }
);

/* =========================
   🔥 INITIAL STATE
========================= */
const initialState = {
  loading: false,
  error: null,

  stats: null,
  recentOrders: [],
  categories: [],

  users: [],
  orders: [],
};

/* =========================
   🔥 SLICE
========================= */
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         DASHBOARD STATS
      ========================= */
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* =========================
         RECENT ORDERS
      ========================= */
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.recentOrders = action.payload;
      })

      /* =========================
         TOP CATEGORIES
      ========================= */
      .addCase(getTopCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      /* =========================
         USERS
      ========================= */
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })

      /* =========================
         ORDERS
      ========================= */
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.orders.findIndex(
          (o) => o._id === updated._id
        );

        if (index !== -1) {
          state.orders[index] = updated;
        }
      })

      /* =========================
         GLOBAL STATES
      ========================= */
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;