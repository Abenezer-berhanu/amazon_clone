import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../../type";

const initialState = {
  cartItems: <any>[],
  shippingAddress: {},
  paymentMethod: "chapa",
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
    },
  },
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer
