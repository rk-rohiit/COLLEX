import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  sendOtpAPI,
  verifyOtpAPI,
  resendOtpAPI,
} from "@/api/auth.api";

/* =========================
   LOGIN
========================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await loginAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* =========================
   SEND OTP (REGISTER STEP 1)
========================= */
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await sendOtpAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP send failed"
      );
    }
  }
);

/* =========================
   VERIFY OTP (REGISTER STEP 2)
========================= */
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyOtpAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

/* =========================
   RESEND OTP
========================= */
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resendOtpAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

/* =========================
   SAFE USER LOAD
========================= */
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  otpSent: false, // 🔥 important
  email: null,    // 🔥 store email for OTP
};

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.requiresOtp) {
          state.otpSent = true;
          state.email = action.payload.email;
          return;
        }

        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SEND OTP */
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.email = action.meta.arg.email;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VERIFY OTP */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        state.otpSent = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* RESEND OTP */
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;