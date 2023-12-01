"use client";
import { createSlice } from "@reduxjs/toolkit";

let isItems: any = typeof window !== 'undefined' ? window.localStorage.getItem("ab_am_us_er") : ""

const initialState:any = {
  userInfo: isItems ? JSON.parse(isItems) : null,
};

const userSliceStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      typeof window !== 'undefined' ? window.localStorage.setItem("ab_am_us_er", JSON.stringify(action.payload)) : ""
    },
    clearCredentials: (state) => {
      typeof window !== 'undefined' ? window.localStorage.removeItem("ab_am_us_er") : ""
      state.userInfo = null;
    },
  },
});

export const { setCredentials, clearCredentials } = userSliceStore.actions;
export default userSliceStore.reducer;
