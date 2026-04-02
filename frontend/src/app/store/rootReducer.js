import { combineReducers } from "@reduxjs/toolkit";

// Import feature reducers
import authReducer from "@/features/auth/authSlice";
import listingReducer from "@/features/listing/listingSlice";
import orderReducer from "@/features/order/orderSlice";
import userReducer from "../../features/auth/authSlice";
import contactReducer from "@/features/contact/contactSlice";
import cartReducer from "@/features/cart/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  listing: listingReducer,
  cart:cartReducer,
  order: orderReducer,
  user: userReducer,
  contact: contactReducer,
});

export default rootReducer;