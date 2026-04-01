import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderAPI } from "../../api/order.api";

export const createOrdersFromCart = createAsyncThunk(
  "order/createMultiple",
  async ({ items, meetType }) => {
    const results = [];

    for (let item of items) {
      const order = await createOrderAPI(item._id, meetType);
      results.push(order);
    }

    return results;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrdersFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrdersFromCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrdersFromCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;