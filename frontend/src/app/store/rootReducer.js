import { combineReducers } from "@reduxjs/toolkit";

// Import feature reducers
// import authReducer from "@/features/auth/authSlice";
// import listingReducer from "@/features/listing/listingSlice";
// import orderReducer from "@/features/order/orderSlice";
// import userReducer from "@/features/user/userSlice";
import contactReducer from "@/features/contact/contactSlice";

const rootReducer = combineReducers({
  // auth: authReducer,
  // listing: listingReducer,
  // order: orderReducer,
  // user: userReducer,
  contact: contactReducer,
});

export default rootReducer;