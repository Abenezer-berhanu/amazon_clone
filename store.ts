import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/slices/apiSlice";
import cartSlice from "@/features/slices/cartSlice";
import userSliceStore from "@/features/slices/userSliceStore";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: userSliceStore,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
