import { createSlice } from "@reduxjs/toolkit";

// 🔥 Load from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 🔥 Save to localStorage
const saveCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },

  reducers: {
    // ✅ Add to cart
    addToCart: (state, action) => {
      const item = action.payload;

      const exist = state.items.find((i) => i._id === item._id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }

      saveCart(state.items); // 🔥 persist
    },

    // ✅ Remove item completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );

      saveCart(state.items);
    },

    // ✅ Increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item) item.qty += 1;

      saveCart(state.items);
    },

    // ✅ Decrease quantity
    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i._id !== action.payload
        );
      }

      saveCart(state.items);
    },

    // ✅ Clear cart (after order)
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;