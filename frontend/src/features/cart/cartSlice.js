import { createSlice } from "@reduxjs/toolkit";

/* =========================
   🔥 LOCAL STORAGE HELPERS
========================= */

const loadCart = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

/* =========================
   🔥 SLICE
========================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },

  reducers: {
    /* =========================
       ✅ ADD TO CART
    ========================= */
    addToCart: (state, action) => {
  const item = {
    _id: action.payload._id,
    title: action.payload.title,
    price: Number(action.payload.price) || 0,
    images: action.payload.images || [],
    postedBy: action.payload.postedBy, // ✅ FIX
    location: action.payload.location,
  };

  const exist = state.items.find((i) => i._id === item._id);

  if (exist) {
    exist.qty += 1;
  } else {
    state.items.push({ ...item, qty: 1 });
  }

  saveCart(state.items);
},
    /* =========================
       ❌ REMOVE ITEM
    ========================= */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );

      saveCart(state.items);
    },

    /* =========================
       ➕ INCREASE QTY
    ========================= */
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);

      if (item) {
        item.qty += 1;
      }

      saveCart(state.items);
    },

    /* =========================
       ➖ DECREASE QTY
    ========================= */
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);

      if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i._id !== action.payload
        );
      }

      saveCart(state.items);
    },

    /* =========================
       🧹 CLEAR CART
    ========================= */
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

/* =========================
   🔥 SELECTORS (IMPORTANT)
========================= */

// ✅ Total items count
export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, item) => acc + item.qty, 0);

// ✅ Total price
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

/* =========================
   🔥 EXPORTS
========================= */

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;