import { createSlice } from "@reduxjs/toolkit";

/* =========================
   Load from localStorage
========================= */
const loadCookies = () => {
  try {
    const data = localStorage.getItem("cookiesAccepted");
    return data === "true";
  } catch {
    return false;
  }
};

const cookieSlice = createSlice({
  name: "cookies",
  initialState: {
    accepted: loadCookies(),
  },
  reducers: {
    acceptCookies: (state) => {
      state.accepted = true;
      localStorage.setItem("cookiesAccepted", "true");
    },
  },
});

export const { acceptCookies } = cookieSlice.actions;
export default cookieSlice.reducer;