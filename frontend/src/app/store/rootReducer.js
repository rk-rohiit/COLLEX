import { combineReducers } from "@reduxjs/toolkit";

// Feature reducers
import authReducer from "@/features/auth/authSlice";
import listingReducer from "@/features/listing/listingSlice";
import orderReducer from "@/features/order/orderSlice";
import contactReducer from "@/features/contact/contactSlice";
import cartReducer from "@/features/cart/cartSlice";
import adminReducer from "@/features/admin/adminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  listing: listingReducer,
  cart: cartReducer,
  order: orderReducer,
  contact: contactReducer,
  admin: adminReducer,
});

export default rootReducer;