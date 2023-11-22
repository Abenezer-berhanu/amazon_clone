"use client";
import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("ab_am_us_er");

const initialState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const userSliceStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("ab_am_us_er", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      localStorage.removeItem("ab_am_us_er");
      state.userInfo = null;
    },
  },
});

export const { setCredentials, clearCredentials } = userSliceStore.actions;
export default userSliceStore.reducer;
