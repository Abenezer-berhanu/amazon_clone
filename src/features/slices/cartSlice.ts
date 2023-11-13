import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../../type";
import { updateCartItems } from "@/utils/CartUtils";

const initialState = {
  cartItems: <any>[],
  additionalFees: {
    totalPrice: 0,
    itemsPrice: 0,
    tax: 0,
    shippingFee: 0,
  },
  shippingAddress: {},
  paymentMethod: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItems: any = state.cartItems.find(
        (x: ProductProps) => x._id === item._id
      );
      if (existItems) {
        state.cartItems = state.cartItems.map((x: ProductProps) =>
          x._id === existItems._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCartItems(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: any) => item._id !== action.payload
      );
      updateCartItems(state)
    },
    addShippingInfo: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, addShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
