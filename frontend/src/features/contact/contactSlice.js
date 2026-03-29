import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitContactAPI } from "@/api/contact.api";

// 🔥 Async thunk
export const submitContact = createAsyncThunk(
  "contact/submit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await submitContactAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetContactState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;