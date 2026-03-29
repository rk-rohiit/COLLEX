import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
});

export default contactSlice.reducer; // ✅ IMPORTANT