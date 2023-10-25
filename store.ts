import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/slices/apiSlice";
import cartSlice from "@/features/slices/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
  },
});

export default store;
